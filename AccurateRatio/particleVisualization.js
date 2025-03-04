// particleVisualization.js: Handles particle visualization and interaction

let showMethane = false; // Toggle methane particle visualization
let showCO2 = false;     // Toggle Carbon Dioxide (CO₂) visualization
let showN2O = false;     // Toggle Nitrous Oxide (N₂O) visualization

// Global offscreen graphics layers for each gas.
let methaneLayer, co2Layer, n2oLayer;

// Function to create particle visualization controls (checkboxes for toggling visualizations)
function createParticleControls(parentElement) {
  const controls = createDivWithId('particle-controls', parentElement); // Container for controls
  controls.style.display = 'flex';
  controls.style.flexDirection = 'row';
  controls.style.alignItems = 'flex-start';
  controls.style.border = '2px solid #333';
  controls.style.padding = '10px';
  controls.style.marginTop = '10px';
  controls.style.background = '#fff';
  controls.style.borderRadius = '8px';
  controls.style.boxShadow = '2px 2px 8px rgba(0, 0, 0, 0.2)';

  createCheckboxControl('show-methane', 'Show Methane (CH₄)', controls, showMethane);
  createCheckboxControl('show-co2', 'Show Carbon Dioxide (CO₂)', controls, showCO2);
  createCheckboxControl('show-n2o', 'Show Nitrous Oxide (N₂O)', controls, showN2O);
}

// Helper function to create an individual checkbox control
function createCheckboxControl(id, labelText, parent, initialState) {
  const checkboxGroup = createDivWithId(null, parent);
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

  // When toggled, update the global variable and call redraw() to display/hide the corresponding layer.
  checkbox.addEventListener('change', () => {
    if (id === 'show-methane') showMethane = checkbox.checked;
    if (id === 'show-co2') showCO2 = checkbox.checked;
    if (id === 'show-n2o') showN2O = checkbox.checked;
    redraw();
  });
}

// Generates a random position within the annular region defined by inner and outer radii.
function generateAnnularPosition(innerRadius, outerRadius) {
  let x, y, d;
  do {
    x = random(width);
    y = random(height);
    d = dist(x, y, width / 2, height / 2);
  } while (d > outerRadius || d < innerRadius);
  return { x, y };
}

// Pre-render the particle layers for each gas onto their respective offscreen graphics.
function initializeParticleLayers(scaleFactor) {
  // Annular region boundaries (same as before):
  let outerRadius = (min(width, height) * 0.75 * 0.95) / 2.5;
  let innerRadius = (min(width, height) * 0.75 * 0.95) / 3;
  
  // Conversion factor for particle sizes.
  const moleculeSizeScale = 8; 
  const methaneSize = 0.33 * moleculeSizeScale; // ≈ 12px
  const co2Size = 0.4 * moleculeSizeScale;        // ≈ 14.54px
  const n2oSize = 0.29 * moleculeSizeScale;        // ≈ 10.55px
  
  // Clear the graphics layers.
  methaneLayer.clear();
  co2Layer.clear();
  n2oLayer.clear();
  
  // Determine the number of particles.
  let numMethane = Math.round(methaneConcentration * scaleFactor);
  let numCO2 = Math.round(co2Concentration * scaleFactor);
  let numN2O = Math.round(n2oConcentration * scaleFactor);
  
  // Set fill colors for each layer.
  methaneLayer.fill(color(255, 165, 0, 200));  // Bright orange
  co2Layer.fill(color(255, 255, 0, 150));        // Bright yellow
  n2oLayer.fill(color(255, 0, 0, 255));           // Bright red
  
  // Pre-render particles for each gas.
  for (let i = 0; i < numMethane; i++) {
    let pos = generateAnnularPosition(innerRadius, outerRadius);
    methaneLayer.ellipse(pos.x, pos.y, methaneSize, methaneSize);
  }
  for (let i = 0; i < numCO2; i++) {
    let pos = generateAnnularPosition(innerRadius, outerRadius);
    co2Layer.ellipse(pos.x, pos.y, co2Size, co2Size);
  }
  for (let i = 0; i < numN2O; i++) {
    let pos = generateAnnularPosition(innerRadius, outerRadius);
    n2oLayer.ellipse(pos.x, pos.y, n2oSize, n2oSize);
  }
}

