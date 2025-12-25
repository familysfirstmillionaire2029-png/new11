import { useState } from 'react';
import { enrichSpectralData } from '../utils/physics';
import { atomicSynth } from '../utils/audioSynthesis';

/**
 * Individual spectral line bar
 */
function SpectralLine({ line, isPlaying }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Play single line
    atomicSynth.playTone(line.audioFrequency, line.normalizedIntensity * 0.5, 1.5);
  };

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Spectral bar */}
      <div
        className={`
          rounded-t-sm transition-all duration-200
          ${isPlaying ? 'animate-pulse' : ''}
          ${isHovered ? 'opacity-100 scale-105' : 'opacity-90'}
        `}
        style={{
          height: `${line.normalizedIntensity * 150 + 20}px`,
          width: '100%',
          background: `linear-gradient(to top, ${line.color.hex}, ${line.color.hex}cc)`,
          boxShadow: `0 0 ${isHovered ? '20px' : '10px'} ${line.color.hex}66`,
        }}
      />

      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-20 pointer-events-none">
          <div className="bg-dark-surface border border-dark-border rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
            <div className="text-xs text-gray-400">Wavelength</div>
            <div className="text-sm font-bold text-white">{line.wavelength.toFixed(1)} nm</div>

            <div className="text-xs text-gray-400 mt-1">Frequency</div>
            <div className="text-sm text-white">{line.frequencyTHz.toFixed(2)} THz</div>

            <div className="text-xs text-gray-400 mt-1">Audio</div>
            <div className="text-sm text-white">{line.audioFrequency.toFixed(1)} Hz</div>

            <div className="text-xs text-gray-400 mt-1">Intensity</div>
            <div className="text-sm text-white">{line.intensity}%</div>

            {line.transition && (
              <>
                <div className="text-xs text-gray-400 mt-1">Transition</div>
                <div className="text-xs text-white">{line.transition}</div>
              </>
            )}

            <div className="text-xs text-accent-blue mt-2 italic">Click to hear</div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Main Spectrogram component
 */
export default function Spectrogram({ elementData, isPlaying }) {
  if (!elementData || !elementData.spectralLines) {
    return (
      <div className="glass-panel h-full flex items-center justify-center">
        <p className="text-gray-500">No spectral data available</p>
      </div>
    );
  }

  const enrichedLines = enrichSpectralData(elementData.spectralLines);

  // Sort by wavelength for visual ordering
  const sortedLines = [...enrichedLines].sort((a, b) => a.wavelength - b.wavelength);

  return (
    <div className="glass-panel h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-accent-blue">Spectral Lines</h2>
        <p className="text-sm text-gray-400 mt-1">
          Emission spectrum for {elementData.name} ({elementData.symbol})
        </p>
      </div>

      {/* Spectrogram bars */}
      <div className="flex-1 flex items-end gap-2 min-h-[200px]">
        {sortedLines.map((line, index) => (
          <div key={index} className="flex-1 flex flex-col items-stretch">
            <SpectralLine line={line} isPlaying={isPlaying} />

            {/* Wavelength label */}
            <div className="text-[10px] text-gray-500 text-center mt-2 rotate-0">
              {line.wavelength.toFixed(0)}
            </div>
          </div>
        ))}
      </div>

      {/* Wavelength axis */}
      <div className="mt-4 pt-4 border-t border-dark-border">
        <div className="flex justify-between text-xs text-gray-500">
          <span>← Shorter wavelength (nm)</span>
          <span>Longer wavelength →</span>
        </div>
      </div>

      {/* Spectral data summary */}
      <div className="mt-4 pt-4 border-t border-dark-border">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-400">Spectral Lines</div>
            <div className="text-white font-semibold">{enrichedLines.length}</div>
          </div>
          <div>
            <div className="text-gray-400">Range</div>
            <div className="text-white font-semibold">
              {Math.min(...sortedLines.map(l => l.wavelength)).toFixed(0)}–
              {Math.max(...sortedLines.map(l => l.wavelength)).toFixed(0)} nm
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 pt-4 border-t border-dark-border">
        <div className="text-xs text-gray-500">
          <p>• Hover over bars to see detailed spectral data</p>
          <p>• Click individual bars to hear single frequencies</p>
          <p>• Bar height represents emission intensity</p>
        </div>
      </div>
    </div>
  );
}
