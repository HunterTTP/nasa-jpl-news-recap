let container, camera, scene, renderer, globe, satellites, controls, labelRenderer;

function initThreeJs(satelliteData) {
    container = document.getElementById('globe-container');

    // Set up the scene, camera, renderer, and controls
    setupScene();

    // Add the globe to the scene
    addGlobeToScene();

    // Add rover markers to the scene
    addRoverMarkersToScene();

    // Add a light source
    addLightSourceToScene();

    // Render loop
    animateScene();
}

window.addEventListener('resize', onWindowResize, false);
