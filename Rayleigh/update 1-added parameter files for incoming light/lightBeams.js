// lightBeams.js: Draws 6 parallel beams from the edge of the Sun to the Nitrogen molecule
// using beam parameters imported from individual files.
import redBeam from './beamRed.js';
import orangeBeam from './beamOrange.js';
import yellowBeam from './beamYellow.js';
import greenBeam from './beamGreen.js';
import blueBeam from './beamBlue.js';
import violetBeam from './beamViolet.js';

const beams = [redBeam, orangeBeam, yellowBeam, greenBeam, blueBeam, violetBeam];

document.addEventListener('DOMContentLoaded', () => {
  function drawBeams() {
    const simCanvas = document.getElementById('simulationCanvas');
    if (!simCanvas) { console.error('No canvas found with ID "simulationCanvas"'); return; }
    
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
    const perpUx = -uy;
    const perpUy = ux;
    
    // Create or get overlay canvas for beams.
    let beamsCanvas = document.getElementById('beamsCanvas');
    if (!beamsCanvas) {
      beamsCanvas = document.createElement('canvas');
      beamsCanvas.id = 'beamsCanvas';
      beamsCanvas.style.position = 'absolute';
      beamsCanvas.style.left = simCanvas.offsetLeft + 'px';
      beamsCanvas.style.top = simCanvas.offsetTop + 'px';
      // *** Set a z-index so the overlay appears on top ***
      beamsCanvas.style.zIndex = '10';
      simCanvas.parentNode.appendChild(beamsCanvas);
    }
    beamsCanvas.width = simCanvas.width;
    beamsCanvas.height = simCanvas.height;
    
    const ctx = beamsCanvas.getContext('2d');
    ctx.clearRect(0, 0, beamsCanvas.width, beamsCanvas.height);
    
    const spacing = beams[0].lineWidth; // assuming all beams share the same lineWidth
    beams.forEach(beam => {
      if (window.beamToggles && !window.beamToggles[beam.color]) return;
      
      const offsetX = perpUx * beam.offsetIndex * spacing;
      const offsetY = perpUy * beam.offsetIndex * spacing;
      
      // Adjusted starting point: begin at the edge of the sun (with extra -9 offset as updated).
      const startX = sunCenterX + ux * sunRadius + offsetX - 9;
      const startY = sunCenterY + uy * sunRadius + offsetY - 9;
      const endX = nitrogenCenterX + offsetX;
      const endY = nitrogenCenterY + offsetY;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = beam.color;
      ctx.lineWidth = beam.lineWidth;
      ctx.stroke();
    });
  }
  
  window.refreshBeams = drawBeams;
  setTimeout(drawBeams, 100);
});
