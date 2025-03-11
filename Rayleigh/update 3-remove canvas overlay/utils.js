// Helper function to create a full-viewport container that fills the space below the title
function createFullViewportContainer(parent, id = 'simulation-container') {
  const container = document.createElement('div');
  if (id) container.id = id;
  
  // Fill the entire browser window (minus the title height)
  container.style.width = '100vw';
  container.style.height = 'calc(100vh - 48px)';
  container.style.margin = '0';
  container.style.padding = '0 0 0 20px'; // 20px left padding
  
  // Use flexbox to vertically center the canvas and align it to the left
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'flex-start';
  
  // Make the container relatively positioned so its children can be absolutely positioned relative to it.
  container.style.position = 'relative';
  
  container.style.background = '#f4f4f4';
  
  parent.appendChild(container);
  return container;
}

function initCanvas() {
  const container = createFullViewportContainer(document.body);
  const canvas = document.createElement('canvas');
  canvas.id = 'simulationCanvas';
  
  // Set the canvas's position and a low z-index
  canvas.style.position = 'relative';
  canvas.style.zIndex = '1';
  
  // Use a subtle shadow (instead of a border)
  canvas.style.boxShadow = '2px 2px 6px rgba(0,0,0,0.2)';
  resizeCanvas(canvas, container);
  container.appendChild(canvas);
  
  window.addEventListener('resize', () => {
    resizeCanvas(canvas, container);
  });
}

function resizeCanvas(canvas, container) {
  // For example, 65% of container width, 80% of container height
  canvas.width = container.clientWidth * 0.65;
  canvas.height = container.clientHeight * 0.8;
}

document.addEventListener('DOMContentLoaded', initCanvas);
