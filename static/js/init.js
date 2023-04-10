let container, camera, scene, renderer, globe, satellites, controls, labelRenderer;

function initThreeJs(satelliteData) {
    container = document.getElementById('globe-container');

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

    // Add the globe to the scene
    createGlobe();

    // Add rover markers to the scene using hardcoded coordinates
    const roverLocations = [
        { name: "Sojourner", latitude: 19.13, longitude: -33.22 },
        { name: "Spirit", latitude: -14.57, longitude: 175.47 },
        { name: "Opportunity", latitude: -1.95, longitude: -354.47 },
        { name: "Curiosity", latitude: -4.59, longitude: 137.44 },
        { name: "Perseverance", latitude: 18.4446, longitude: 77.4509 }
    ];

    roverLocations.forEach(rover => {
        const roverMarker = createRoverMarker(parseFloat(rover.latitude), parseFloat(rover.longitude));
        scene.add(roverMarker);
    });


    // Add a light source
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 3);
    camera.add(light);
    scene.add(camera);

    // Add OrbitControls for user interaction
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Render loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);
