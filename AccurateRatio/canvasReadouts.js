// canvasReadouts.js: Displays atmospheric data on the canvas

function displayReadouts(temperatureC, temperatureF, methaneConcentration, co2Concentration, n2oConcentration) {
  fill(0); // Black text
  textSize(16);
  
  // Display temperature data
  text(`Average Global Temperature: ${temperatureC}°C (${temperatureF.toFixed(1)}°F)`, 10, 20);
  
  // Display gas concentrations
  text(`Methane Concentration: ${methaneConcentration.toFixed(3)} ppm`, 10, height - 100);
  text(`Carbon Dioxide Concentration: ${co2Concentration.toFixed(0)} ppm`, 10, height - 80);
  text(`Nitrous Oxide Concentration: ${n2oConcentration.toFixed(2)} ppm`, 10, height - 60);
}
