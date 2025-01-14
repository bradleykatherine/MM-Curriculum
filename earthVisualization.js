// earthVisualization.js: Handles rendering of the Earth image, canvas, and displayed text

let earthImage; // Global variable to store the Earth image

// Preload the Earth image from a public URL
function preloadEarthImage() {
    earthImage = loadImage('https://upload.wikimedia.org/wikipedia/commons/5/5b/The_Blue_Marble_%285052124705%29.jpg');
}

// Preload function for the simulation
function preload() {
    preloadEarthImage(); // Preload the Earth image
}

// Initialize the canvas and separate description container
function initializeEarthCanvas() {
    // Create a container for the description bubble
    const descriptionContainer = createDiv(`
        This visualization represents the current atmospheric conditions, including methane and carbon dioxide concentrations,
        as well as the average global temperature. These values serve as the baseline for exploring the impact of
        various climate mitigation strategies.
    `);
    descriptionContainer.style('width', '600px');
    descriptionContainer.style('padding', '15px');
    descriptionContainer.style('margin', '0 auto');
    descriptionContainer.style('position', 'relative');
    descriptionContainer.style('top', '50px');
    descriptionContainer.style('border', '1px solid #000');
    descriptionContainer.style('border-radius', '8px');
    descriptionContainer.style('background', '#fff');
    descriptionContainer.style('box-shadow', '2px 2px 8px rgba(0, 0, 0, 0.2)');
    descriptionContainer.style('font-size', '16px');
    descriptionContainer.style('line-height', '1.4');
    descriptionContainer.style('color', '#333');
    descriptionContainer.style('text-align', 'center');
    descriptionContainer.parent(document.body);

    // Create a container for the canvas
    const canvasContainer = createDiv();
    canvasContainer.style('width', '100%');
    canvasContainer.style('height', 'calc(100vw * 0.4)'); // Maintain aspect ratio based on width
    canvasContainer.style('margin', '20px auto 0 auto');
    canvasContainer.style('position', 'relative');
    canvasContainer.style('top', '50px');
    canvasContainer.style('background', '#000');
    canvasContainer.style('border', '1px solid #000');
    canvasContainer.style('border-radius', '8px');
    canvasContainer.style('box-shadow', '2px 2px 8px rgba(0, 0, 0, 0.2)');
    canvasContainer.parent(document.body);

    // Create the canvas
    const canvas = createCanvas(windowWidth, Math.min(windowWidth * 0.4, 600)); // Dynamic canvas size
    canvas.parent(canvasContainer);

    // Draw the Earth image on the canvas
    drawEarth(width, height);

    // Display current atmospheric conditions on the canvas
    displayCurrentConditions();
}

// Draw the Earth image on the canvas
function drawEarth(canvasWidth, canvasHeight) {
    if (!earthImage) {
        console.error('Earth image not loaded. Ensure preloadEarthImage() is called before setup.');
        return;
    }

    const aspectRatio = earthImage.width / earthImage.height;
    const scaleFactor = 0.75;
    const maxDiameter = Math.min(canvasWidth, canvasHeight) * scaleFactor;

    const earthWidth = aspectRatio > 1 ? maxDiameter : maxDiameter * aspectRatio;
    const earthHeight = aspectRatio > 1 ? maxDiameter / aspectRatio : maxDiameter;

    imageMode(CENTER);
    image(earthImage, canvasWidth / 2, canvasHeight / 2, earthWidth, earthHeight);
}

// Display current atmospheric conditions on the canvas
function displayCurrentConditions() {
    fill(255);
    textSize(16);
    text(`Methane: ${methaneConcentration.toFixed(2)} ppm`, 10, height - 60);
    text(`CO₂: ${co2Concentration.toFixed(0)} ppm`, 10, height - 40);
    text(`Global Temp: ${averageTemperatureC.toFixed(2)}°C (${averageTemperatureF.toFixed(1)}°F)`, 10, height - 20);
}
