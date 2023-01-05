import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// 创建场景
const scene = new THREE.Scene();
/**
 * GLTF Model
 */
let donut = null;
const gltfLoader = new GLTFLoader();
console.log("gltfLoader", gltfLoader);
const downloadUrl = new URL("../../new_year.glb", import.meta.url);

gltfLoader.load(
  downloadUrl + "/",
  (gltf) => {
    console.log("gltf", gltf);

    donut = gltf.scene;

    scene.add(donut);
  },
  (progress) => {
    console.log(progress);
  },
  (error) => {
    console.error(error);
  }
);
// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.5, 6);
// 创建渲染器
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// 创建辅助坐标轴
let axes = new THREE.AxesHelper(5);
scene.add(axes);
// 创造轨道控制器;
new OrbitControls(camera, renderer.domElement);

function render() {
  renderer.render(scene, camera);
  // 渲染下一帧的时候调用render函数
  requestAnimationFrame(render);
}
render();
