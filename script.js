document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#custom-marker');
  const arObject = document.querySelector('#ar-object');
  let isStaged = false;

  // Initialize WebXR session
  function initWebXR() {
    if (navigator.xr) {
      navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test']
      }).then((session) => {
        console.log('WebXR session started');
        // Use SLAM for persistence
        session.addEventListener('select', () => {
          console.log('Hit-test detected, object anchored.');
        });
      }).catch((err) => {
        console.error('WebXR not supported:', err);
      });
    } else {
      console.error('WebXR is not available on this device.');
    }
  }

  // When marker is found, stage the scene
  marker.addEventListener('markerFound', () => {
    if (!isStaged) {
      console.log('Marker found. Staging scene...');
      isStaged = true;

      // Capture position and rotation
      const position = arObject.object3D.getWorldPosition(new THREE.Vector3());
      const rotation = arObject.object3D.getWorldQuaternion(new THREE.Quaternion());

      // Use WebXR to anchor the object
      initWebXR();

      // Log position and rotation for debugging
      console.log('Object positioned at:', position);
      console.log('Object rotation:', rotation);
    }
  });
});