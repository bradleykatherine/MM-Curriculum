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
    
    // Get the scattered ray intensities.
    if (!window.scatteredRayIntensities) {
      console.error('Scattered ray parameters not defined.');
      return;
    }
    
    // Get the currently selected color (default to red).
    const selectedColor = (window.selectedColor || 'red').toLowerCase();
    const key = selectedColor + 'Scattered';
    const thickness = window.scatteredRayIntensities[key];
    
    // If no intensity is defined for this color, nothing to draw.
    if (!thickness) {
      return;
    }
    
    // For demonstration, we draw a single scattered ray.
    // Let's assume a fixed scatter angle offset (e.g., 30°) relative to the incoming beam.
    // In a more complete simulation, you could compute multiple rays with different angles.
    const scatterAngleOffset = Math.PI / 6; // 30 degrees
    
    // To determine the base angle of the incoming beam, we assume it's from the sun to the nitrogen.
    // Get sun parameters (again, from window.sunParams)
    if (!window.sunParams) {
      console.error('Sun parameters not available.');
      return;
    }
    const { sunCenterX, sunCenterY } = window.sunParams;
    
    // Compute the base angle from the sun to the nitrogen interaction point.
    const dx = interactionPoint.x - sunCenterX;
    const dy = interactionPoint.y - sunCenterY;
    const baseAngle = Math.atan2(dy, dx);
    
    // The scattered ray angle will be offset from the base angle.
    const scatterAngle = baseAngle + scatterAngleOffset;
    
    // Define a ray length for the scattered ray (this could be wavelength-dependent).
    const rayLength = 100;
    
    // Compute end coordinates.
    const endX = interactionPoint.x + rayLength * Math.cos(scatterAngle);
    const endY = interactionPoint.y + rayLength * Math.sin(scatterAngle);
    
    // Draw the scattered ray.
    ctx.lineWidth = thickness;
    ctx.strokeStyle = selectedColor;
    ctx.beginPath();
    ctx.moveTo(interactionPoint.x, interactionPoint.y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
  
  // Expose the draw function globally.
  window.drawScatteredRays = drawScatteredRays;
  
  // Initial draw.
  setTimeout(drawScatteredRays, 100);
});
