/**
 * NIST Atomic Spectra Database
 * Contains emission line data for elements 1-20 (H through Ca)
 * Data includes wavelengths (nm) and relative intensities
 *
 * Source: NIST Atomic Spectra Database (https://physics.nist.gov/PhysRefData/ASD/lines_form.html)
 */

export const atomicSpectraData = {
  H: {
    atomicNumber: 1,
    name: "Hydrogen",
    symbol: "H",
    spectralLines: [
      { wavelength: 656.3, intensity: 100, transition: "Hα (n=3→2)" },  // Balmer alpha (red)
      { wavelength: 486.1, intensity: 46, transition: "Hβ (n=4→2)" },   // Balmer beta (cyan)
      { wavelength: 434.0, intensity: 25, transition: "Hγ (n=5→2)" },   // Balmer gamma (blue)
      { wavelength: 410.2, intensity: 15, transition: "Hδ (n=6→2)" },   // Balmer delta (violet)
    ]
  },

  He: {
    atomicNumber: 2,
    name: "Helium",
    symbol: "He",
    spectralLines: [
      { wavelength: 587.6, intensity: 100, transition: "D3 line" },     // Yellow (HeI)
      { wavelength: 501.6, intensity: 80, transition: "HeI" },          // Green-cyan
      { wavelength: 471.3, intensity: 60, transition: "HeI" },          // Blue
      { wavelength: 447.1, intensity: 50, transition: "HeI" },          // Deep blue
      { wavelength: 668.0, intensity: 70, transition: "HeI" },          // Red
    ]
  },

  Li: {
    atomicNumber: 3,
    name: "Lithium",
    symbol: "Li",
    spectralLines: [
      { wavelength: 670.8, intensity: 100, transition: "LiI D-line" },  // Deep red (dominant)
      { wavelength: 610.4, intensity: 30, transition: "LiI" },          // Orange-red
      { wavelength: 460.3, intensity: 15, transition: "LiI" },          // Blue
    ]
  },

  Be: {
    atomicNumber: 4,
    name: "Beryllium",
    symbol: "Be",
    spectralLines: [
      { wavelength: 234.9, intensity: 100, transition: "BeII" },        // UV (represented as violet)
      { wavelength: 313.0, intensity: 80, transition: "BeII" },         // UV-A (violet)
      { wavelength: 332.1, intensity: 60, transition: "BeI" },          // Violet-edge
    ]
  },

  B: {
    atomicNumber: 5,
    name: "Boron",
    symbol: "B",
    spectralLines: [
      { wavelength: 249.7, intensity: 100, transition: "BI" },          // UV (violet)
      { wavelength: 345.1, intensity: 50, transition: "BI" },           // Violet
      { wavelength: 412.2, intensity: 30, transition: "BI" },           // Violet-blue
    ]
  },

  C: {
    atomicNumber: 6,
    name: "Carbon",
    symbol: "C",
    spectralLines: [
      { wavelength: 247.9, intensity: 100, transition: "CI" },          // UV (violet)
      { wavelength: 426.7, intensity: 40, transition: "CI" },           // Blue-violet
      { wavelength: 538.0, intensity: 25, transition: "CI" },           // Green
      { wavelength: 711.5, intensity: 20, transition: "CI" },           // Red
    ]
  },

  N: {
    atomicNumber: 7,
    name: "Nitrogen",
    symbol: "N",
    spectralLines: [
      { wavelength: 399.5, intensity: 100, transition: "NII" },         // Violet
      { wavelength: 463.0, intensity: 80, transition: "NII" },          // Blue
      { wavelength: 500.5, intensity: 70, transition: "NI" },           // Cyan-green
      { wavelength: 567.6, intensity: 50, transition: "NI" },           // Yellow-green
      { wavelength: 746.8, intensity: 60, transition: "NI" },           // Red
    ]
  },

  O: {
    atomicNumber: 8,
    name: "Oxygen",
    symbol: "O",
    spectralLines: [
      { wavelength: 436.8, intensity: 100, transition: "OII" },         // Blue
      { wavelength: 441.5, intensity: 95, transition: "OII" },          // Blue
      { wavelength: 500.0, intensity: 60, transition: "OIII" },         // Cyan-green
      { wavelength: 615.8, intensity: 70, transition: "OI" },           // Orange
      { wavelength: 777.4, intensity: 80, transition: "OI" },           // Deep red
    ]
  },

  F: {
    atomicNumber: 9,
    name: "Fluorine",
    symbol: "F",
    spectralLines: [
      { wavelength: 634.9, intensity: 100, transition: "FI" },          // Red-orange
      { wavelength: 685.6, intensity: 90, transition: "FI" },           // Red
      { wavelength: 690.2, intensity: 85, transition: "FI" },           // Red
      { wavelength: 703.7, intensity: 80, transition: "FI" },           // Red
    ]
  },

  Ne: {
    atomicNumber: 10,
    name: "Neon",
    symbol: "Ne",
    spectralLines: [
      { wavelength: 640.2, intensity: 100, transition: "NeI" },         // Red-orange (neon glow)
      { wavelength: 633.4, intensity: 95, transition: "NeI" },          // Red-orange
      { wavelength: 585.2, intensity: 70, transition: "NeI" },          // Yellow
      { wavelength: 534.1, intensity: 50, transition: "NeI" },          // Green
      { wavelength: 614.3, intensity: 85, transition: "NeI" },          // Orange
    ]
  },

  Na: {
    atomicNumber: 11,
    name: "Sodium",
    symbol: "Na",
    spectralLines: [
      { wavelength: 589.0, intensity: 100, transition: "NaI D1" },      // Yellow (D-doublet)
      { wavelength: 589.6, intensity: 100, transition: "NaI D2" },      // Yellow
      { wavelength: 568.3, intensity: 25, transition: "NaI" },          // Yellow-green
      { wavelength: 615.4, intensity: 20, transition: "NaI" },          // Orange
    ]
  },

  Mg: {
    atomicNumber: 12,
    name: "Magnesium",
    symbol: "Mg",
    spectralLines: [
      { wavelength: 518.4, intensity: 100, transition: "MgI" },         // Green (brilliant)
      { wavelength: 517.3, intensity: 50, transition: "MgI" },          // Green
      { wavelength: 383.8, intensity: 40, transition: "MgII" },         // Violet
      { wavelength: 552.8, intensity: 30, transition: "MgI" },          // Yellow-green
    ]
  },

  Al: {
    atomicNumber: 13,
    name: "Aluminum",
    symbol: "Al",
    spectralLines: [
      { wavelength: 396.2, intensity: 100, transition: "AlI" },         // Violet
      { wavelength: 394.4, intensity: 95, transition: "AlI" },          // Violet
      { wavelength: 308.2, intensity: 60, transition: "AlI" },          // UV-violet
      { wavelength: 309.3, intensity: 55, transition: "AlI" },          // UV-violet
    ]
  },

  Si: {
    atomicNumber: 14,
    name: "Silicon",
    symbol: "Si",
    spectralLines: [
      { wavelength: 390.6, intensity: 100, transition: "SiI" },         // Violet
      { wavelength: 505.6, intensity: 50, transition: "SiI" },          // Cyan
      { wavelength: 634.7, intensity: 40, transition: "SiI" },          // Red-orange
      { wavelength: 288.2, intensity: 80, transition: "SiI" },          // UV
    ]
  },

  P: {
    atomicNumber: 15,
    name: "Phosphorus",
    symbol: "P",
    spectralLines: [
      { wavelength: 253.6, intensity: 100, transition: "PI" },          // UV (violet)
      { wavelength: 255.3, intensity: 95, transition: "PI" },           // UV (violet)
      { wavelength: 213.6, intensity: 60, transition: "PI" },           // Deep UV
      { wavelength: 214.9, intensity: 55, transition: "PI" },           // Deep UV
    ]
  },

  S: {
    atomicNumber: 16,
    name: "Sulfur",
    symbol: "S",
    spectralLines: [
      { wavelength: 469.4, intensity: 100, transition: "SI" },          // Blue
      { wavelength: 545.4, intensity: 80, transition: "SI" },           // Green
      { wavelength: 564.0, intensity: 70, transition: "SI" },           // Yellow-green
      { wavelength: 921.3, intensity: 60, transition: "SI" },           // Near-IR (red)
    ]
  },

  Cl: {
    atomicNumber: 17,
    name: "Chlorine",
    symbol: "Cl",
    spectralLines: [
      { wavelength: 479.5, intensity: 100, transition: "ClI" },         // Blue-cyan
      { wavelength: 481.0, intensity: 95, transition: "ClI" },          // Blue-cyan
      { wavelength: 725.7, intensity: 70, transition: "ClI" },          // Red
      { wavelength: 837.6, intensity: 65, transition: "ClI" },          // Near-IR (red)
    ]
  },

  Ar: {
    atomicNumber: 18,
    name: "Argon",
    symbol: "Ar",
    spectralLines: [
      { wavelength: 696.5, intensity: 100, transition: "ArI" },         // Red (argon glow)
      { wavelength: 706.7, intensity: 95, transition: "ArI" },          // Red
      { wavelength: 738.4, intensity: 90, transition: "ArI" },          // Red
      { wavelength: 751.5, intensity: 85, transition: "ArI" },          // Red
      { wavelength: 420.1, intensity: 70, transition: "ArII" },         // Blue-violet
    ]
  },

  K: {
    atomicNumber: 19,
    name: "Potassium",
    symbol: "K",
    spectralLines: [
      { wavelength: 766.5, intensity: 100, transition: "KI D1" },       // Red (D-doublet)
      { wavelength: 769.9, intensity: 100, transition: "KI D2" },       // Red
      { wavelength: 404.4, intensity: 30, transition: "KI" },           // Violet
      { wavelength: 404.7, intensity: 30, transition: "KI" },           // Violet
    ]
  },

  Ca: {
    atomicNumber: 20,
    name: "Calcium",
    symbol: "Ca",
    spectralLines: [
      { wavelength: 422.7, intensity: 100, transition: "CaI (H-line)" },// Blue-violet
      { wavelength: 393.4, intensity: 95, transition: "CaII (K-line)" },// Violet
      { wavelength: 396.8, intensity: 90, transition: "CaII (H-line)" },// Violet
      { wavelength: 558.9, intensity: 40, transition: "CaI" },          // Yellow-green
      { wavelength: 643.9, intensity: 35, transition: "CaI" },          // Red-orange
    ]
  }
};

/**
 * Helper function to get element data by symbol
 */
export const getElementData = (symbol) => {
  return atomicSpectraData[symbol] || null;
};

/**
 * Get all available elements as an array
 */
export const getAllElements = () => {
  return Object.entries(atomicSpectraData).map(([symbol, data]) => ({
    symbol,
    ...data
  }));
};
