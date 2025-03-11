// lightBeams.js: Draws 6 parallel beams of light from the edge of the Sun to the Nitrogen molecule
// on an overlay canvas, using sun parameters stored in window.sunParams.
document.addEventListener('DOMContentLoaded', () => {
  
  function drawBeams() {
    const simCanvas = document.getElementById('simulationCanvas');
    if (!simCanvas) {
      console.error('No canvas found with ID "simulationCanvas"');
      return;
    }
    
    // Wait until sun parameters are available.
    if (!window.sunParams) {
      setTimeout(drawBeams, 100);
      return;
    }
    
    const sp = window.sunParams;
    
    // Create or retrieve an overlay canvas for the beams.
    let beamsCanvas = document.getElementById('beamsCanvas');
    if (!beamsCanvas) {
      beamsCanvas = document.createElement('canvas');
      beamsCanvas.id = 'beamsCanvas';
      beamsCanvas.style.position = 'absolute';
      beamsCanvas.style.left = simCanvas.offsetLeft + 'px';
      beamsCanvas.style.top = simCanvas.offsetTop + 'px';
      simCanvas.parentNode.appendChild(beamsCanvas);
    }
    beamsCanvas.width = simCanvas.width;
    beamsCanvas.height = simCanvas.height;
    
    const ctx = beamsCanvas.getContext('2d');
    ctx.clearRect(0, 0, beamsCanvas.width, beamsCanvas.height);
    
    // Use stored sun parameters.
    const sunCenterX = sp.sunCenterX;
    const sunCenterY = sp.sunCenterY;
    const sunRadius = sp.sunRadius;
    
    // Nitrogen molecule center as defined in nitrogen.js.
    const nitrogenCenterX = simCanvas.width / 2;
    const nitrogenCenterY = simCanvas.height / 1.5;
    
    // Compute vector from sun center to nitrogen molecule.
    const dx = nitrogenCenterX - sunCenterX;
    const dy = nitrogenCenterY - sunCenterY;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return;
    const ux = dx / length;
    const uy = dy / length;
    
    // Perpendicular unit vector for beam offset.
    const perpUx = -uy;
    const perpUy = ux;
    
    const numBeams = 6;
    const beamWidth = 3;
    ctx.lineWidth = beamWidth;
    const spacing = beamWidth;
    const beamColors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
    
    // Draw each beam only if its toggle is enabled.
    for (let i = 0; i < numBeams; i++) {
      const color = beamColors[i];
      if (window.beamToggles && !window.beamToggles[color]) {
        continue;
      }
      
      // Offsets: -2.5, -1.5, -0.5, 0.5, 1.5, 2.5 times the spacing.
      const offsetIndex = i - (numBeams - 1) / 2;
      const offsetX = perpUx * offsetIndex * spacing;
      const offsetY = perpUy * offsetIndex * spacing;
      
      // Start beams at the edge of the sun (instead of the center).
      const startX = sunCenterX + ux * sunRadius + offsetX-9;
      const startY = sunCenterY + uy * sunRadius + offsetY-9;
      
      // End point at the nitrogen molecule (with the same offset).
      const endX = nitrogenCenterX + offsetX;
      const endY = nitrogenCenterY + offsetY;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  }
  
  // Expose the draw function globally so that toggles can trigger a refresh.
  window.refreshBeams = drawBeams;
  
  // Initial draw after a short delay to ensure sun parameters are set.
  setTimeout(drawBeams, 100);
});

