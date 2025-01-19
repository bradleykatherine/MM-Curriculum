// simulation.js: Main logic for the Methane Simulation

// Preload function: Load all necessary assets before the simulation setup
function preload() {
  initializeEarthVisualization(); // Initialize the Earth visualization (from earthVisualization.js)
}

// Setup function: Initialize the canvas and interactive elements
function setup() {
  applyGlobalStyles(); // Apply global styles (from utils.js)

  createSimulationTitle(document.body); // Create the simulation title (from utils.js)

  createParticleControls(document.body); // Create checkboxes for toggling particle visualizations

  // Create a formatted canvas container
  const canvasContainer = createCanvasContainer(document.body); // Create the canvas container (from utils.js)
  let canvas = createCanvas(windowWidth * 0.9, windowWidth * 0.4 * 0.9); // Create the canvas with dynamic sizing
  canvas.parent(canvasContainer); // Attach the canvas to the container

  frameRate(15); // Set the frame rate to 15 FPS to slow down the animation
}

// Draw function: Continuously render the simulation visuals
function draw() {
  background(0); // Set the background color of the canvas to black

  drawEarth(width, height); // Draw the Earth image scaled within the canvas (from earthVisualization.js)

  drawAllParticles(scaleFactor); // Draw particles for all gases (from particleVisualization.js)

  displayReadouts(temperatureC, temperatureF, methaneConcentration, co2Concentration, n2oConcentration); // Display atmospheric readouts (from canvasReadouts.js)
}

// Function to dynamically resize the canvas when the window size changes
function windowResized() {
  resizeCanvas(windowWidth * 0.9, windowWidth * 0.4 * 0.9); // Adjust canvas size while maintaining aspect ratio
}
