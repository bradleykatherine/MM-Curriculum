// utils.js: Shared utility functions

// Helper function to create a div element with an optional ID
function createDivWithId(id, parent) {
  const div = document.createElement('div'); // Create a new div element
  if (id) div.id = id; // Assign the ID to the div if provided
  parent.appendChild(div); // Append the div to the specified parent element
  return div; // Return the created div
}

// Helper function to create and format a canvas container
function createCanvasContainer(parent, id = 'simulation-container') {
  const container = createDivWithId(id, parent); // Create the container div
  container.style.marginTop = '20px'; // Add margin at the top
  return container; // Return the container element
}

// Function to apply global styles to the document dynamically
function applyGlobalStyles() {
  document.body.style.fontFamily = 'Arial, sans-serif'; // Set font family for the body
  document.body.style.margin = '0'; // Remove default margins
  document.body.style.padding = '0'; // Remove default padding
  document.body.style.display = 'flex'; // Use flexbox layout for the body
  document.body.style.flexDirection = 'column'; // Arrange items in a column layout
  document.body.style.alignItems = 'center'; // Center-align items horizontally
  document.body.style.background = '#f4f4f4'; // Set a light gray background color
}

// Function to create and style the simulation title
function createSimulationTitle(parent) {
  const title = createDivWithId('title', parent); // Create a div for the title
  title.textContent = 'Current Atmospheric Composition Model'; // Set the text content of the title
  title.style.textAlign = 'center'; // Center-align the title text
  title.style.margin = '20px 0'; // Add vertical margins
  title.style.fontSize = '24px'; // Set font size for the title
  title.style.fontWeight = 'bold'; // Make the title text bold
  title.style.color = '#333'; // Set the text color to dark gray
}

// Constants for simulation
const methaneConcentration = 1.922; // Methane concentration in parts per million (ppm)
const co2Concentration = 421; // CO₂ concentration in ppm
const n2oConcentration = 0.33; // Nitrous Oxide concentration in ppm

// Ratios for visualization
const methaneRatio = 1.0; // Methane is the base for all ratios
const n2oRatio = n2oConcentration / methaneConcentration; // Ratio of N₂O to methane
const co2Ratio = co2Concentration / methaneConcentration; // Ratio of CO₂ to methane

// Scale factor for particle density
let scaleFactor = 0.1; // Determines the density of particles for all gases

// Temperature constants
const temperatureC = 15; // Average global temperature in Celsius
const temperatureF = (temperatureC * 9) / 5 + 32; // Convert temperature to Fahrenheit
