import redBeam from './beamRed.js';

document.addEventListener('DOMContentLoaded', () => {
  function drawRedBeam() {
    const canvas = document.getElementById('simulationCanvas');
    if (!canvas) {
      console.error('No simulationCanvas found');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Wait until sun parameters are available.
    if (!window.sunParams) {
      setTimeout(drawRedBeam, 100);
      return;
    }
    
    const sp = window.sunParams;
    const sunCenterX = sp.sunCenterX;
    const sunCenterY = sp.sunCenterY;
    const sunRadius = sp.sunRadius;
    
    // Define the nitrogen molecule's center (as in nitrogen.js)
    const nitrogenCenterX = canvas.width / 2;
    const nitrogenCenterY = canvas.height / 1.5;
    
    // Compute the vector from the sun center to the nitrogen molecule.
    const dx = nitrogenCenterX - sunCenterX;
    const dy = nitrogenCenterY - sunCenterY;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return;
    const ux = dx / length;
    const uy = dy / length;
    
    // Compute the perpendicular vector for offset.
    const perpUx = -uy;
    const perpUy = ux;
    const spacing = redBeam.lineWidth;  // Use lineWidth as spacing.
    const offsetX = perpUx * redBeam.offsetIndex * spacing;
    const offsetY = perpUy * redBeam.offsetIndex * spacing;
    
    // Adjusted starting point: begin at the edge of the sun (with extra -9 offset as updated).
    const startX = sunCenterX + ux * sunRadius + offsetX - 9;
    const startY = sunCenterY + uy * sunRadius + offsetY - 9;
    const endX = nitrogenCenterX + offsetX;
    const endY = nitrogenCenterY + offsetY;
    
    // Draw a red arrow from start to end.
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = redBeam.color;
    ctx.lineWidth = redBeam.lineWidth;
    ctx.stroke();
    
    // Draw arrow head.
    drawArrowHead(ctx, startX, startY, endX, endY, 10, redBeam.color);
  }
  
  function drawArrowHead(ctx, fromX, fromY, toX, toY, radius, color) {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - radius * Math.cos(angle - Math.PI / 6),
               toY - radius * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - radius * Math.cos(angle + Math.PI / 6),
               toY - radius * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }
  
  drawRedBeam();
});
