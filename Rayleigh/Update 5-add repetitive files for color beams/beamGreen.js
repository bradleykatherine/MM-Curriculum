document.addEventListener('DOMContentLoaded', () => {
  function drawGreenBeam() {
    const simCanvas = document.getElementById('simulationCanvas');
    if (!simCanvas) {
      console.error("No simulationCanvas found");
      return;
    }
    if (!window.sunParams) {
      setTimeout(drawGreenBeam, 100);
      return;
    }
    const sp = window.sunParams;
    const sunCenterX = sp.sunCenterX;
    const sunCenterY = sp.sunCenterY;
    const sunRadius = sp.sunRadius;
    
    const nitrogenCenterX = simCanvas.width / 2;
    const nitrogenCenterY = simCanvas.height / 1.5;
    
    const dx = nitrogenCenterX - sunCenterX;
    const dy = nitrogenCenterY - sunCenterY;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return;
    const ux = dx / length;
    const uy = dy / length;
    const perpUx = -uy;
    const perpUy = ux;
    
    // For green beam, offsetIndex = 0.5.
    const offsetIndex = 0.5;
    const spacing = 3;
    const offsetX = perpUx * offsetIndex * spacing;
    const offsetY = perpUy * offsetIndex * spacing;
    
    const startX = sunCenterX + ux * sunRadius + offsetX - 9;
    const startY = sunCenterY + uy * sunRadius + offsetY - 9;
    const endX = nitrogenCenterX + offsetX;
    const endY = nitrogenCenterY + offsetY;
    
    const ctx = simCanvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  drawGreenBeam();
});
