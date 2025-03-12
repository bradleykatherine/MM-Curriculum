// Create a full-viewport container (below the title) and the simulation canvas.
function createFullViewportContainer(parent, id = 'simulation-container') {
  const container = document.createElement('div');
  if (id) container.id = id;
  container.style.width = '100vw';
  container.style.height = 'calc(100vh - 48px)'; // subtract estimated title height
  container.style.margin = '0';
  container.style.padding = '0 0 0 20px'; // 20px left padding
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'flex-start';
  // Make container relatively positioned for proper placement of absolute children.
  container.style.position = 'relative';
  container.style.background = '#f4f4f4';
  parent.appendChild(container);
  return container;
}

function initCanvas() {
  const container = createFullViewportContainer(document.body);
  const canvas = document.createElement('canvas');
  canvas.id = 'simulationCanvas';
  
  // Give the canvas a subtle shadow instead of a border.
  canvas.style.boxShadow = '2px 2px 6px rgba(0,0,0,0.2)';
  canvas.style.position = 'relative';
  canvas.style.zIndex = '1';
  
  resizeCanvas(canvas, container);
  container.appendChild(canvas);
  
  window.addEventListener('resize', () => { resizeCanvas(canvas, container); });
}

function resizeCanvas(canvas, container) {
  canvas.width = container.clientWidth * 0.65;
  canvas.height = container.clientHeight * 0.8;
}

document.addEventListener('DOMContentLoaded', initCanvas);
