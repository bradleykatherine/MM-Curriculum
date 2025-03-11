// beamRed.js: Draws the red beam using its parameters.
import redParams from './beamRedParams.js';

export function drawRedBeam(ctx, sunCenterX, sunCenterY, sunRadius, nitrogenCenterX, nitrogenCenterY, perpUx, perpUy) {
  const spacing = redParams.lineWidth; // spacing based on lineWidth
  const offsetX = perpUx * redParams.offsetIndex * spacing;
  const offsetY = perpUy * redParams.offsetIndex * spacing;
  
  // Start at the edge of the sun; note the extra -9 offset (as updated)
  const startX = sunCenterX + redParams.lineWidth ? 0 : 0; // (not using lineWidth here)
  const startXAdj = sunCenterX + (sunRadius * ( (nitrogenCenterX - sunCenterX) / Math.sqrt((nitrogenCenterX - sunCenterX)**2+(nitrogenCenterY - sunCenterY)**2))) + offsetX - 9;
  const startYAdj = sunCenterY + (sunRadius * ( (nitrogenCenterY - sunCenterY) / Math.sqrt((nitrogenCenterX - sunCenterX)**2+(nitrogenCenterY - sunCenterY)**2))) + offsetY - 9;
  
  const endX = nitrogenCenterX + offsetX;
  const endY = nitrogenCenterY + offsetY;
  
  ctx.beginPath();
  ctx.moveTo(startXAdj, startYAdj);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = redParams.color;
  ctx.lineWidth = redParams.lineWidth;
  ctx.stroke();
}
