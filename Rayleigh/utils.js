// Helper function to create a full-viewport container that fills the space below the title
function createFullViewportContainer(parent, id = 'simulation-container') {
  const container = document.createElement('div');
  if (id) container.id = id;

  // Assume the title's total height is ~48px (28px font-size + 10px top & bottom padding)
  // Subtract that from 100vh so the container starts immediately below the title.
  container.style.width = '100vw';
  container.style.height = 'calc(100vh - 48px)';
  container.style.margin = '0';
  container.style.padding = '0';

  // Use flexbox to center its contents both horizontally and vertically
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';

  // Background matching the rest of the simulation
  container.style.background = '#f4f4f4';

  // Append the container to the page
  parent.appendChild(container);
  return container;
}

function initCanvas() {
  // Create a full-viewport container (below the title)
  const container = createFullViewportContainer(document.body);

  // Create the canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'simulationCanvas';
  canvas.style.border = '1px solid black';

  // Set the canvas size to a fraction of the container dimensions
  resizeCanvas(canvas, container);

  // Append the canvas to the centered container
  container.appendChild(canvas);

  // Listen for browser window resize events and update canvas size
  window.addEventListener('resize', () => {
    resizeCanvas(canvas, container);
  });
}

// Dynamically resize the canvas to a fraction of the container’s dimensions
function resizeCanvas(canvas, container) {
  // For example, 80% of container width, 80% of container height
  canvas.width = container.clientWidth * 0.8;
  canvas.height = container.clientHeight * 0.8;
}

// Initialize canvas when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initCanvas);
