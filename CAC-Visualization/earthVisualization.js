// earthVisualization.js: Handles rendering of the Earth image

let earthImage; // Global variable to store the Earth image

// Preload the Earth image from a public URL
function preloadEarthImage() {
  earthImage = loadImage('https://upload.wikimedia.org/wikipedia/commons/5/5b/The_Blue_Marble_%285052124705%29.jpg');
}

// Draw the Earth image on the canvas
function drawEarth(canvasWidth, canvasHeight) {
  if (!earthImage) {
    console.error('Earth image not loaded. Ensure preloadEarthImage() is called before setup.');
    return;
  }

  let aspectRatio = earthImage.width / earthImage.height;
  let scaleFactor = 0.75;
  let maxDiameter = Math.min(canvasWidth, canvasHeight) * scaleFactor;

  let earthWidth = maxDiameter;
  let earthHeight = maxDiameter / aspectRatio;

  imageMode(CENTER);
  image(earthImage, canvasWidth / 2, canvasHeight / 2, earthWidth, earthHeight);
}
