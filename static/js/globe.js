function addGlobeToScene() {
    const globeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const globeTexture = new THREE.TextureLoader().load('/static/textures/mars.jpg');
    const globeMaterial = new THREE.MeshPhongMaterial({ map: globeTexture });
    globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

}