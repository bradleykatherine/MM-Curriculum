document.addEventListener('DOMContentLoaded', () => {
  // Create a title element
  const titleDiv = document.createElement('div');
  titleDiv.id = 'simulationTitle';
  titleDiv.textContent = 'Rayleigh Scattering Simulation';

  // Style the title to be centered and at the top
  titleDiv.style.textAlign = 'center';
  titleDiv.style.fontSize = '28px';
  titleDiv.style.fontWeight = 'bold';
  titleDiv.style.color = '#333';
  titleDiv.style.padding = '20px 0';
  titleDiv.style.margin = '0';
  titleDiv.style.backgroundColor = 'transparent'; // no background
  titleDiv.style.background = 'none';            // ensure no fallback

  // Insert the title at the top of the body
  document.body.insertBefore(titleDiv, document.body.firstChild);
});
