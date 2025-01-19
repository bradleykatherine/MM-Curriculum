// earthVisualization.js: Handles rendering of the Earth image

let earthImage;  // Global variable to store the Earth image

// Initialize the Earth visualization by preloading the image
function initializeEarthVisualization() {
  earthImage = loadImage('https://upload.wikimedia.org/wikipedia/commons/5/5b/The_Blue_Marble_%285052124705%29.jpg'); // Preload the Earth image from a public URL
}

// Draw the Earth image on the canvas
function drawEarth(canvasWidth, canvasHeight) {
  // Verify that the earthImage variable has been properly initialized before attempting to draw it on the canvas
  if (!earthImage) {
    console.error('Earth image not loaded. Ensure initializeEarthVisualization() is called before setup.');
    return; // Exit early to avoid drawing a null image
  }

  let aspectRatio = earthImage.width / earthImage.height;
  let scaleFactor = 0.75;  // Used to scale the Earth image
  let maxDiameter = Math.min(canvasWidth, canvasHeight) * scaleFactor; // Fit the image within the canvas
  let earthWidth = maxDiameter;
  let earthHeight = maxDiameter / aspectRatio;

  imageMode(CENTER);
  image(earthImage, canvasWidth / 2, canvasHeight / 2, earthWidth, earthHeight); // Draw the Earth image
}