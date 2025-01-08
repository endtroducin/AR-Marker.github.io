document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#custom-marker');

  marker.addEventListener('markerFound', () => {
    console.log('Custom marker detected');
    // Add your 3D object or any other logic here
    const box = document.createElement('a-box');
    box.setAttribute('position', '0 0.5 0');
    box.setAttribute('material', 'color: red');
    marker.appendChild(box);
  });

  marker.addEventListener('markerLost', () => {
    console.log('Custom marker lost');
    // Remove the 3D object or perform other cleanup here
    while (marker.firstChild) {
      marker.removeChild(marker.firstChild);
    }
  });
});