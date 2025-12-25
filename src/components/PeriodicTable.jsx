import { getAllElements } from '../data/atomicSpectra';
import { getElementColor } from '../utils/physics';

/**
 * Individual element tile in the periodic table
 */
function ElementTile({ element, isSelected, onClick }) {
  const elementColor = getElementColor(element.spectralLines);

  return (
    <button
      onClick={() => onClick(element)}
      className={`
        relative group transition-all duration-200
        ${isSelected
          ? 'ring-2 ring-accent-blue scale-105 z-10'
          : 'hover:scale-105 hover:z-10'
        }
      `}
      style={{
        backgroundColor: isSelected ? `${elementColor.hex}20` : '#151b2b',
        borderColor: isSelected ? elementColor.hex : '#1f2937',
      }}
    >
      <div className="aspect-square p-2 border rounded-lg relative overflow-hidden">
        {/* Atomic number */}
        <div className="text-[10px] text-gray-500 absolute top-1 left-1">
          {element.atomicNumber}
        </div>

        {/* Element symbol */}
        <div
          className={`text-lg font-bold text-center mt-2 transition-colors ${
            isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
          }`}
          style={{
            color: isSelected ? elementColor.hex : undefined,
          }}
        >
          {element.symbol}
        </div>

        {/* Element name (on hover) */}
        <div className="text-[9px] text-gray-500 text-center truncate mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {element.name}
        </div>

        {/* Glow effect when selected */}
        {isSelected && (
          <div
            className="absolute inset-0 opacity-20 blur-md"
            style={{ backgroundColor: elementColor.hex }}
          />
        )}
      </div>
    </button>
  );
}

/**
 * Periodic table layout for first 20 elements
 */
export default function PeriodicTable({ selectedElement, onSelectElement }) {
  const elements = getAllElements();

  // Layout positions for first 20 elements (simplified periodic table)
  // Using grid positioning: [row, column]
  const layout = {
    H:  [0, 0],  // Hydrogen
    He: [0, 17], // Helium
    Li: [1, 0],  // Lithium
    Be: [1, 1],  // Beryllium
    B:  [1, 12], // Boron
    C:  [1, 13], // Carbon
    N:  [1, 14], // Nitrogen
    O:  [1, 15], // Oxygen
    F:  [1, 16], // Fluorine
    Ne: [1, 17], // Neon
    Na: [2, 0],  // Sodium
    Mg: [2, 1],  // Magnesium
    Al: [2, 12], // Aluminum
    Si: [2, 13], // Silicon
    P:  [2, 14], // Phosphorus
    S:  [2, 15], // Sulfur
    Cl: [2, 16], // Chlorine
    Ar: [2, 17], // Argon
    K:  [3, 0],  // Potassium
    Ca: [3, 1],  // Calcium
  };

  return (
    <div className="glass-panel">
      <h2 className="text-xl font-bold mb-4 text-accent-blue">Periodic Table</h2>
      <p className="text-sm text-gray-400 mb-4">Select an element to explore its atomic signature</p>

      {/* Grid layout */}
      <div className="relative" style={{ height: '300px' }}>
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: 'repeat(18, 1fr)',
            gridTemplateRows: 'repeat(4, 1fr)',
          }}
        >
          {elements.map((element) => {
            const [row, col] = layout[element.symbol] || [0, 0];

            return (
              <div
                key={element.symbol}
                style={{
                  gridColumn: col + 1,
                  gridRow: row + 1,
                }}
              >
                <ElementTile
                  element={element}
                  isSelected={selectedElement?.symbol === element.symbol}
                  onClick={onSelectElement}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-dark-border">
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Hover over elements to see their names</p>
          <p>• Click to select and visualize atomic properties</p>
          <p>• Element colors based on dominant spectral emission</p>
        </div>
      </div>
    </div>
  );
}
