document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#custom-marker');
  const arObject = document.querySelector('#ar-object');
  const debuggerElement = document.getElementById('debugger');

  let isSLAMInitialized = false;

  // Function to update debugger text
  function updateDebugger(status) {
    debuggerElement.textContent = `Status: ${status}`;
    console.log(status);
  }

  // Initialize WebXR for SLAM
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
        arObject.object3D.position.copy(position);
        arObject.object3D.rotation.copy(rotation);
        arObject.setAttribute('visible', 'true');
      });

      isSLAMInitialized = true;
    } catch (err) {
      updateDebugger(`Error initializing WebXR: ${err.message}`);
    }
  }

  // Marker detection
  marker.addEventListener('markerFound', () => {
    if (!isSLAMInitialized) {
      updateDebugger('Marker found. Transitioning to SLAM...');
      const position = marker.object3D.getWorldPosition(new THREE.Vector3());
      const rotation = marker.object3D.getWorldQuaternion(new THREE.Quaternion());
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