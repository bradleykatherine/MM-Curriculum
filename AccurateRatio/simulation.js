// simulation.js: Main logic for the Methane Simulation

function preload() {
  initializeEarthVisualization(); // Initialize Earth visualization (from earthVisualization.js)
}

function setup() {
  applyGlobalStyles();                   // Apply global styles (from utils.js)
  createSimulationTitle(document.body);  // Create the simulation title (from utils.js)
  createParticleControls(document.body); // Create checkboxes for toggling particle visualizations

  // Create a formatted canvas container and main canvas.
  const canvasContainer = createCanvasContainer(document.body);
  let canvas = createCanvas(windowWidth * 0.9, windowWidth * 0.4 * 0.9);
  canvas.parent(canvasContainer);
  
  // Create offscreen graphics layers for each gas.
  methaneLayer = createGraphics(width, height);
  co2Layer = createGraphics(width, height);
  n2oLayer = createGraphics(width, height);
  
  // Pre-render particle layers once.
  initializeParticleLayers(scaleFactor);
  
  noLoop(); // Create a static image – draw() runs only once (or on manual redraw).
}

function draw() {
  background(255); // White background
  drawEarth(width, height); // Draw the Earth image (from earthVisualization.js)
  
  // Use CENTER mode to ensure the offscreen layers are drawn centered.
  imageMode(CENTER);
  
  // Draw the layers in the desired order:
  // CO₂ in the back, methane in the middle, nitrous oxide on top.
  if (showCO2) image(co2Layer, width / 2, height / 2);
  if (showMethane) image(methaneLayer, width / 2, height / 2);
  if (showN2O) image(n2oLayer, width / 2, height / 2);
  
  displayReadouts(temperatureC, temperatureF, methaneConcentration, co2Concentration, n2oConcentration); // From canvasReadouts.js
}

function windowResized() {
  // Resize the main canvas.
  resizeCanvas(windowWidth * 0.9, windowWidth * 0.4 * 0.9);
  
  // Re-create offscreen graphics layers with updated dimensions.
  methaneLayer = createGraphics(width, height);
  co2Layer = createGraphics(width, height);
  n2oLayer = createGraphics(width, height);
  
  // Reinitialize the particle layers so the annular region adjusts to the new size.
  initializeParticleLayers(scaleFactor);
  
  redraw();
}
