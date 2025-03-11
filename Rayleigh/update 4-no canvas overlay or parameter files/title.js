document.addEventListener('DOMContentLoaded', () => {
  // Create a title element.
  const titleDiv = document.createElement('div');
  titleDiv.id = 'simulationTitle';
  titleDiv.textContent = 'Rayleigh Scattering Simulation';
  titleDiv.style.textAlign = 'center';
  titleDiv.style.fontSize = '28px';
  titleDiv.style.fontWeight = 'bold';
  titleDiv.style.color = '#333';
  titleDiv.style.padding = '20px 0';
  titleDiv.style.margin = '0';
  titleDiv.style.background = 'none';
  document.body.insertBefore(titleDiv, document.body.firstChild);
});
