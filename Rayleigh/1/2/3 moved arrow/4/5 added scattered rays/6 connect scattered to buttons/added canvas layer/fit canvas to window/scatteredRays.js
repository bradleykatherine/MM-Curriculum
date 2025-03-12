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
    
    // Wait until nitrogen parameters are available.
    if (!window.nitrogenParams) {
      setTimeout(drawScatteredRays, 100);
      return;
    }
    
    // Get nitrogen parameters.
    const { centerX, centerY } = window.nitrogenParams;
    
    // Use the nitrogen center as the scattering origin.
    const interactionPoint = { x: centerX, y: centerY };
    
    // Use the currently selected color (default to red) and get its thickness.
    const selectedColor = (window.selectedColor || 'red').toLowerCase();
    const key = selectedColor + 'Scattered';
    const thickness = window.scatteredRayIntensities[key];
    
    // If no intensity is defined, do nothing.
    if (!thickness) {
      return;
    }
    
    // Define parameters for scattered rays.
    const rayLength = 100;         // Length of each scattered ray.
    const angleStep = Math.PI / 6;   // 30° increments (draw 12 rays for full circle).
    
    ctx.lineWidth = thickness;
    ctx.strokeStyle = selectedColor;
    
    // Draw rays in all directions.
    for (let angle = 0; angle < 2 * Math.PI; angle += angleStep) {
      const endX = interactionPoint.x + rayLength * Math.cos(angle);
      const endY = interactionPoint.y + rayLength * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(interactionPoint.x, interactionPoint.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  }
  
  // Expose the function globally.
  window.drawScatteredRays = drawScatteredRays;
  
  // Initial draw.
  setTimeout(drawScatteredRays, 100);
});
