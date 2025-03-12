// Create a full-viewport container (fills entire browser window) and return it.
function createFullViewportContainer(parent, id = 'simulation-container') {
  const container = document.createElement('div');
  if (id) container.id = id;
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.margin = '0';
  container.style.padding = '0';
  // Centering the content in case you want it, but we'll position canvases absolutely.
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  // Make container relatively positioned for proper placement of absolute children.
  container.style.position = 'relative';
  container.style.background = '#f4f4f4';
  container.style.overflow = 'hidden'; // Prevent scrolling
  parent.appendChild(container);
  return container;
}

// Create two layered canvases: one for the main simulation and one for the scattered rays.
function createLayeredCanvases(parent) {
  const container = createFullViewportContainer(parent);
  
  // Create the main simulation canvas.
  const simulationCanvas = document.createElement('canvas');
  simulationCanvas.id = 'simulationCanvas';
  // Apply the shadow outline.
  simulationCanvas.style.boxShadow = '2px 2px 6px rgba(0,0,0,0.2)';
  // Position absolutely so it layers properly.
  simulationCanvas.style.position = 'absolute';
  simulationCanvas.style.top = '0';
  simulationCanvas.style.left = '0';
  simulationCanvas.style.zIndex = '1';
  
  // Create the scattered rays canvas.
  const scatteredCanvas = document.createElement('canvas');
  scatteredCanvas.id = 'scatteredCanvas';
  scatteredCanvas.style.position = 'absolute';
  scatteredCanvas.style.top = '0';
  scatteredCanvas.style.left = '0';
  // Place the scattered canvas on top.
  scatteredCanvas.style.zIndex = '2';
  
  // Append both canvases to the container.
  container.appendChild(simulationCanvas);
  container.appendChild(scatteredCanvas);
  
  // Set initial sizes for both canvases.
  resizeCanvases(simulationCanvas, scatteredCanvas, container);
  
  // Adjust canvas sizes on window resize.
  window.addEventListener('resize', () => {
    resizeCanvases(simulationCanvas, scatteredCanvas, container);
  });
}

// Resize both canvases based on the container's dimensions.
function resizeCanvases(simulationCanvas, scatteredCanvas, container) {
  // For example, use 65% of container width and 80% of container height.
  simulationCanvas.width = container.clientWidth * 0.65;
  simulationCanvas.height = container.clientHeight * 0.8;
  
  // The scattered canvas should match the simulation canvas.
  scatteredCanvas.width = simulationCanvas.width;
  scatteredCanvas.height = simulationCanvas.height;
}

function initCanvas() {
  // Ensure no scrollbars on the document.
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  createLayeredCanvases(document.body);
}

document.addEventListener('DOMContentLoaded', initCanvas);
