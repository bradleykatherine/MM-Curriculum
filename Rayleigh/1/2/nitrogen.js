document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas) {
    console.error('No canvas found with ID "simulationCanvas"');
    return;
  }
  
  const ctx = canvas.getContext('2d');
  const radius = 30; // Adjust as needed
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 1.4;
  
  // Draw left circle (first nitrogen atom)
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(centerX - radius * 0.6, centerY, radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw right circle (second nitrogen atom)
  ctx.beginPath();
  ctx.arc(centerX + radius * 0.6, centerY, radius, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  
  // Re-draw complete border for the left circle to ensure it is fully visible.
  ctx.beginPath();
  ctx.arc(centerX - radius * 0.6, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  // Draw partial border for the right circle:
  // Stroke only the portion that is on the non-overlapping side.
  const startAngle = -Math.acos(-0.6);
  const endAngle = Math.acos(-0.6);
  ctx.beginPath();
  ctx.arc(centerX + radius * 0.6, centerY, radius, startAngle, endAngle);
  ctx.stroke();
});
