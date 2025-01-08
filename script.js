document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#custom-marker');
  const arObject = document.querySelector('#ar-object');

  let lastPosition = new THREE.Vector3();
  let lastRotation = new THREE.Euler();
  let smoothingFactor = 0.1;

  marker.addEventListener('markerFound', () => {
    console.log('Marker found!');
    arObject.setAttribute('visible', 'true');
  });

  marker.addEventListener('markerLost', () => {
    console.log('Marker lost!');
    arObject.setAttribute('visible', 'false');
  });

  const scene = document.querySelector('a-scene');
  scene.addEventListener('tick', () => {
    if (marker.object3D.visible) {
      const currentPosition = marker.object3D.position.clone();
      const currentRotation = marker.object3D.rotation.clone();

      // Smooth position
      lastPosition.lerp(currentPosition, smoothingFactor);
      arObject.object3D.position.copy(lastPosition);

      // Smooth rotation
      lastRotation.x = THREE.MathUtils.lerp(lastRotation.x, currentRotation.x, smoothingFactor);
      lastRotation.y = THREE.MathUtils.lerp(lastRotation.y, currentRotation.y, smoothingFactor);
      lastRotation.z = THREE.MathUtils.lerp(lastRotation.z, currentRotation.z, smoothingFactor);
      arObject.object3D.rotation.copy(lastRotation);
    }
  });
});