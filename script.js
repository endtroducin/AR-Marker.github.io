document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#custom-marker');
  const arObject = document.querySelector('#ar-object');
  const scene = document.querySelector('a-scene');

  let isPlaced = false; // Tracks if the object has been placed

  marker.addEventListener('markerFound', () => {
    if (!isPlaced) {
      console.log('Marker found. Placing object...');
      isPlaced = true;

      // Capture the marker's world position and rotation
      const position = marker.object3D.getWorldPosition(new THREE.Vector3());
      const rotation = marker.object3D.getWorldQuaternion(new THREE.Quaternion());

      // Detach the object from the marker and attach it to the scene
      scene.appendChild(arObject);
      arObject.object3D.position.copy(position);
      arObject.object3D.quaternion.copy(rotation);

      // Make the object visible
      arObject.setAttribute('visible', 'true');

      console.log('Object placed at:', position);
    }
  });

  marker.addEventListener('markerLost', () => {
    console.log('Marker lost. No further updates.');
    // Do nothing further as the object has already been placed
  });
});