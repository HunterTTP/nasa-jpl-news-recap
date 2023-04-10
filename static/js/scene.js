function setupScene() {
    // Set up the scene
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 2000);
    camera.position.z = 3;

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

}

function addLightSourceToScene() {
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 3);
    camera.add(light);
    scene.add(camera);
}

function animateScene() {
    requestAnimationFrame(animateScene);
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}


