document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#custom-marker');
  const arObject = document.querySelector('#ar-object');
  const scene = document.querySelector('a-scene');

  let lastPosition = null;
  let lastRotation = null;

  marker.addEventListener('markerFound', () => {
    console.log('Marker found');
    arObject.setAttribute('visible', 'true');
  });

  marker.addEventListener('markerLost', () => {
    console.log('Marker lost');
    lastPosition = arObject.object3D.getWorldPosition(new THREE.Vector3());
    lastRotation = arObject.object3D.getWorldQuaternion(new THREE.Quaternion());

    scene.appendChild(arObject);
    arObject.object3D.position.copy(lastPosition);
    arObject.object3D.quaternion.copy(lastRotation);
  });
});