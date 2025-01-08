document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#custom-marker');
  const arObject = document.querySelector('#ar-object');
  const debuggerElement = document.getElementById('debugger');
  let isSLAMInitialized = false;

  // Update debugger status
  function updateDebugger(status) {
    debuggerElement.textContent = `Status: ${status}`;
    console.log(status);
  }

  // Initialize WebXR SLAM
  async function initWebXR(position, rotation) {
    if (!navigator.xr) {
      updateDebugger('WebXR not supported on this device.');
      return;
    }

    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test'],
      });

      updateDebugger('WebXR session started. Initializing SLAM...');
      session.addEventListener('select', () => {
        updateDebugger('SLAM anchor created. Object anchored.');

        // Anchor the object in the real world
        arObject.object3D.position.copy(position);
        arObject.object3D.quaternion.copy(rotation);
        arObject.setAttribute('visible', 'true');
      });

      session.addEventListener('end', () => {
        updateDebugger('WebXR session ended.');
      });

      isSLAMInitialized = true;
    } catch (err) {
      updateDebugger(`Error initializing WebXR: ${err.message}`);
    }
  }

  // Handle marker detection
  marker.addEventListener('markerFound', () => {
    if (!isSLAMInitialized) {
      updateDebugger('Marker found. Transitioning to SLAM...');

      // Get marker's world position and rotation
      const position = marker.object3D.getWorldPosition(new THREE.Vector3());
      const rotation = marker.object3D.getWorldQuaternion(new THREE.Quaternion());

      // Initialize WebXR for SLAM
      initWebXR(position, rotation);
    } else {
      updateDebugger('Marker found. SLAM already initialized.');
    }
  });

  marker.addEventListener('markerLost', () => {
    updateDebugger('Marker lost.');
  });

  updateDebugger('Waiting for marker detection...');
});