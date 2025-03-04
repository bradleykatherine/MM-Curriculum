// utils.js: Shared utility functions

// Helper function to create a div element with an optional ID
function createDivWithId(id, parent) {
  const div = document.createElement('div');
  if (id) div.id = id;
  parent.appendChild(div);
  return div;
}

// Helper function to create and format a canvas container
function createCanvasContainer(parent, id = 'simulation-container') {
  const container = createDivWithId(id, parent);
  container.style.marginTop = '20px';
  container.style.border = "1px solid black"; // Added thin black border
  return container;
}

// Apply global styles to the document
function applyGlobalStyles() {
  document.body.style.fontFamily = 'Arial, sans-serif';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
  document.body.style.alignItems = 'center';
  document.body.style.background = '#f4f4f4';
}

// Create and style the simulation title
function createSimulationTitle(parent) {
  const title = createDivWithId('title', parent);
  title.textContent = 'Current Atmospheric Composition Model';
  title.style.textAlign = 'center';
  title.style.margin = '20px 0';
  title.style.fontSize = '24px';
  title.style.fontWeight = 'bold';
  title.style.color = '#333';
}

// Constants for simulation
const methaneConcentration = 1.922; // Methane concentration in ppm
const co2Concentration = 421;         // CO₂ concentration in ppm
const n2oConcentration = 0.33;         // Nitrous Oxide concentration in ppm

// Scale factor for particle density (chosen so that all particle counts are whole numbers)
// Methane: 1.922 * 500 = 961, CO₂: 421 * 500 = 210500, N₂O: 0.33 * 500 = 165
let scaleFactor = 500;

// Temperature constants
const temperatureC = 15; // Average global temperature in Celsius
const temperatureF = (temperatureC * 9) / 5 + 32; // Convert to Fahrenheit
