document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#custom-marker');
  const arObject = document.querySelector('#ar-object');
  const scene = document.querySelector('a-scene');

  let lastPosition = null;
  let lastRotation = null;

  marker.addEventListener('markerFound', () => {
    console.log('Marker found');
    // Reattach the object to the marker
    marker.appendChild(arObject);
  });

  marker.addEventListener('markerLost', () => {
    console.log('Marker lost');
    // Record the object's last known position and rotation
    lastPosition = arObject.object3D.getWorldPosition(new THREE.Vector3());
    lastRotation = arObject.object3D.getWorldRotation(new THREE.Euler());

    // Detach the object from the marker and attach it to the scene
    scene.appendChild(arObject);

    // Set the object's position and rotation to the last known values
    arObject.object3D.position.copy(lastPosition);
    arObject.object3D.rotation.copy(lastRotation);
  });
});