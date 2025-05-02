<script>
  import * as THREE from 'three';
  import { onMount } from 'svelte';

  let container;
  let scene, camera, renderer, starField;

  export let numberOfStars = 3000;
  export let starRotationSpeed = 0.0002;
  export let starMovementSpeed = 0.002;
  export let starMovementBoundary = 10;
  export let starFieldSize = 60;

  let animationInterval = 16; // Default to roughly 60 FPS (1000ms / 60)

  onMount(() => {
    let isScrollingTimeout;
    let isScrolling = false;

    // Initialize Scene
    scene = new THREE.Scene();
    
    // Initialize Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 40;

    // Initialize Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Add Stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xeeeeee,
      size: 0.11,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4
    });

    // Generate Star Vertices
    const starVertices = [];
    for (let i = 0; i < numberOfStars; i++) {
      const x = (Math.random() - 0.5) * starFieldSize;
      const y = (Math.random() - 0.5) * starFieldSize;
      const z = (Math.random() - 0.5) * starFieldSize;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    // Create Star Field
    starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    let lastFrameTime = 0;

    // Animation
    function animate() {
      requestAnimationFrame(animate);
      const currentTime = performance.now();

      if (currentTime - lastFrameTime >= animationInterval) {
        // Rotate Star Field
        starField.rotation.x += starRotationSpeed;
        starField.rotation.y += starRotationSpeed;

        // Strafing Effect
        starField.position.z += starMovementSpeed;
        if (starField.position.z > starMovementBoundary) {
          starField.position.z = -starMovementBoundary;
        }

        renderer.render(scene, camera);
        lastFrameTime = currentTime;
      }
    }

    animate(0);

    // Handle Resizing
    window.addEventListener('resize', onWindowResize);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Handle Scroll Event
    window.addEventListener('scroll', onScroll);
    function onScroll() {
      isScrolling = true;
      clearTimeout(isScrollingTimeout);
      animationInterval = 33;

      isScrollingTimeout = setTimeout(() => {
        isScrolling = false;
        animationInterval = 16;

      }, 250); // Delay to stop animation during scrolling
    }
    

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('scroll', onScroll);
      renderer.dispose();
    };
  });
</script>

<div bind:this={container} style="position: fixed; z-index: 1; width: 100%; height: 100vh; will-change: transform;"></div>

<style>
  div {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
</style>