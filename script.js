document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#custom-marker');
  const arObject = document.querySelector('#ar-object');
  const scene = document.querySelector('a-scene');

  let isPersisting = false; // Tracks if the object is persisting
  let lastPosition = null;
  let lastRotation = null;

  // Handle marker detection
  marker.addEventListener('markerFound', () => {
    console.log('Marker found');
    isPersisting = false; // Stop persisting the object
    arObject.setAttribute('visible', 'true');
  });

  marker.addEventListener('markerLost', () => {
    console.log('Marker lost');
    // Store the last known position and rotation
    lastPosition = arObject.object3D.getWorldPosition(new THREE.Vector3());
    lastRotation = arObject.object3D.getWorldQuaternion(new THREE.Quaternion());

    isPersisting = true; // Enable persisting mode
  });

  // Update the object's position and rotation every frame if persisting
  scene.addEventListener('tick', () => {
    if (isPersisting && lastPosition && lastRotation) {
      arObject.object3D.position.copy(lastPosition);
      arObject.object3D.quaternion.copy(lastRotation);
      arObject.setAttribute('visible', 'true');
    }
  });
});