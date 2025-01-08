document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#custom-marker');
  const arObject = document.querySelector('#ar-object');
  const scene = document.querySelector('a-scene');

  let isStaged = false; // Tracks if SLAM is engaged

  // Initialize WebXR SLAM
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

      const xrReferenceSpace = await session.requestReferenceSpace('local');
      const xrHitTestSource = await session.requestHitTestSource({
        space: xrReferenceSpace
      });

      session.addEventListener('select', () => {
        console.log('Anchoring object in SLAM.');

        // Use hit test to anchor the object
        arObject.object3D.position.copy(position);
        arObject.object3D.rotation.copy(rotation);

        arObject.setAttribute('visible', 'true');
        isStaged = true;
      });
    } catch (err) {
      console.error('Error initializing WebXR:', err);
    }
  }

  // Marker detection
  marker.addEventListener('markerFound', () => {
    if (!isStaged) {
      console.log('Marker found. Staging scene...');

      // Capture the marker's world position and rotation
      const position = marker.object3D.getWorldPosition(new THREE.Vector3());
      const rotation = marker.object3D.getWorldQuaternion(new THREE.Quaternion());

      // Stop relying on the marker
      marker.remove();

      // Initialize WebXR SLAM
      initWebXR(position, rotation);
    }
  });

  marker.addEventListener('markerLost', () => {
    console.log('Marker lost. Object will persist using SLAM.');
  });
});