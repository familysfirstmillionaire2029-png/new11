# ⚛️ Atomic Frequency & Resonance Simulator

An interactive web-based educational simulator that visualizes and sonifies the unique atomic signatures of elements using real NIST spectral data.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-Latest-000000?logo=three.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

## 🌟 Features

- **Interactive Periodic Table**: Select from 20 elements (H through Ca) with real-time spectral data
- **3D Atom Visualization**: Bohr model rendering with electron orbital animations using Three.js
- **Spectral Line Display**: Visual representation of emission/absorption spectra with wavelength-to-color mapping
- **Audio Sonification**: Hear the "sound" of atoms through additive synthesis of spectral lines
- **Scientific Accuracy**: Based on NIST Atomic Spectra Database

## 🎯 Physics & Mathematics

### Visual Mapping
Wavelengths (λ) are mapped to RGB colors using visible spectrum approximation (380nm–750nm):
- Violet: 380-440nm
- Blue: 440-490nm
- Cyan: 490-510nm
- Green: 510-580nm
- Yellow: 580-645nm
- Red: 645-750nm

### Audio Sonification
Atomic frequencies in THz are scaled to audible range (20Hz–20kHz) using logarithmic octave shift:

```
f_audio = f_atomic / 2^40
```

This preserves harmonic relationships between spectral lines while bringing ~500 THz visible light down to ~500 Hz audible range.

### Additive Synthesis
Each spectral line is represented by a sine wave oscillator where:
- **Frequency**: Scaled atomic frequency
- **Gain**: Proportional to line intensity (square root for perceptual scaling)
- **Duration**: User-configurable (0.5-5 seconds)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Architecture

### Project Structure
```
src/
├── components/
│   ├── AtomVisualization.jsx   # Three.js 3D atom renderer
│   ├── AudioControls.jsx        # Web Audio playback controls
│   ├── PeriodicTable.jsx        # Interactive element selector
│   └── Spectrogram.jsx          # Spectral line visualization
├── data/
│   └── atomicSpectra.js         # NIST spectral data for elements
├── utils/
│   ├── audioSynthesis.js        # Web Audio API synthesis engine
│   └── physics.js               # Wavelength/frequency calculations
├── App.jsx                      # Main application
└── index.css                    # Tailwind configuration
```

### Key Technologies
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics rendering
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers
- **Web Audio API** - Audio synthesis
- **Tailwind CSS** - Styling

## 🎨 Components

### AtomVisualization
Renders a 3D Bohr model with:
- Nucleus with element color
- Electron shells with proper capacities
- Orbital animations
- Dynamic lighting based on dominant spectral line

### AudioControls
Provides controls for:
- Playing atomic "chord" (all spectral lines together)
- Volume adjustment
- Duration control (0.5-5s)
- Waveform selection (sine, square, sawtooth, triangle)

### Spectrogram
Displays:
- Spectral bars colored by wavelength
- Interactive tooltips with detailed line data
- Click-to-play individual frequencies
- Wavelength range information

### PeriodicTable
Interactive selector with:
- Simplified periodic table layout
- Element colors based on dominant emission
- Hover effects and selection states

## 📊 Data Format

Each element in the NIST data includes:

```javascript
{
  atomicNumber: 1,
  name: "Hydrogen",
  symbol: "H",
  spectralLines: [
    {
      wavelength: 656.3,        // nm
      intensity: 100,           // relative (0-100)
      transition: "Hα (n=3→2)" // electron transition
    },
    // ... more lines
  ]
}
```

## 🎓 Educational Use

This simulator is designed for:
- Physics and chemistry education
- Understanding atomic spectra
- Visualizing quantum transitions
- Exploring the relationship between light and sound
- STEM demonstrations

## 🔬 Scientific Background

### Atomic Emission Spectra
When electrons in an atom transition from higher to lower energy levels, they emit photons with specific wavelengths:

```
E = hν = hc/λ
```

Where:
- E = energy difference
- h = Planck's constant
- ν = frequency
- c = speed of light
- λ = wavelength

### Data Source
Spectral line data sourced from the **NIST Atomic Spectra Database**, which provides experimentally measured emission and absorption lines for all elements.

## 🎵 Audio Synthesis Details

The audio engine uses:
- **Polyphonic additive synthesis**: Multiple sine wave oscillators
- **Envelope shaping**: 50ms attack, sustain, 100ms release
- **Perceptual scaling**: √intensity for loudness
- **Frequency preservation**: Logarithmic scaling maintains harmonic ratios

## 🛠️ Development

### Adding New Elements
1. Add spectral data to `src/data/atomicSpectra.js`
2. Include atomic number, name, symbol, and spectral lines
3. Update periodic table layout in `PeriodicTable.jsx`

### Customizing Physics
Modify constants in `src/utils/physics.js`:
- `OCTAVE_SHIFT`: Adjust audio frequency scaling (default: 40)
- `wavelengthToRGB()`: Customize color mapping
- Gamma correction for intensity falloff

## 📝 License

This project is for educational purposes. NIST data is in the public domain.

## 🙏 Acknowledgments

- **NIST Physics Reference Data** for atomic spectra
- **Dan Bruton** for wavelength-to-RGB algorithm
- React, Three.js, and Web Audio API communities

## 🐛 Known Limitations

- Simplified to first 20 elements (H through Ca)
- Bohr model representation (not quantum mechanical)
- Visible spectrum only (UV lines approximated)
- Browser audio restrictions require user interaction to initialize

## 📚 Further Reading

- [NIST Atomic Spectra Database](https://physics.nist.gov/PhysRefData/ASD/lines_form.html)
- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Three.js Documentation](https://threejs.org/docs/)
- [Atomic Spectroscopy](https://en.wikipedia.org/wiki/Atomic_spectroscopy)

---

Built with ⚡ by combining quantum physics, interactive visualization, and audio synthesis.
