// scatteredRays.js
document.addEventListener('DOMContentLoaded', () => {
  function drawScatteredRays() {
    const canvas = document.getElementById('scatteredCanvas');
    if (!canvas) {
      console.error('No canvas found with ID "scatteredCanvas"');
      return;
    }
    const ctx = canvas.getContext('2d');
    
    // Clear the scattered rays canvas completely.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Wait until we can draw the molecule. If the molecule isn't defined yet,
    // we can handle that by calling setTimeout or by simply drawing the rays first.
    
    // Use the currently selected color (default to red) and get its thickness.
    const selectedColor = (window.selectedColor || 'red').toLowerCase();
    const key = selectedColor + 'Scattered';
    const thickness = window.scatteredRayIntensities[key];
    
    // If no intensity is defined, do nothing for rays.
    if (!thickness) {
      // But we can still draw the molecule if you want the molecule visible at all times.
      if (window.drawNitrogenOnLayer) window.drawNitrogenOnLayer();
      return;
    }
    
    // Define parameters for scattered rays.
    const rayLength = 100;         // Length of each scattered ray.
    const angleStep = Math.PI / 6; // 30° increments (draw 12 rays for full circle).
    
    ctx.lineWidth = thickness;
    ctx.strokeStyle = selectedColor;
    
    // If the user sets up the molecule first, we can read its parameters from window.nitrogenParams.
    // But if not set yet, let's just skip intersection logic.
    if (!window.nitrogenParams) {
      // We can either wait or just draw the molecule now.
      if (window.drawNitrogenOnLayer) window.drawNitrogenOnLayer();
      return;
    }
    const { centerX, centerY } = window.nitrogenParams;
    
    // We'll just draw rays from the molecule's center outward for demonstration.
    for (let angle = 0; angle < 2 * Math.PI; angle += angleStep) {
      const endX = centerX + rayLength * Math.cos(angle);
      const endY = centerY + rayLength * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
    
    // Finally, draw the nitrogen molecule last, so it's on top of the rays.
    if (window.drawNitrogenOnLayer) {
      window.drawNitrogenOnLayer();
    }
  }
  
  // Expose the function globally.
  window.drawScatteredRays = drawScatteredRays;
  
  // Initial draw.
  setTimeout(drawScatteredRays, 100);
});
