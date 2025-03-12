document.addEventListener('DOMContentLoaded', () => {
  function drawScatteredRays() {
    const canvas = document.getElementById('scatteredCanvas');
    if (!canvas) {
      console.error('No canvas found with ID "scatteredCanvas"');
      return;
    }
    const ctx = canvas.getContext('2d');
    
    // Clear the scattered rays canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Wait until nitrogen parameters are available.
    if (!window.nitrogenParams) {
      setTimeout(drawScatteredRays, 100);
      return;
    }
    
    const { centerX, centerY, r, leftCenter, rightCenter } = window.nitrogenParams;
    // We'll use the overall molecule center for our ray calculations.
    const S = { x: centerX, y: centerY };
    
    // Use the currently selected color (default to red) and get its thickness.
    const selectedColor = (window.selectedColor || 'red').toLowerCase();
    const key = selectedColor + 'Scattered';
    const thickness = window.scatteredRayIntensities[key];
    if (!thickness) return;
    
    // Define parameters for scattered rays.
    const rayLength = 100;         // Length of each scattered ray.
    const angleStep = Math.PI / 6;   // 30° increments (12 rays around a full circle).
    
    ctx.lineWidth = thickness;
    ctx.strokeStyle = selectedColor;
    
    // Helper: compute intersection t for a ray and a circle.
    function intersectRayCircle(S, D, C, r) {
      const Fx = S.x - C.x;
      const Fy = S.y - C.y;
      // Since D is a unit vector, a = 1.
      const b = 2 * (D.x * Fx + D.y * Fy);
      const c = Fx * Fx + Fy * Fy - r * r;
      const disc = b * b - 4 * c;
      if (disc < 0) return null; // no intersection
      const sqrtDisc = Math.sqrt(disc);
      const t1 = (-b - sqrtDisc) / 2;
      const t2 = (-b + sqrtDisc) / 2;
      let t = null;
      if (t1 > 0 && t2 > 0) t = Math.min(t1, t2);
      else if (t1 > 0) t = t1;
      else if (t2 > 0) t = t2;
      return t;
    }
    
    // For each scattered ray, compute its starting point on the molecule's edge.
    for (let angle = 0; angle < 2 * Math.PI; angle += angleStep) {
      const D = { x: Math.cos(angle), y: Math.sin(angle) };
      const tLeft = intersectRayCircle(S, D, leftCenter, r);
      const tRight = intersectRayCircle(S, D, rightCenter, r);
      
      let tFinal = null;
      if (tLeft !== null && tRight !== null) {
        tFinal = Math.min(tLeft, tRight);
      } else if (tLeft !== null) {
        tFinal = tLeft;
      } else if (tRight !== null) {
        tFinal = tRight;
      }
      
      if (tFinal === null) {
        // No intersection found for this ray direction; skip.
        continue;
      }
      
      // Compute the starting point on the molecule's edge.
      const startX = S.x + tFinal * D.x;
      const startY = S.y + tFinal * D.y;
      
      // Compute the end point for the scattered ray.
      const endX = startX + rayLength * D.x;
      const endY = startY + rayLength * D.y;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  }
  
  // Expose the draw function globally.
  window.drawScatteredRays = drawScatteredRays;
  
  // Initial draw.
  setTimeout(drawScatteredRays, 100);
});
