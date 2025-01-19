// canvasReadouts.js: Handles the display of atmospheric data on the canvas

// Function to display atmospheric data and temperature constants on the canvas
function displayReadouts(temperatureC, temperatureF, methaneConcentration, co2Concentration, n2oConcentration) {
  fill(255); // Set the text color to white
  textSize(16); // Set the font size for the text

  // Display temperature data
  text(`Average Global Temperature: ${temperatureC}°C (${temperatureF.toFixed(1)}°F)`, 10, 20);

  // Display methane concentration
  text(`Methane Concentration: ${methaneConcentration.toFixed(3)} ppm`, 10, height - 100);

  // Display carbon dioxide concentration
  text(`Carbon Dioxide Concentration: ${co2Concentration.toFixed(0)} ppm`, 10, height - 80);

  // Display nitrous oxide concentration
  text(`Nitrous Oxide Concentration: ${n2oConcentration.toFixed(2)} ppm`, 10, height - 60);
}
