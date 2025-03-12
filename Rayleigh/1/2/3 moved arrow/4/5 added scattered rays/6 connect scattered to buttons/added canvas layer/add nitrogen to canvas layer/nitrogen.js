// nitrogen.js

// We'll define a function that draws the nitrogen molecule onto scatteredCanvas.
function drawNitrogenOnLayer() {
  const canvas = document.getElementById('scatteredCanvas');
  if (!canvas) {
    console.error('No canvas found with ID "scatteredCanvas"');
    return;
  }
  const ctx = canvas.getContext('2d');

  // Clear any old nitrogen drawing, if desired.
  // (You might choose not to clear the entire canvas because you want to keep the scattered rays.)
  // Instead, you can simply redraw the molecule each time after the rays are drawn.

  // Scale for the nitrogen molecule
  const scale = window.nitrogenScale || 0.2;
  const baseRadius = 30; // Base radius
  const r = baseRadius * scale; // Scaled radius

  // Choose a position for the nitrogen molecule. We'll store these in window.nitrogenParams.
  const centerX = canvas.width / 1.95;
  const centerY = canvas.height / 1.45;

  // Draw left circle (first nitrogen atom)
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(centerX - 0.6 * r, centerY, r, 0, Math.PI * 2);
  ctx.fill();

  // Draw right circle (second nitrogen atom)
  ctx.beginPath();
  ctx.arc(centerX + 0.6 * r, centerY, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';

  // Draw complete border for the left circle.
  ctx.beginPath();
  ctx.arc(centerX - 0.6 * r, centerY, r, 0, Math.PI * 2);
  ctx.stroke();

  // Draw partial border for the right circle (only non-overlapping portion).
  const startAngle = -Math.acos(-0.6);
  const endAngle = Math.acos(-0.6);
  ctx.beginPath();
  ctx.arc(centerX + 0.6 * r, centerY, r, startAngle, endAngle);
  ctx.stroke();

  // Store the nitrogen molecule parameters for use by other modules.
  window.nitrogenParams = {
    centerX,
    centerY,
    r,
    leftCenter: { x: centerX - 0.6 * r, y: centerY },
    rightCenter: { x: centerX + 0.6 * r, y: centerY }
  };
}

// Expose the function globally so other scripts can call it.
window.drawNitrogenOnLayer = drawNitrogenOnLayer;
