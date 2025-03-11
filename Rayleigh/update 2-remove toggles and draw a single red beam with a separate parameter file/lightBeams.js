// lightBeams.js: Draws the red beam (only) onto an overlay canvas.
import { drawRedBeam } from './beamRed.js';

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
    const sunCenterX = sp.sunCenterX;
    const sunCenterY = sp.sunCenterY;
    const sunRadius = sp.sunRadius;
    
    const nitrogenCenterX = simCanvas.width / 2;
    const nitrogenCenterY = simCanvas.height / 1.5;
    
    // Calculate vector from sun center to nitrogen molecule.
    const dx = nitrogenCenterX - sunCenterX;
    const dy = nitrogenCenterY - sunCenterY;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return;
    const ux = dx / length;
    const uy = dy / length;
    // Perpendicular unit vector (for offsetting if needed)
    const perpUx = -uy;
    const perpUy = ux;
    
    // Create or retrieve an overlay canvas for beams.
    let beamsCanvas = document.getElementById('beamsCanvas');
    if (!beamsCanvas) {
      beamsCanvas = document.createElement('canvas');
      beamsCanvas.id = 'beamsCanvas';
      beamsCanvas.style.position = 'absolute';
      beamsCanvas.style.left = simCanvas.offsetLeft + 'px';
      beamsCanvas.style.top = simCanvas.offsetTop + 'px';
      // Ensure the overlay appears on top.
      beamsCanvas.style.zIndex = '10';
      simCanvas.parentNode.appendChild(beamsCanvas);
    }
    beamsCanvas.width = simCanvas.width;
    beamsCanvas.height = simCanvas.height;
    
    const ctx = beamsCanvas.getContext('2d');
    ctx.clearRect(0, 0, beamsCanvas.width, beamsCanvas.height);
    
    // Draw the red beam.
    drawRedBeam(ctx, sunCenterX, sunCenterY, sunRadius, nitrogenCenterX, nitrogenCenterY, perpUx, perpUy);
  }
  
  window.refreshBeams = drawBeams;
  setTimeout(drawBeams, 100);
});
