import { useState, useEffect } from 'react';
import PeriodicTable from './components/PeriodicTable';
import AtomVisualization from './components/AtomVisualization';
import Spectrogram from './components/Spectrogram';
import AudioControls from './components/AudioControls';
import { getElementData } from './data/atomicSpectra';

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize with Hydrogen by default
  useEffect(() => {
    const hydrogen = getElementData('H');
    if (hydrogen) {
      setSelectedElement(hydrogen);
    }
  }, []);

  const handleSelectElement = (element) => {
    setSelectedElement(element);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
            Atomic Frequency & Resonance Simulator
          </h1>
          <p className="text-gray-400 text-lg">
            Explore the unique spectral signatures of elements through sight and sound
          </p>
          <div className="mt-2 flex gap-4 text-sm text-gray-500">
            <span>🔬 NIST Atomic Spectra Database</span>
            <span>🎨 Wavelength-to-RGB Mapping</span>
            <span>🎵 Audio Sonification (THz → Hz)</span>
            <span>⚛️ 3D Bohr Model Visualization</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto">
        {/* Top section: Periodic Table */}
        <div className="mb-6">
          <PeriodicTable
            selectedElement={selectedElement}
            onSelectElement={handleSelectElement}
          />
        </div>

        {/* Middle section: 3D Visualization and Audio Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* 3D Atom Visualization */}
          <div className="lg:col-span-2 h-[500px] relative">
            <AtomVisualization elementData={selectedElement} />
          </div>

          {/* Audio Controls */}
          <div>
            <AudioControls elementData={selectedElement} />
          </div>
        </div>

        {/* Bottom section: Spectrogram */}
        <div>
          <Spectrogram elementData={selectedElement} isPlaying={isPlaying} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-dark-border max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-500">
          <div>
            <h3 className="text-accent-blue font-semibold mb-2">About</h3>
            <p>
              This simulator combines quantum physics with interactive media to
              visualize and sonify the unique atomic signatures of elements.
            </p>
          </div>
          <div>
            <h3 className="text-accent-blue font-semibold mb-2">How It Works</h3>
            <ul className="space-y-1">
              <li>• Spectral data from NIST Atomic Spectra Database</li>
              <li>• Visual mapping: λ → RGB (380-750nm)</li>
              <li>• Audio scaling: f_THz / 2^40 → f_Hz</li>
              <li>• Additive synthesis with Web Audio API</li>
            </ul>
          </div>
          <div>
            <h3 className="text-accent-blue font-semibold mb-2">Technologies</h3>
            <ul className="space-y-1">
              <li>• React + Vite</li>
              <li>• Three.js + React Three Fiber</li>
              <li>• Web Audio API</li>
              <li>• Tailwind CSS</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-dark-border text-center text-xs text-gray-600">
          <p>
            Built with React • Data sourced from NIST Physics Reference Data •
            Educational purposes only
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
