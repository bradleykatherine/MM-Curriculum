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
    const scale = 0.2; // Display sun at 20% of original size
    const scaledSunWidth = sunImage.width * scale;
    const scaledSunHeight = sunImage.height * scale;
    const x = 10;
    const y = 10;
    ctx.drawImage(sunImage, x, y, scaledSunWidth, scaledSunHeight);
    
    // Store sun parameters for use by drawRedBeam.js
    window.sunParams = {
      sunX: x,
      sunY: y,
      sunCenterX: x + scaledSunWidth / 2,
      sunCenterY: y + scaledSunHeight / 2,
      sunRadius: scaledSunWidth / 2,  // Assuming a circular sun.
      sunScale: scale,
      scaledSunWidth: scaledSunWidth,
      scaledSunHeight: scaledSunHeight
    };
  };
});
