document.addEventListener('DOMContentLoaded', () => {
  function drawScatteredRays() {
    const canvas = document.getElementById('simulationCanvas');
    if (!canvas) {
      console.error('No canvas found with ID "simulationCanvas"');
      return;
    }
    const ctx = canvas.getContext('2d');
    
    // Wait until nitrogen parameters are available.
    if (!window.nitrogenParams) {
      setTimeout(drawScatteredRays, 100);
      return;
    }
    
    // Get nitrogen parameters.
    const { centerX, centerY } = window.nitrogenParams;
    
    // Use the nitrogen center as the scattering origin.
    const interactionPoint = { x: centerX, y: centerY };
    
    // Use the currently selected color (default to red) and obtain its corresponding thickness.
    const selectedColor = (window.selectedColor || 'red').toLowerCase();
    const key = selectedColor + 'Scattered';
    const thickness = window.scatteredRayIntensities[key];
    
    // If no intensity (thickness) is defined for this color, do not draw anything.
    if (!thickness) {
      return;
    }
    
    // Define parameters for scattered rays.
    const rayLength = 100;           // Length of each scattered ray.
    const angleStep = Math.PI / 6;     // 30° increments (draw 12 rays around the full circle).
    
    // Set the stroke style and thickness based on the selected color's parameters.
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
  
  // Expose the draw function globally.
  window.drawScatteredRays = drawScatteredRays;
  
  // Initial draw.
  setTimeout(drawScatteredRays, 100);
});
