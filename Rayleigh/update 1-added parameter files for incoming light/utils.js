// Helper function to create a full-viewport container that fills the space below the title
function createFullViewportContainer(parent, id = 'simulation-container') {
  const container = document.createElement('div');
  if (id) container.id = id;

  // Fill the entire browser window (minus the title height)
  container.style.width = '100vw';
  container.style.height = 'calc(100vh - 48px)';
  container.style.margin = '0';
  container.style.padding = '0 0 0 20px'; // 20px left padding to space it from the edge

  // Use flexbox to vertically center the canvas and align it to the left horizontally
  container.style.display = 'flex';
  container.style.alignItems = 'center';      // vertical centering
  container.style.justifyContent = 'flex-start';// align contents to the left
  
  // *** IMPORTANT: Make the container relatively positioned ***
  container.style.position = 'relative';

  // Background matching the rest of the simulation
  container.style.background = '#f4f4f4';

  parent.appendChild(container);
  return container;
}

function initCanvas() {
  // Create a full-viewport container (below the title)
  const container = createFullViewportContainer(document.body);

  // Create the canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'simulationCanvas';
  
  // Remove the black border and add a shadow identical to the toggles.
  canvas.style.boxShadow = '2px 2px 6px rgba(0,0,0,0.2)';

  // Set the canvas size to a fraction of the container dimensions
  resizeCanvas(canvas, container);

  // Append the canvas to the container (aligned to the left)
  container.appendChild(canvas);

  // Listen for browser window resize events and update canvas size
  window.addEventListener('resize', () => {
    resizeCanvas(canvas, container);
  });
}

// Dynamically resize the canvas to a fraction of the container’s dimensions
function resizeCanvas(canvas, container) {
  // For example, 65% of container width, 80% of container height
  canvas.width = container.clientWidth * 0.65;
  canvas.height = container.clientHeight * 0.8;
}

// Initialize canvas when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initCanvas);
