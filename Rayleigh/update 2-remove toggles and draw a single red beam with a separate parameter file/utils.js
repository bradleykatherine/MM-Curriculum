// Helper function to create a full-viewport container below the title.
function createFullViewportContainer(parent, id = 'simulation-container') {
  const container = document.createElement('div');
  if (id) container.id = id;
  
  // Fill entire browser window minus title height.
  container.style.width = '100vw';
  container.style.height = 'calc(100vh - 48px)';
  container.style.margin = '0';
  container.style.padding = '0 0 0 20px'; // 20px left padding.
  
  // Use flexbox for vertical centering and align to left.
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'flex-start';
  
  // IMPORTANT: set position relative so absolutely positioned children are relative.
  container.style.position = 'relative';
  
  container.style.background = '#f4f4f4';
  parent.appendChild(container);
  return container;
}

function initCanvas() {
  const container = createFullViewportContainer(document.body);
  const canvas = document.createElement('canvas');
  canvas.id = 'simulationCanvas';
  
  // Give canvas a subtle shadow (no border).
  canvas.style.boxShadow = '2px 2px 6px rgba(0,0,0,0.2)';
  // Ensure canvas is relatively positioned (zIndex 1) so overlays can be above.
  canvas.style.position = 'relative';
  canvas.style.zIndex = '1';
  
  resizeCanvas(canvas, container);
  container.appendChild(canvas);
  
  window.addEventListener('resize', () => {
    resizeCanvas(canvas, container);
  });
}

function resizeCanvas(canvas, container) {
  canvas.width = container.clientWidth * 0.65;
  canvas.height = container.clientHeight * 0.8;
}

document.addEventListener('DOMContentLoaded', initCanvas);
