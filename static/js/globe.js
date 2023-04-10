function createGlobe() {
    const globeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const globeTexture = new THREE.TextureLoader().load('/static/textures/mars.jpg');
    const globeMaterial = new THREE.MeshPhongMaterial({ map: globeTexture });
    globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
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