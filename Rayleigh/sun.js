// sun.js: Loads and draws a Sun image in the upper-left corner of the canvas at a smaller size

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas) {
    console.error('No canvas found with ID "simulationCanvas"');
    return;
  }

  const ctx = canvas.getContext('2d');
  const sunImage = new Image();

  // Path to the Sun image
  sunImage.src = 'sunround.en.png';

  sunImage.onload = () => {
    // Define a scale factor (e.g., 0.2 to display the sun at 20% of its original size)
    const scale = 0.2;
    
    // Calculate the scaled dimensions of the sun image
    const scaledWidth = sunImage.width * scale;
    const scaledHeight = sunImage.height * scale;

    // Position the image in the upper-left corner (with a little padding if desired)
    const x = 10; // 10 pixels from the left edge
    const y = 10; // 10 pixels from the top edge

    // Draw the sun image at the scaled size
    ctx.drawImage(sunImage, x, y, scaledWidth, scaledHeight);
  };
});
