const roverLocations = [
  { name: "Sojourner", latitude: 19.13, longitude: -33.22 },
  { name: "Spirit", latitude: -14.57, longitude: 175.47 },
  { name: "Opportunity", latitude: -1.95, longitude: -354.47 },
  { name: "Curiosity", latitude: -4.59, longitude: 137.44 },
  { name: "Perseverance", latitude: 18.4446, longitude: 77.4509 },
];

let roverMarkers = [];

function addRoverMarkersToScene() {
  roverLocations.forEach((rover) => {
    const roverMarker = createRoverMarker(parseFloat(rover.latitude), parseFloat(rover.longitude));
    scene.add(roverMarker);
    roverMarkers.push(roverMarker);
  });

  animateRoverMarkersLoop();
}

function createRoverMarker(latitude, longitude, roverName) {
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = (longitude + 180) * (Math.PI / 180);

  const roverMarkerGeometry = new THREE.SphereGeometry(0.015, 16, 16);
  const roverMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0xFF8C00 });
  const roverMarker = new THREE.Mesh(roverMarkerGeometry, roverMarkerMaterial);

  roverMarker.position.x = -Math.sin(phi) * Math.cos(theta);
  roverMarker.position.y = Math.cos(phi);
  roverMarker.position.z = Math.sin(phi) * Math.sin(theta);
  roverMarker.position.multiplyScalar(0.99);

  roverMarker.name = roverName;

  return roverMarker;
}

function animateRoverMarkers(roverMarkers) {
  const orange = new THREE.Color(0xFF8C00);
  const white = new THREE.Color(0xFFFFFF);

  roverMarkers.forEach((roverMarker) => {
    const t = 0.5 * (Math.sin(Date.now() * 0.007) + 1);
    roverMarker.material.color.lerpColors(orange, white, t);
  });
}

function animateRoverMarkersLoop() {
  animateRoverMarkers(roverMarkers);
  requestAnimationFrame(animateRoverMarkersLoop);
}
