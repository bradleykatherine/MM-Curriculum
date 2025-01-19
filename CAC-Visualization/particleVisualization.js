// particleVisualization.js: Handles particle visualization and interaction

let showMethane = true; // Boolean to toggle methane particle visualization
let showCO2 = true; // Boolean to toggle CO₂ particle visualization
let showN2O = true; // Boolean to toggle Nitrous Oxide (N₂O) visualization

// Base ratios normalized to methane concentration
const methaneBaseRatio = 1.0; // Methane is the base for all ratios
const n2oBaseRatio = 0.33 / 1.922; // N₂O ratio relative to methane
const co2BaseRatio = 421 / 1.922; // CO₂ ratio relative to methane

// Function to create particle visualization controls (checkboxes for toggling methane, CO₂, and N₂O visualization)
function createParticleControls(parentElement) {
  const controls = createDivWithId('particle-controls', parentElement); // Create a container div for controls
  controls.style.display = 'flex'; // Set display style to flex for alignment
  controls.style.flexDirection = 'row'; // Align controls in a row
  controls.style.alignItems = 'flex-start'; // Align items at the start
  controls.style.border = '2px solid #333'; // Add a border
  controls.style.padding = '10px'; // Add padding
  controls.style.marginTop = '10px'; // Add margin
  controls.style.background = '#fff'; // Set background color
  controls.style.borderRadius = '8px'; // Round the corners
  controls.style.boxShadow = '2px 2px 8px rgba(0, 0, 0, 0.2)'; // Add shadow effect

  // Create checkboxes for toggling visualizations
  createCheckboxControl('show-methane', 'Show Methane (CH₄)', controls, showMethane);
  createCheckboxControl('show-co2', 'Show Carbon Dioxide (CO₂)', controls, showCO2);
  createCheckboxControl('show-n2o', 'Show Nitrous Oxide (N₂O)', controls, showN2O);
}

// Helper function to create an individual checkbox control
function createCheckboxControl(id, labelText, parent, initialState) {
  const checkboxGroup = createDivWithId(null, parent); // Create a container for checkbox and label
  checkboxGroup.style.display = 'flex';
  checkboxGroup.style.flexDirection = 'row';
  checkboxGroup.style.alignItems = 'center';
  checkboxGroup.style.gap = '5px';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;
  checkbox.checked = initialState;
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
    if (id === 'show-n2o') showN2O = checkbox.checked;
  });
}

// Function to draw particles representing gas concentrations
function drawParticles(numParticles, colorVal) {
  fill(colorVal); // Set particle color
  for (let i = 0; i < numParticles; i++) {
    let x, y;
    do {
      x = random(width);
      y = random(height);
    } while (dist(x, y, width / 2, height / 2) > height / 2); // Keep particles inside a circular area
    ellipse(x, y, 12, 12); // Draw a particle (Size: 12x12)
  }
}

// Function to draw particles for all atmospheric gases
function drawAllParticles(scaleFactor) {
  if (showMethane) drawParticles(methaneBaseRatio * scaleFactor, color(0, 255, 0, 150)); // Methane particles
  if (showCO2) drawParticles(co2BaseRatio * scaleFactor, color(255, 0, 0, 150)); // CO₂ particles
  if (showN2O) drawParticles(n2oBaseRatio * scaleFactor, color(0, 0, 255, 150)); // N₂O particles in blue
}
