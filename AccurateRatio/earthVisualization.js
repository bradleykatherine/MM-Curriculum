// earthVisualization.js: Handles rendering of the Earth image

let earthImage;  // Global variable to store the Earth image

// Initialize the Earth visualization by preloading the image
function initializeEarthVisualization() {
  earthImage = loadImage('https://upload.wikimedia.org/wikipedia/commons/5/5b/The_Blue_Marble_%285052124705%29.jpg');
}

// Draw the Earth image on the canvas with a white rectangular cover
// that has a circular cutout in the center.
// The cutout radius is set to (min(width, height) * 0.75 * 0.95) / 3.
function drawEarth(canvasWidth, canvasHeight) {
  if (!earthImage) {
    console.error('Earth image not loaded. Ensure initializeEarthVisualization() is called before setup.');
    return;
  }
  
  // Determine Earth image dimensions.
  let earthScale = 0.75;  // Scale factor for the Earth image
  let maxDiameter = Math.min(canvasWidth, canvasHeight) * earthScale;
  let aspectRatio = earthImage.width / earthImage.height;
  let earthWidth = maxDiameter;
  let earthHeight = maxDiameter / aspectRatio;
  
  imageMode(CENTER);
  // Draw the Earth image centered.
  image(earthImage, canvasWidth / 2, canvasHeight / 2, earthWidth, earthHeight);
  
  // Define the bounding box for the white cover (matching the Earth image)
  let x1 = canvasWidth / 2 - earthWidth / 1.5;
  let y1 = canvasHeight / 2 - earthHeight / 2;
  let x2 = canvasWidth / 2 + earthWidth / 1.5;
  let y2 = canvasHeight / 2 + earthHeight / 2;
  
  // Calculate the radius of the circular cutout.
  let holeRadius = (Math.min(canvasWidth, canvasHeight) * 0.75 * 0.95) / 3;
  
  // Draw the white cover as a rectangle with a circular cutout.
  push();
  noStroke();
  fill(255); // Opaque white
  beginShape();
  // Outer rectangle vertices (clockwise)
  vertex(x1, y1);
  vertex(x2, y1);
  vertex(x2, y2);
  vertex(x1, y2);
  
  // Define the circular cutout using a contour (drawn in reverse order).
  beginContour();
  let numPoints = 100;
  for (let i = numPoints - 1; i >= 0; i--) {
    let angle = map(i, 0, numPoints, 0, TWO_PI);
    let cx = canvasWidth / 2 + holeRadius * cos(angle);
    let cy = canvasHeight / 2 + holeRadius * sin(angle);
    vertex(cx, cy);
  }
  endContour();
  endShape(CLOSE);
  pop();
}
