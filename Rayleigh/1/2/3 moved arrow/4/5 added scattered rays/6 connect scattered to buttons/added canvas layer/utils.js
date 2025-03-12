// Create a full-viewport container and two layered canvases.
function createLayeredCanvases(parent, containerId = 'canvasContainer') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('No container found with ID "' + containerId + '"');
    return;
  }
  
  // Adjust container styling to avoid extra space causing scrollbars.
  container.style.width = '100vw';
  container.style.height = '100vh'; // Use full viewport height.
  container.style.margin = '0';
  container.style.padding = '0';
  container.style.overflow = 'hidden'; // Ensure no scrollbars.
  container.style.position = 'relative';
  container.style.background = '#f4f4f4';
  
  // Create the main simulation canvas.
  const simulationCanvas = document.createElement('canvas');
  simulationCanvas.id = 'simulationCanvas';
  // Apply the shadow outline.
  simulationCanvas.style.boxShadow = '2px 2px 6px rgba(0,0,0,0.2)';
  simulationCanvas.style.position = 'relative';
  simulationCanvas.style.zIndex = '1';
  
  // Create the scattered rays canvas.
  const scatteredCanvas = document.createElement('canvas');
  scatteredCanvas.id = 'scatteredCanvas';
  scatteredCanvas.style.position = 'absolute';
  scatteredCanvas.style.top = '0';
  scatteredCanvas.style.left = '0';
  scatteredCanvas.style.zIndex = '2';
  
  // Set canvas sizes based on the container dimensions, scaled down.
  function resizeCanvases() {
    const width = container.clientWidth * 0.65;
    const height = container.clientHeight * 0.8;
    simulationCanvas.width = width;
    simulationCanvas.height = height;
    scatteredCanvas.width = width;
    scatteredCanvas.height = height;
  }
  
  resizeCanvases();
  container.appendChild(simulationCanvas);
  container.appendChild(scatteredCanvas);
  
  window.addEventListener('resize', resizeCanvases);
}

document.addEventListener('DOMContentLoaded', () => {
  createLayeredCanvases(document.body);
});
