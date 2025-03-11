// sun.js: Loads and draws a Sun image in the upper-left corner of the canvas,
// and stores its parameters for use by other modules.
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas) {
    console.error('No canvas found with ID "simulationCanvas"');
    return;
  }
  const ctx = canvas.getContext('2d');
  const sunImage = new Image();
  sunImage.src = 'sunround.en.png';
  
  sunImage.onload = () => {
    const scale = 0.2; // Display sun at 20% of its original size.
    const scaledSunWidth = sunImage.width * scale;
    const scaledSunHeight = sunImage.height * scale;
    
    // Position the sun in the upper-left corner with a 10px padding.
    const x = 10;
    const y = 10;
    ctx.drawImage(sunImage, x, y, scaledSunWidth, scaledSunHeight);
    
    // Store sun parameters globally for reuse.
    window.sunParams = {
      sunX: x,
      sunY: y,
      sunCenterX: x + scaledSunWidth / 2,
      sunCenterY: y + scaledSunHeight / 2,
      sunRadius: scaledSunWidth / 2,  // Assuming the sun is circular.
      sunScale: scale,
      scaledSunWidth: scaledSunWidth,
      scaledSunHeight: scaledSunHeight
    };
  };
});
