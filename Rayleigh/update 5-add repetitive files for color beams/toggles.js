document.addEventListener('DOMContentLoaded', () => {
  // Create a container for the toggles and position it to the right.
  const toggleContainer = document.createElement('div');
  toggleContainer.id = 'toggleContainer';
  
  toggleContainer.style.position = 'fixed';
  toggleContainer.style.top = '60px'; // Adjust if needed (below the title)
  toggleContainer.style.right = '20px';
  toggleContainer.style.background = '#f4f4f4';
  toggleContainer.style.padding = '10px';
  toggleContainer.style.border = '1px solid #ccc';
  toggleContainer.style.boxShadow = '2px 2px 6px rgba(0,0,0,0.2)';
  
  const heading = document.createElement('h3');
  heading.textContent = 'Beam Toggles';
  heading.style.margin = '0 0 10px 0';
  heading.style.fontSize = '16px';
  heading.style.textAlign = 'center';
  toggleContainer.appendChild(heading);
  
  // List of beam colors.
  const beamColors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
  
  // Initialize a global object to hold toggle states.
  if (!window.beamToggles) {
    window.beamToggles = {};
    beamColors.forEach(color => {
      window.beamToggles[color] = true;
    });
  }
  
  // Create a checkbox for each beam color.
  beamColors.forEach(color => {
    const label = document.createElement('label');
    label.style.display = 'block';
    label.style.marginBottom = '5px';
    label.style.cursor = 'pointer';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.id = `toggle-${color}`;
    
    checkbox.addEventListener('change', () => {
      window.beamToggles[color] = checkbox.checked;
      if (window.refreshBeams) {
        window.refreshBeams();
      }
    });
    
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${color}`));
    toggleContainer.appendChild(label);
  });
  
  document.body.appendChild(toggleContainer);
});
