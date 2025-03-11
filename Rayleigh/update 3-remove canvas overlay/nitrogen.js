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
    const scale = 0.1;
    const scaledWidth = moleculeImage.width * scale;
    const scaledHeight = moleculeImage.height * scale;
    const x = (canvas.width - scaledWidth) / 2;
    const y = (canvas.height - scaledHeight) / 1.4;
    ctx.drawImage(moleculeImage, x, y, scaledWidth, scaledHeight);
  };
});
