/**
 * Web Audio API Additive Synthesis Engine
 * Generates atomic "chords" from spectral line data
 */

class AtomicSynthesizer {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.oscillators = [];
    this.gainNodes = [];
    this.analyser = null;
    this.isPlaying = false;
  }

  /**
   * Initialize the audio context (must be called after user interaction)
   */
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Create master gain node for volume control
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.3; // Default volume
      this.masterGain.connect(this.audioContext.destination);

      // Create analyser for visualization
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.connect(this.masterGain);
    }

    // Resume context if suspended (browser autoplay policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    return this.audioContext;
  }

  /**
   * Play an atomic "chord" from enriched spectral data
   *
   * @param {Array} enrichedSpectralLines - Array of spectral lines with audioFrequency and normalizedIntensity
   * @param {number} duration - Duration in seconds (default: 2)
   * @param {string} waveform - Oscillator type: 'sine', 'square', 'sawtooth', 'triangle' (default: 'sine')
   */
  playAtomicChord(enrichedSpectralLines, duration = 2, waveform = 'sine') {
    // Initialize if not already done
    if (!this.audioContext) {
      this.init();
    }

    // Stop any currently playing sound
    this.stop();

    const now = this.audioContext.currentTime;
    const fadeInTime = 0.05; // 50ms fade in
    const fadeOutTime = 0.1; // 100ms fade out

    // Create oscillator and gain node for each spectral line
    enrichedSpectralLines.forEach((line, index) => {
      // Create oscillator
      const oscillator = this.audioContext.createOscillator();
      oscillator.type = waveform;
      oscillator.frequency.setValueAtTime(line.audioFrequency, now);

      // Create gain node for this oscillator
      const gainNode = this.audioContext.createGain();

      // Set initial gain based on line intensity
      // Use square root for perceptual loudness scaling
      const targetGain = Math.sqrt(line.normalizedIntensity) * 0.2;

      // Envelope: fade in, sustain, fade out
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(targetGain, now + fadeInTime);
      gainNode.gain.setValueAtTime(targetGain, now + duration - fadeOutTime);
      gainNode.gain.linearRampToValueAtTime(0, now + duration);

      // Connect: oscillator -> gain -> analyser -> master gain -> destination
      oscillator.connect(gainNode);
      gainNode.connect(this.analyser);

      // Start and schedule stop
      oscillator.start(now);
      oscillator.stop(now + duration);

      // Clean up after playback
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
        this.oscillators = this.oscillators.filter(osc => osc !== oscillator);
        this.gainNodes = this.gainNodes.filter(gn => gn !== gainNode);

        if (this.oscillators.length === 0) {
          this.isPlaying = false;
        }
      };

      // Store references
      this.oscillators.push(oscillator);
      this.gainNodes.push(gainNode);
    });

    this.isPlaying = true;
  }

  /**
   * Play a single frequency (for testing or individual line playback)
   *
   * @param {number} frequency - Frequency in Hz
   * @param {number} gain - Gain value (0-1)
   * @param {number} duration - Duration in seconds
   * @param {string} waveform - Oscillator type
   */
  playTone(frequency, gain = 0.3, duration = 1, waveform = 'sine') {
    if (!this.audioContext) {
      this.init();
    }

    const now = this.audioContext.currentTime;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(frequency, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(gain, now + 0.05);
    gainNode.gain.setValueAtTime(gain, now + duration - 0.1);
    gainNode.gain.linearRampToValueAtTime(0, now + duration);

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + duration);

    oscillator.onended = () => {
      oscillator.disconnect();
      gainNode.disconnect();
    };
  }

  /**
   * Stop all currently playing oscillators
   */
  stop() {
    const now = this.audioContext?.currentTime || 0;

    this.oscillators.forEach(osc => {
      try {
        osc.stop(now);
        osc.disconnect();
      } catch (e) {
        // Oscillator might already be stopped
      }
    });

    this.gainNodes.forEach(gn => {
      try {
        gn.disconnect();
      } catch (e) {
        // Gain node might already be disconnected
      }
    });

    this.oscillators = [];
    this.gainNodes = [];
    this.isPlaying = false;
  }

  /**
   * Set master volume
   *
   * @param {number} volume - Volume (0-1)
   */
  setVolume(volume) {
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
    }
  }

  /**
   * Get analyser node for visualization
   *
   * @returns {AnalyserNode} The analyser node
   */
  getAnalyser() {
    if (!this.analyser) {
      this.init();
    }
    return this.analyser;
  }

  /**
   * Get frequency data from analyser (for visualization)
   *
   * @returns {Uint8Array} Frequency data
   */
  getFrequencyData() {
    if (!this.analyser) {
      return new Uint8Array(0);
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    return dataArray;
  }

  /**
   * Get time domain data from analyser (for waveform visualization)
   *
   * @returns {Uint8Array} Time domain data
   */
  getTimeDomainData() {
    if (!this.analyser) {
      return new Uint8Array(0);
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);

    return dataArray;
  }

  /**
   * Clean up and close audio context
   */
  cleanup() {
    this.stop();

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.masterGain = null;
    this.analyser = null;
  }
}

// Export singleton instance
export const atomicSynth = new AtomicSynthesizer();

// Export class for custom instances
export default AtomicSynthesizer;
