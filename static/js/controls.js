let controls;

function setupControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1.3;
    controls.maxDistance = 5
    controls.enablePan = false;

    // Set initial camera position based on screen width
    if (window.innerWidth < 768) {
        camera.position.set(3, 0, 0);
    } else {
        camera.position.set(2.5, 0, 0);
    }

    controls.update();
}
