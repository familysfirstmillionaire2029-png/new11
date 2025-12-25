/**
 * Physics Utilities for Atomic Resonance Simulator
 * Handles wavelength-to-color conversion and frequency scaling
 */

/**
 * Converts wavelength (nm) to RGB color using visible spectrum approximation
 * Based on algorithm by Dan Bruton (http://www.physics.sfasu.edu/astro/color.html)
 *
 * @param {number} wavelength - Wavelength in nanometers (380-750nm)
 * @returns {Object} RGB color object with r, g, b values (0-255) and hex string
 */
export const wavelengthToRGB = (wavelength) => {
  let r, g, b, factor;

  // Clamp wavelength to visible spectrum
  const lambda = Math.max(380, Math.min(750, wavelength));

  // Color mapping based on wavelength ranges
  if (lambda >= 380 && lambda < 440) {
    // Violet to Blue
    r = -(lambda - 440) / (440 - 380);
    g = 0.0;
    b = 1.0;
  } else if (lambda >= 440 && lambda < 490) {
    // Blue to Cyan
    r = 0.0;
    g = (lambda - 440) / (490 - 440);
    b = 1.0;
  } else if (lambda >= 490 && lambda < 510) {
    // Cyan to Green
    r = 0.0;
    g = 1.0;
    b = -(lambda - 510) / (510 - 490);
  } else if (lambda >= 510 && lambda < 580) {
    // Green to Yellow
    r = (lambda - 510) / (580 - 510);
    g = 1.0;
    b = 0.0;
  } else if (lambda >= 580 && lambda < 645) {
    // Yellow to Red
    r = 1.0;
    g = -(lambda - 645) / (645 - 580);
    b = 0.0;
  } else if (lambda >= 645 && lambda <= 750) {
    // Red
    r = 1.0;
    g = 0.0;
    b = 0.0;
  }

  // Let the intensity fall off near the vision limits
  if (lambda >= 380 && lambda < 420) {
    factor = 0.3 + 0.7 * (lambda - 380) / (420 - 380);
  } else if (lambda >= 420 && lambda < 701) {
    factor = 1.0;
  } else if (lambda >= 701 && lambda <= 750) {
    factor = 0.3 + 0.7 * (750 - lambda) / (750 - 701);
  } else {
    factor = 0.0;
  }

  // Apply gamma correction
  const gamma = 0.80;
  const intensityMax = 255;

  const red = r === 0.0 ? 0 : Math.round(intensityMax * Math.pow(r * factor, gamma));
  const green = g === 0.0 ? 0 : Math.round(intensityMax * Math.pow(g * factor, gamma));
  const blue = b === 0.0 ? 0 : Math.round(intensityMax * Math.pow(b * factor, gamma));

  return {
    r: red,
    g: green,
    b: blue,
    hex: `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`,
    rgb: `rgb(${red}, ${green}, ${blue})`,
  };
};

/**
 * Converts wavelength (nm) to frequency (THz)
 * Using c = λν, where c = speed of light (299,792 km/s)
 *
 * @param {number} wavelength - Wavelength in nanometers
 * @returns {number} Frequency in TeraHertz
 */
export const wavelengthToFrequency = (wavelength) => {
  const c = 299792.458; // Speed of light in km/s
  const wavelengthKm = wavelength * 1e-12; // Convert nm to km
  return c / wavelengthKm; // Frequency in THz
};

/**
 * Scales atomic frequency (THz) to audible frequency (Hz)
 * Uses logarithmic octave shift to preserve harmonic relationships
 *
 * Default scaling: f_audio = f_atomic / 2^40
 * This brings ~500 THz (visible light) down to ~500 Hz (audible)
 *
 * @param {number} frequencyTHz - Frequency in TeraHertz
 * @param {number} octaveShift - Number of octaves to shift down (default: 40)
 * @returns {number} Frequency in Hertz (20-20000 Hz range)
 */
export const scaleToAudibleFrequency = (frequencyTHz, octaveShift = 40) => {
  // Convert THz to Hz
  const frequencyHz = frequencyTHz * 1e12;

  // Apply octave shift (divide by 2^n)
  const audioFrequency = frequencyHz / Math.pow(2, octaveShift);

  // Clamp to human hearing range (20 Hz - 20 kHz)
  return Math.max(20, Math.min(20000, audioFrequency));
};

/**
 * Converts wavelength directly to audible frequency
 * Combines wavelengthToFrequency and scaleToAudibleFrequency
 *
 * @param {number} wavelength - Wavelength in nanometers
 * @param {number} octaveShift - Number of octaves to shift down (default: 40)
 * @returns {number} Audible frequency in Hertz
 */
export const wavelengthToAudible = (wavelength, octaveShift = 40) => {
  const frequencyTHz = wavelengthToFrequency(wavelength);
  return scaleToAudibleFrequency(frequencyTHz, octaveShift);
};

/**
 * Generates spectral line data enriched with color and audio frequency
 *
 * @param {Array} spectralLines - Array of spectral line objects with wavelength and intensity
 * @param {number} octaveShift - Octave shift for audio scaling (default: 40)
 * @returns {Array} Enriched spectral line data
 */
export const enrichSpectralData = (spectralLines, octaveShift = 40) => {
  return spectralLines.map(line => ({
    ...line,
    color: wavelengthToRGB(line.wavelength),
    frequencyTHz: wavelengthToFrequency(line.wavelength),
    audioFrequency: wavelengthToAudible(line.wavelength, octaveShift),
    // Normalize intensity to 0-1 range for audio gain
    normalizedIntensity: line.intensity / 100,
  }));
};

/**
 * Calculate the dominant wavelength (highest intensity line)
 *
 * @param {Array} spectralLines - Array of spectral line objects
 * @returns {Object} The dominant spectral line
 */
export const getDominantLine = (spectralLines) => {
  return spectralLines.reduce((max, line) =>
    line.intensity > max.intensity ? line : max
  , spectralLines[0]);
};

/**
 * Get element color based on dominant spectral line
 *
 * @param {Array} spectralLines - Array of spectral line objects
 * @returns {Object} RGB color object
 */
export const getElementColor = (spectralLines) => {
  const dominant = getDominantLine(spectralLines);
  return wavelengthToRGB(dominant.wavelength);
};
