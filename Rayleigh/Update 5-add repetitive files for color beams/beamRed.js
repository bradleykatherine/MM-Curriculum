document.addEventListener('DOMContentLoaded', () => {
  function drawRedBeam() {
    const simCanvas = document.getElementById('simulationCanvas');
    if (!simCanvas) {
      console.error("No simulationCanvas found");
      return;
    }
    if (!window.sunParams) {
      setTimeout(drawRedBeam, 100);
      return;
    }
    const sp = window.sunParams;
    const sunCenterX = sp.sunCenterX;
    const sunCenterY = sp.sunCenterY;
    const sunRadius = sp.sunRadius;
    
    // Define nitrogen molecule center as in nitrogen.js.
    const nitrogenCenterX = simCanvas.width / 2;
    const nitrogenCenterY = simCanvas.height / 1.5;
    
    // Compute vector from sun center to nitrogen center.
    const dx = nitrogenCenterX - sunCenterX;
    const dy = nitrogenCenterY - sunCenterY;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return;
    const ux = dx / length;
    const uy = dy / length;
    
    // Perpendicular unit vector for beam offset.
    const perpUx = -uy;
    const perpUy = ux;
    
    // For red beam, offsetIndex = -2.5.
    const offsetIndex = -2.5;
    const spacing = 3; // use lineWidth as spacing.
    const offsetX = perpUx * offsetIndex * spacing;
    const offsetY = perpUy * offsetIndex * spacing;
    
    // Compute starting point at the edge of the sun with adjustment.
    const startX = sunCenterX + ux * sunRadius + offsetX - 9;
    const startY = sunCenterY + uy * sunRadius + offsetY - 9;
    
    // End point at the nitrogen molecule center plus offset.
    const endX = nitrogenCenterX + offsetX;
    const endY = nitrogenCenterY + offsetY;
    
    const ctx = simCanvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  drawRedBeam();
});
