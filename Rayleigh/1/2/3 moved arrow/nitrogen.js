document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas) {
    console.error('No canvas found with ID "simulationCanvas"');
    return;
  }
  
  // Allow adjustment of the nitrogen drawing scale.
  const scale = window.nitrogenScale || 0.1;
  
  const ctx = canvas.getContext('2d');
  const baseRadius = 30; // Base radius
  const radius = baseRadius * scale; // Scaled radius
  
  // Center position for the nitrogen drawing.
  const centerX = canvas.width / 1.95;
  const centerY = canvas.height / 1.45;
  
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
  
  // Draw complete border for the left circle.
  ctx.beginPath();
  ctx.arc(centerX - radius * 0.6, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  // Draw partial border for the right circle (only non-overlapping portion)
  const startAngle = -Math.acos(-0.6);
  const endAngle = Math.acos(-0.6);
  ctx.beginPath();
  ctx.arc(centerX + radius * 0.6, centerY, radius, startAngle, endAngle);
  ctx.stroke();
});
