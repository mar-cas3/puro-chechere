async function initThreeJS() {
  try {
    // Dynamically import Three.js
    const THREE = await import(
      "https://cdn.jsdelivr.net/npm/three@v0.182.0/build/three.module.js"
    );
    // Now use THREE

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Create a camera
    const camera = new THREE.PerspectiveCamera(20, 4 / 3, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    let divName = document.currentScript?.getAttribute('div') || 'hello'
    
    console.log(document.getElementById(`threejs-container-${divName}`));
    document
      .getElementById(`threejs-container-${divName}`)
      .appendChild(renderer.domElement); // ! Looks for threejs-container-hello div created in baseof.html

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    // Create an animation loop
    const animate_wired_cube = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate_wired_cube();

    console.log("Three.js loaded successfully!");
  } catch (error) {
    console.error("Failed to load Three.js:", error);
  }
}

// Start when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThreeJS);
} else {
  initThreeJS();
}
