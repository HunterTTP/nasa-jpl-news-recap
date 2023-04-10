let container, camera, scene, renderer, globe, satellites, labelRenderer;

function initThreeJs() {
    container = document.getElementById('globe-container');
    setupScene();
    addGlobeToScene();
    addRoverMarkersToScene();
    setupControls();
    addLightSourceToScene();
    animateScene();
}

window.addEventListener('resize', onWindowResize, false);