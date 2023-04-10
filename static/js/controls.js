let controls;

function setupControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1.3;
    controls.maxDistance = 10;

    // Set initial camera position
    camera.position.set(3, 0, 0);
    controls.update();
}
