import { useState, useEffect } from 'react';
import { atomicSynth } from '../utils/audioSynthesis';
import { enrichSpectralData } from '../utils/physics';

export default function AudioControls({ elementData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [duration, setDuration] = useState(2);
  const [waveform, setWaveform] = useState('sine');

  useEffect(() => {
    atomicSynth.setVolume(volume);
  }, [volume]);

  const handlePlay = () => {
    if (!elementData || !elementData.spectralLines) {
      alert('Please select an element first!');
      return;
    }

    const enrichedLines = enrichSpectralData(elementData.spectralLines);

    setIsPlaying(true);
    atomicSynth.playAtomicChord(enrichedLines, duration, waveform);

    // Reset playing state after duration
    setTimeout(() => {
      setIsPlaying(false);
    }, duration * 1000);
  };

  const handleStop = () => {
    atomicSynth.stop();
    setIsPlaying(false);
  };

  if (!elementData) {
    return (
      <div className="glass-panel">
        <h2 className="text-xl font-bold mb-4 text-accent-blue">Audio Controls</h2>
        <p className="text-gray-500 text-sm">Select an element to play its atomic signature</p>
      </div>
    );
  }

  return (
    <div className="glass-panel">
      <h2 className="text-xl font-bold mb-4 text-accent-blue">Audio Controls</h2>

      {/* Play/Stop buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`
            flex-1 py-3 px-6 rounded-lg font-semibold transition-all
            ${isPlaying
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-accent-blue hover:bg-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
            }
          `}
        >
          {isPlaying ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Playing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Play Atomic Chord
            </span>
          )}
        </button>

        <button
          onClick={handleStop}
          disabled={!isPlaying}
          className={`
            px-6 py-3 rounded-lg font-semibold transition-all
            ${!isPlaying
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white'
            }
          `}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Volume control */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">
          Volume: {Math.round(volume * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer accent-accent-blue"
        />
      </div>

      {/* Duration control */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">
          Duration: {duration.toFixed(1)}s
        </label>
        <input
          type="range"
          min="0.5"
          max="5"
          step="0.1"
          value={duration}
          onChange={(e) => setDuration(parseFloat(e.target.value))}
          className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer accent-accent-blue"
        />
      </div>

      {/* Waveform selector */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Waveform</label>
        <div className="grid grid-cols-4 gap-2">
          {['sine', 'square', 'sawtooth', 'triangle'].map((type) => (
            <button
              key={type}
              onClick={() => setWaveform(type)}
              className={`
                py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize
                ${waveform === type
                  ? 'bg-accent-purple text-white'
                  : 'bg-dark-surface text-gray-400 hover:bg-dark-border hover:text-white'
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Info panel */}
      <div className="mt-6 pt-4 border-t border-dark-border">
        <div className="text-xs text-gray-500 space-y-2">
          <p className="flex items-start gap-2">
            <span className="text-accent-blue">•</span>
            <span>Each spectral line is represented by a sine wave oscillator</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-accent-blue">•</span>
            <span>Frequencies scaled from THz to audible range (20Hz-20kHz)</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-accent-blue">•</span>
            <span>Oscillator gain proportional to spectral line intensity</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-accent-blue">•</span>
            <span>Harmonic relationships between lines preserved via octave shift (2^40)</span>
          </p>
        </div>
      </div>
    </div>
  );
}
