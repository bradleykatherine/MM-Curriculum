document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.id = 'colorSelector';
  container.style.position = 'fixed';
  container.style.top = '60px';
  container.style.right = '20px';
  container.style.background = '#f4f4f4';
  container.style.padding = '10px';
  container.style.border = '1px solid #ccc';
  container.style.boxShadow = '2px 2px 6px rgba(0,0,0,0.2)';
  
  const heading = document.createElement('h3');
  heading.textContent = 'Select Beam Color';
  heading.style.fontSize = '16px';
  heading.style.textAlign = 'center';
  heading.style.margin = '0 0 10px 0';
  container.appendChild(heading);
  
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
  // Create radio buttons for each color.
  colors.forEach(color => {
    const label = document.createElement('label');
    label.style.display = 'block';
    label.style.marginBottom = '5px';
    label.style.cursor = 'pointer';
    
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'beamColor';
    radio.value = color;
    if (color === 'red') {
      radio.checked = true;
      window.selectedColor = 'red';
    }
    radio.addEventListener('change', () => {
      if (radio.checked) {
         window.selectedColor = radio.value;
         // Redraw the incoming beam with the new color.
         if (window.refreshIncomingBeam) {
             window.refreshIncomingBeam();
         }
      }
    });
    
    label.appendChild(radio);
    label.appendChild(document.createTextNode(' ' + color));
    container.appendChild(label);
  });
  
  document.body.appendChild(container);
});
