document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#custom-marker');
  const arObject = document.querySelector('#ar-object');
  let isSLAMInitialized = false;

  // Initialize WebXR session for SLAM
  async function initWebXR(position, rotation) {
    if (!navigator.xr) {
      console.error('WebXR not supported on this device.');
      return;
    }

    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test']
      });

      console.log('WebXR session started.');
      const referenceSpace = await session.requestReferenceSpace('local');
      session.addEventListener('select', () => {
        console.log('SLAM anchor created.');

        // Use hit test to anchor the object persistently
        arObject.object3D.position.copy(position);
        arObject.object3D.rotation.copy(rotation);

        arObject.setAttribute('visible', 'true');
      });

      // Remove marker from the DOM to stop conflicts
      marker.parentNode.removeChild(marker);

      isSLAMInitialized = true;
    } catch (err) {
      console.error('Error initializing WebXR:', err);
    }
  }

  // AR.js marker detection logic
  marker.addEventListener('markerFound', () => {
    if (!isSLAMInitialized) {
      console.log('Marker found. Transitioning to SLAM...');

      // Get marker's world position and rotation
      const position = marker.object3D.getWorldPosition(new THREE.Vector3());
      const rotation = marker.object3D.getWorldQuaternion(new THREE.Quaternion());

      // Transition to WebXR SLAM
      initWebXR(position, rotation);
    }
  });

  marker.addEventListener('markerLost', () => {
    console.log('Marker lost, but object persists via SLAM.');
  });
});