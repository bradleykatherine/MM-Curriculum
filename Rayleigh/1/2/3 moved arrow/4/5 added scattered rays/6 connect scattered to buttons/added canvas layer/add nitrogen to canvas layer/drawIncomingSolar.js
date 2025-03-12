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
    
    // Get sun parameters.
    const { sunCenterX, sunCenterY, sunRadius } = window.sunParams;
    
    // Get nitrogen parameters (from nitrogen.js).
    if (!window.nitrogenParams) {
      console.error('Nitrogen parameters not found.');
      return;
    }
    const { centerX: nitrogenCenterX, centerY: nitrogenCenterY, r } = window.nitrogenParams;
    
    // Starting point: at the edge of the sun (with a slight offset).
    const offsetX = 5; // adjust as needed
    const offsetY = 5; // adjust as needed
    
    // Compute unit vector from sun center toward nitrogen center.
    let dx = nitrogenCenterX - sunCenterX;
    let dy = nitrogenCenterY - sunCenterY;
    let L = Math.sqrt(dx * dx + dy * dy);
    if (L === 0) return;
    const ux = dx / L;
    const uy = dy / L;
    const startX = sunCenterX + ux * sunRadius - offsetX;
    const startY = sunCenterY + uy * sunRadius - offsetY;
    
    // Define the ray from the sun’s edge.
    const S = { x: startX, y: startY };
    dx = nitrogenCenterX - startX;
    dy = nitrogenCenterY - startY;
    L = Math.sqrt(dx * dx + dy * dy);
    if (L === 0) return;
    const D = { x: dx / L, y: dy / L };
    
    // The nitrogen molecule is drawn as two overlapping circles.
    // Their centers:
    const leftCenter = { x: nitrogenCenterX - 0.6 * r, y: nitrogenCenterY };
    const rightCenter = { x: nitrogenCenterX + 0.6 * r, y: nitrogenCenterY };
    
    // Helper: compute intersection parameter t for a ray and circle.
    function intersectRayCircle(S, D, C, r) {
      const Fx = S.x - C.x;
      const Fy = S.y - C.y;
      const b = 2 * (D.x * Fx + D.y * Fy);
      const c = Fx * Fx + Fy * Fy - r * r;
      const disc = b * b - 4 * c;
      if (disc < 0) return null; // No intersection.
      const sqrtDisc = Math.sqrt(disc);
      const t1 = (-b - sqrtDisc) / 2;
      const t2 = (-b + sqrtDisc) / 2;
      let t = null;
      if (t1 > 0 && t2 > 0) t = Math.min(t1, t2);
      else if (t1 > 0) t = t1;
      else if (t2 > 0) t = t2;
      return t;
    }
    
    // Compute intersections with both circles.
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
    
    // If no intersection is found, default to the nitrogen center.
    if (tFinal === null) {
      tFinal = L;
    }
    
    // Calculate beam endpoint.
    const endX = S.x + tFinal * D.x;
    const endY = S.y + tFinal * D.y;
    
    // Draw the beam.
    const color = window.selectedColor || 'red';
    ctx.lineWidth = 15;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(S.x, S.y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // Optionally, draw an arrow head.
    // drawArrowHead(ctx, S.x, S.y, endX, endY, 10, color);
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
