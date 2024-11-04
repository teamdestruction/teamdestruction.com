import * as THREE from 'three';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
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


// sphere (mars)
const geo_sphere = new THREE.SphereGeometry(2, 100, 100);
const mars_color =
    new THREE.TextureLoader().load('planet/5672_mars_2k_color.jpg');
const mars_normal =
    new THREE.TextureLoader().load('planet/5672_mars_2k_normal.jpg');
const mat_sphere =
    new THREE.MeshStandardMaterial({map: mars_color, normalMap: mars_normal});
const mesh_sphere = new THREE.Mesh(geo_sphere, mat_sphere);
scene.add(mesh_sphere);

// light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x303030);  // Soft white light
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.1;
controls.enablePan = false;
controls.enableZoom = false;

const loader = new FontLoader();
loader.load('nerd.json', function(font) {
  const geometry = new TextGeometry('COMING SOON...', {
    font: font,
    size: 0.5,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.02,
    bevelSegments: 5
  });
  const texture = new THREE.MeshStandardMaterial({color: 0xffffff});
  const textMesh = new THREE.Mesh(geometry, texture);
  textMesh.position.z = 2;
  textMesh.position.x -= 2.5;
  scene.add(textMesh);
});



// scroll
function moveonscroll() {
  const move = document.body.getBoundingClientRect().top;

  mesh_sphere.rotation.x += move * -1;
}

document.body.onscroll = moveonscroll;


function mainloop() {
  requestAnimationFrame(mainloop);
  controls.update();
  renderer.render(scene, camera);
}

mainloop();