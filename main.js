import * as THREE from 'three';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import {CSS2DRenderer} from 'three/addons/renderers/CSS2DRenderer.js';
import {FontLoader, OrbitControls} from 'three/examples/jsm/Addons.js';

// SETUP
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
}
window.addEventListener('resize', onWindowResize, false);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);


// sphere (earth)
const earth_sphere = new THREE.SphereGeometry(2, 100, 100);
const earth_color = new THREE.TextureLoader().load('planet/earth.jpg');
const earth_bump = new THREE.TextureLoader().load('planet/earth_bump.jpg');
const earth_spec = new THREE.TextureLoader().load('planet/earthspec.jpg');
const earth_lights = new THREE.TextureLoader().load('planet/earthlights.jpg');

const earth_clouds = new THREE.TextureLoader().load('planet/clouds.jpg');
const clouds_sphere = new THREE.SphereGeometry(2.01, 100, 100);
const clouds_mat = new THREE.MeshPhongMaterial({
  alphaMap: earth_clouds,
  opacity: 1,
  transparent: true,
});
// clouds_mat.blending = THREE.AdditiveBlending;
const clouds_mesh = new THREE.Mesh(clouds_sphere, clouds_mat);
scene.add(clouds_mesh);

const earth_mat = new THREE.MeshPhongMaterial({
  map: earth_color,
  // normalMap: earth_normal,
  specularMap: earth_spec,
  glowColor: 1,
  bumpMap: earth_bump,
  emissiveMap: earth_lights,
  emissiveIntensity: 1,
  emissive: true,
  shininess: 100
});

const mesh_sphere = new THREE.Mesh(earth_sphere, earth_mat);
scene.add(mesh_sphere);


// light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x000000);  // Soft white light
ambientLight.intensity = 2;
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.enableRotate = false;  // temp
controls.autoRotate = true;
controls.autoRotateSpeed = 0.1;
controls.enablePan = false;
// controls.enableZoom = false;



function mainloop() {
  requestAnimationFrame(mainloop);

  controls.update();
  renderer.render(scene, camera);
}

mainloop();