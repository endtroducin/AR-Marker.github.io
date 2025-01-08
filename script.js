document.addEventListener("DOMContentLoaded", () => {
    const marker = document.getElementById("marker"); // Marker element
    const box = document.getElementById("box"); // 3D object (the box)
  
    // Flag to track marker visibility
    let isMarkerVisible = false;
  
    // Variable to store the last known position of the box
    let lastPosition = { x: 0, y: 0.5, z: 0 };
  
    // Marker found event
    marker.addEventListener("markerFound", () => {
      console.log("Marker Found!");
      isMarkerVisible = true;
  
      // Reposition the box to align with the marker
      box.setAttribute("position", `${lastPosition.x} ${lastPosition.y} ${lastPosition.z}`);
    });
  
    // Marker lost event
    marker.addEventListener("markerLost", () => {
      console.log("Marker Lost!");
      isMarkerVisible = false;
  
      // Save the current position of the box
      const currentPos = box.getAttribute("position");
      lastPosition = {
        x: parseFloat(currentPos.x),
        y: parseFloat(currentPos.y),
        z: parseFloat(currentPos.z),
      };
      console.log("Last position saved:", lastPosition);
    });
  });