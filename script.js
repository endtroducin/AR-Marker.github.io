document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#custom-marker');
  const arObject = document.querySelector('#ar-object');

  let isSLAMInitialized = false;

  // Initialize WebXR for SLAM
  async function initWebXR(position, rotation) {
    if (!navigator.xr) {
      console.error('WebXR not supported on this device.');
      return;
    }

    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test'],
      });

      console.log('WebXR session started.');
      session.addEventListener('select', () => {
        console.log('SLAM anchor created.');

        // Use hit test to anchor the object persistently
        arObject.object3D.position.copy(position);
        arObject.object3D.rotation.copy(rotation);
        arObject.setAttribute('visible', 'true');
      });

      isSLAMInitialized = true;
    } catch (err) {
      console.error('Error initializing WebXR:', err);
    }
  }

  marker.addEventListener('markerFound', () => {
    console.log('Marker found.');
    if (!isSLAMInitialized) {
      const position = marker.object3D.getWorldPosition(new THREE.Vector3());
      const rotation = marker.object3D.getWorldQuaternion(new THREE.Quaternion());
      initWebXR(position, rotation);
    }
  });

  marker.addEventListener('markerLost', () => {
    console.log('Marker lost.');
  });
});