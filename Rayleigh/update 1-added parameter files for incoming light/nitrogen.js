// nitrogen.js

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas) {
    console.error('No canvas found with ID "simulationCanvas"');
    return;
  }

  const ctx = canvas.getContext('2d');
  const moleculeImage = new Image();
  moleculeImage.src = '1047px-Dinitrogen-3D-balls.png';

  moleculeImage.onload = () => {
    // Scale factor to reduce the image size
    const scale = 0.1;
    const scaledWidth = moleculeImage.width * scale;
    const scaledHeight = moleculeImage.height * scale;

    // Calculate coordinates so the molecule is centered
    const x = (canvas.width - scaledWidth) / 2;
    const y = (canvas.height - scaledHeight) / 1.4;

    // Remove or comment out this line so it doesn't erase the sun:
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the scaled image
    ctx.drawImage(moleculeImage, x, y, scaledWidth, scaledHeight);
  };
});
