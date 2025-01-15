// simulation.js: Main logic for the Methane Visualization

// Global variables for visualization
let methaneConcentration = 1.922; // Methane concentration in ppm
let co2Concentration = 421; // CO₂ concentration in ppm
let averageTemperatureC = 14.98; // Average temperature in Celsius
let averageTemperatureF = (averageTemperatureC * 1.8) + 32; // Converted to Fahrenheit

function setup() {
    createPageStructure(); // Create the page structure dynamically
    initializeEarthCanvas(); // Initialize the Earth canvas (moved to earthVisualization.js)
}

function createPageStructure() {
    // Set the page background color to gray
    document.body.style.backgroundColor = '#f4f4f4';

    // Create title
    const title = createDiv('Methane Visualization');
    title.style('text-align', 'center');
    title.style('margin', '20px 0');
    title.style('font-size', '24px');
    title.style('font-weight', 'bold');
    title.style('color', '#333');
    title.parent(document.body);
}
