document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#custom-marker');
  const arObject = document.querySelector('#ar-object');

  marker.addEventListener('markerFound', () => {
    console.log('Marker found');
    arObject.setAttribute('visible', 'true');
  });

  marker.addEventListener('markerLost', () => {
    console.log('Marker lost');
    arObject.setAttribute('visible', 'false');
  });
});