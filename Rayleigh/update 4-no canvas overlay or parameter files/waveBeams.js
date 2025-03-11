// waveBeams.js: Draws wave beams for each color directly onto the simulation canvas.
import redBeam from './beamRed.js';
import orangeBeam from './beamOrange.js';
import yellowBeam from './beamYellow.js';
import greenBeam from './beamGreen.js';
import blueBeam from './beamBlue.js';
import violetBeam from './beamViolet.js';

const beams = [redBeam, orangeBeam, yellowBeam, greenBeam, blueBeam, violetBeam];

document.addEventListener('DOMContentLoaded', () => {
  function drawWaveBeams() {
    const canvas = document.getElementById('simulationCanvas');
    if (!canvas) {
      console.error('No simulationCanvas found');
      return;
    }
    const ctx = canvas.getContext('2d');
    // Clear previous drawings (if any)
    // Note: If other drawings (e.g., sun, nitrogen) are present, ensure you draw waves after them.
    // For this example, we assume waves are drawn on top.
    
    // Wait until sun parameters are available.
    if (!window.sunParams) {
      setTimeout(drawWaveBeams, 100);
      return;
    }
    const sp = window.sunParams;
    const sunCenterX = sp.sunCenterX;
    const sunCenterY = sp.sunCenterY;
    const sunRadius = sp.sunRadius;
    
    // Nitrogen molecule center (as in nitrogen.js)
    const nitrogenCenterX = canvas.width / 2;
    const nitrogenCenterY = canvas.height / 1.5;
    
    // Compute vector from sun center to nitrogen center.
    const dx = nitrogenCenterX - sunCenterX;
    const dy = nitrogenCenterY - sunCenterY;
    const L = Math.sqrt(dx * dx + dy * dy);
    if (L === 0) return;
    const ux = dx / L;
    const uy = dy / L;
    // Perpendicular vector.
    const perpUx = -uy;
    const perpUy = ux;
    
    // For each beam, draw a sine wave from the edge of the sun to the nitrogen molecule.
    beams.forEach(beam => {
      // Use the beam's lineWidth as spacing.
      const spacing = beam.lineWidth;
      // Compute base offset (shifts beam vertically/horizontally)
      const baseOffsetX = perpUx * beam.offsetIndex * spacing;
      const baseOffsetY = perpUy * beam.offsetIndex * spacing;
      
      // Calculate the number of cycles along the beam.
      // We'll map the wavelength to cycles such that a red beam (700 nm) gets 3 cycles.
      const cycles = (700 / beam.wavelength) * 3;
      
      // Draw the wave:
      const steps = 100;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        // Linear interpolation from sun edge (starting point) to nitrogen.
        const baseX = sunCenterX + ux * sunRadius + (nitrogenCenterX - sunCenterX - ux * sunRadius) * t + baseOffsetX;
        const baseY = sunCenterY + uy * sunRadius + (nitrogenCenterY - sunCenterY - uy * sunRadius) * t + baseOffsetY;
        // Sine offset in the perpendicular direction.
        const sineOffset = beam.amplitude * Math.sin(2 * Math.PI * cycles * t);
        const x = baseX + perpUx * sineOffset;
        const y = baseY + perpUy * sineOffset;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = beam.color;
      ctx.lineWidth = beam.lineWidth;
      ctx.stroke();
    });
  }
  
  drawWaveBeams();
});
