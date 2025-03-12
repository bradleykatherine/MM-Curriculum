document.addEventListener('DOMContentLoaded', () => {
  function drawIncomingBeam() {
    const canvas = document.getElementById('simulationCanvas');
    if (!canvas) {
      console.error('No canvas found with ID "simulationCanvas"');
      return;
    }
    const ctx = canvas.getContext('2d');
    
    // Wait until sun parameters are available.
    if (!window.sunParams) {
      setTimeout(drawIncomingBeam, 100);
      return;
    }
    const sp = window.sunParams;
    const sunCenterX = sp.sunCenterX;
    const sunCenterY = sp.sunCenterY;
    const sunRadius = sp.sunRadius;
    
    // Define nitrogen molecule's center (using same approach as before).
    const nitrogenCenterX = canvas.width / 2;
    const nitrogenCenterY = canvas.height / 1.5;
    
    // Compute direction vector from sun center to nitrogen center.
    const dx = nitrogenCenterX - sunCenterX;
    const dy = nitrogenCenterY - sunCenterY;
    const L = Math.sqrt(dx * dx + dy * dy);
    if (L === 0) return;
    const ux = dx / L;
    const uy = dy / L;
    
    // Use the selected color; default to red if not set.
    const color = window.selectedColor || 'red';
    // Beam thickness (which could represent intensity) is set here.
    const lineWidth = 5;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    
    // Starting point: at the edge of the sun (we use the stored sun parameters).
    const startX = sunCenterX + ux * sunRadius;
    const startY = sunCenterY + uy * sunRadius;
    
    // End point: For simplicity, we let the beam end at the nitrogen molecule's center.
    // (You can adjust this if you want the beam to end at a specific point on the molecule.)
    const endX = nitrogenCenterX;
    const endY = nitrogenCenterY;
    
    // Clear any previous beam drawing on the canvas (if needed).
    // Here, we assume the beam is drawn after the other images, so we do not clear the entire canvas.
    // Instead, you might choose to redraw the entire scene if necessary.
    
    // Draw the beam (a simple line or arrow)
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // Optionally, draw an arrow head.
    drawArrowHead(ctx, startX, startY, endX, endY, 10, color);
  }
  
  function drawArrowHead(ctx, fromX, fromY, toX, toY, size, color) {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - size * Math.cos(angle - Math.PI / 6),
               toY - size * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - size * Math.cos(angle + Math.PI / 6),
               toY - size * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }
  
  // Expose the draw function globally so the color selector can trigger a redraw.
  window.refreshIncomingBeam = drawIncomingBeam;
  
  // Initial draw.
  setTimeout(drawIncomingBeam, 100);
});
