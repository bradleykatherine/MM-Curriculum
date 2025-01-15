// simulation.js: Main logic for the Methane Simulation

// Constants for simulation
const methaneConcentration = 1.922; // Methane concentration in ppm
const co2Concentration = 421; // CO₂ concentration in ppm
const ratio = co2Concentration / methaneConcentration; // Ratio of CO₂ to CH₄
const scaleFactor = 0.1; // Determines particle density on the canvas
const temperatureC = 15; // Temperature in Celsius
const temperatureF = (temperatureC * 9) / 5 + 32; // Temperature converted to Fahrenheit

let showMethane = true; // Toggle for methane particle visualization
let showCO2 = true; // Toggle for CO₂ particle visualization

// Preload function: Load assets before setup
// This loads the Earth image used in the simulation
function preload() {
  preloadEarthImage(); // Defined in earthVisualization.js
}

// Setup function: Initialize the canvas and interactive elements
function setup() {
  // Apply global styles dynamically
  applyGlobalStyles();

  // Create simulation title
  createSimulationTitle();

  // Create simulation controls
  createSimulationControls();

  // Create a canvas that adjusts to 90% of the window size
  let canvas = createCanvas(windowWidth * 0.9, windowWidth * 0.4 * 0.9);
const canvasContainer = createDivWithId('simulation-container', document.body);
canvasContainer.style.marginTop = '20px'; // Add space between checkbox container and canvas
canvas.parent(canvasContainer);
  frameRate(15); // Set frame rate to 15 FPS to slow down animation
}

// Function to apply global styles dynamically
function applyGlobalStyles() {
  document.body.style.fontFamily = 'Arial, sans-serif';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
  document.body.style.alignItems = 'center';
  document.body.style.background = '#f4f4f4';
}

// Function to create the simulation title dynamically
function createSimulationTitle() {
  const title = createDivWithId('title', document.body);
  title.textContent = 'Methane Simulation';
  title.style.textAlign = 'center';
  title.style.margin = '20px 0';
  title.style.fontSize = '24px';
  title.style.fontWeight = 'bold';
  title.style.color = '#333';
}

// Function to create the simulation controls dynamically
function createSimulationControls() {
  const controls = createDivWithId('controls', document.body);
  controls.style.display = 'flex';
  controls.style.flexDirection = 'row';
  controls.style.alignItems = 'flex-start';
  controls.style.border = '2px solid #333';
  controls.style.padding = '10px';
  controls.style.marginTop = '10px';
  controls.style.background = '#fff';
  controls.style.borderRadius = '8px';
  controls.style.boxShadow = '2px 2px 8px rgba(0, 0, 0, 0.2)';

  createCheckboxControl('show-methane', 'Show Methane (CH₄)', controls, true);
  createCheckboxControl('show-co2', 'Show Carbon Dioxide (CO₂)', controls, true);
}

// Helper function to create a checkbox control
function createCheckboxControl(id, labelText, parent, checked) {
  const checkboxGroup = createDivWithId(null, parent);
  checkboxGroup.style.display = 'flex';
  checkboxGroup.style.flexDirection = 'row';
  checkboxGroup.style.alignItems = 'center';
  checkboxGroup.style.gap = '5px'; // Add space between checkbox and label

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;
  checkbox.checked = checked;
  parent.appendChild(checkbox);

  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = labelText;
  label.style.fontSize = '14px';
  label.style.color = '#000';
  checkboxGroup.appendChild(label);

  parent.appendChild(checkboxGroup);

  checkbox.addEventListener('change', () => {
    if (id === 'show-methane') showMethane = checkbox.checked;
    if (id === 'show-co2') showCO2 = checkbox.checked;
  });
}

// Helper function to create a div with an optional ID
function createDivWithId(id, parent) {
  const div = document.createElement('div');
  if (id) div.id = id;
  parent.appendChild(div);
  return div;
}

// Draw function: Render simulation visuals continuously
function draw() {
  background(0); // Set the background color to black

  // Draw the Earth image scaled within the canvas
  drawEarthWithinCanvas(width, height);

  // Conditionally draw methane particles
  if (showMethane) {
    drawParticles(1, color(0, 255, 0, 150)); // Methane particles in green
  }

  // Conditionally draw CO₂ particles
  if (showCO2) {
    drawParticles(ratio, color(255, 0, 0, 150)); // CO₂ particles in red
  }

  // Display constants and metrics on the canvas
  displayConstants();
}

// Resize canvas dynamically when the window size changes
function windowResized() {
  resizeCanvas(windowWidth * 0.9, windowWidth * 0.4 * 0.9); // Adjust canvas size
}

// Display constants and metrics on the canvas
function displayConstants() {
  fill(255); // Set text color to white
  textSize(16); // Set text size
  text(`Average Global Temperature: ${temperatureC}°C (${temperatureF.toFixed(1)}°F)`, 10, 20); // Display temperature in Celsius and Fahrenheit
  text(`Methane Concentration: ${methaneConcentration.toFixed(3)} ppm`, 10, height - 60); // Display methane concentration
  text(`Carbon Dioxide Concentration: ${co2Concentration.toFixed(0)} ppm`, 10, height - 40); // Display CO₂ concentration
  text(`Carbon Dioxide to Methane Ratio: ${ratio.toFixed(1)}`, 10, height - 20); // Display CO₂ to CH₄ ratio
}

// Draw the Earth image centered and scaled within the canvas bounds
function drawEarthWithinCanvas(canvasWidth, canvasHeight) {
  if (!earthImage) {
    console.error('Earth image not loaded. Ensure preloadEarthImage() is called before setup.');
    return;
  }

  // Calculate aspect ratio and maximum size for the Earth image
  let aspectRatio = earthImage.width / earthImage.height;
  let maxDiameter = Math.min(canvasWidth, canvasHeight) * 0.9; // 90% of the smaller canvas dimension

  let earthWidth, earthHeight;
  if (aspectRatio > 1) {
    earthWidth = maxDiameter; // Landscape image: Width limits scaling
    earthHeight = maxDiameter / aspectRatio;
  } else {
    earthHeight = maxDiameter; // Portrait image: Height limits scaling
    earthWidth = maxDiameter * aspectRatio;
  }

  // Draw the Earth image centered within the canvas
  imageMode(CENTER);
  image(earthImage, canvasWidth / 2, canvasHeight / 2, earthWidth, earthHeight);
}

// Draw particles representing gas concentrations
// The particle size and number are influenced by `scaleFactor` and the gas ratio
function drawParticles(concentrationRatio, colorVal) {
  let numParticles = scaleFactor * concentrationRatio; // Number of particles proportional to concentration ratio
  fill(colorVal); // Set particle fill color

  for (let i = 0; i < numParticles; i++) {
    let x, y;
    do {
      x = random(width); // Random x-coordinate within canvas
      y = random(height); // Random y-coordinate within canvas
    } while (dist(x, y, width / 2, height / 2) > height / 2); // Ensure particles stay within a circular area

    ellipse(x, y, 8, 8); // Draw a particle as a circle (size: 8 pixels)
  }
}
