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
  // Create a canvas that adjusts to 90% of the window size
  let canvas = createCanvas(windowWidth * 0.9, windowWidth * 0.4 * 0.9);
  canvas.parent('simulation-container'); // Attach canvas to container in HTML

  // Add event listener to toggle methane particle visibility
  select('#show-methane').changed(() => {
    showMethane = select('#show-methane').checked();
  });

  // Add event listener to toggle CO₂ particle visibility
  select('#show-co2').changed(() => {
    showCO2 = select('#show-co2').checked();
  });

  frameRate(15); // Set frame rate to 15 FPS to slow down animation
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
  text(`Temperature: ${temperatureC}°C (${temperatureF.toFixed(1)}°F)`, 10, 20); // Display temperature in Celsius and Fahrenheit
  text(`Methane: ${methaneConcentration.toFixed(3)} ppm`, 10, height - 60); // Display methane concentration
  text(`CO₂: ${co2Concentration.toFixed(0)} ppm`, 10, height - 40); // Display CO₂ concentration
  text(`CO₂ to CH₄ Ratio: ${ratio.toFixed(1)}`, 10, height - 20); // Display CO₂ to CH₄ ratio
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
    // To adjust particle size, change the values `5, 5` to a larger or smaller number
  }
}
