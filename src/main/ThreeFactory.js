import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class ThreeFactory {
  constructor({ url = "" } = {}) {
    this.url = url;
  }

  init() {
    this.createSence();
    this.loadGLTF();
    this.createLight();
    this.createCamera();
    this.createRender();
    this.createAxes();
    this.createControls();
    return { scene: this.scene, camera: this.camera, renderer: this.renderer };
  }

  // 创建场景
  createSence() {
    this.scene = new THREE.Scene();
  }

  // 创建相机
  createCamera() {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 6);
    this.camera = camera;
  }

  // 创建渲染器
  createRender() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xe7f2fa, 1); // 设置背景颜色
    document.body.appendChild(this.renderer.domElement);
    this.createControls();
  }

  // 创建辅助坐标轴
  createAxes() {
    let axes = new THREE.AxesHelper(5);
    this.scene.add(axes);
  }

  // 创造轨道控制器;
  createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  getDownUrl() {
    const downloadUrl = new URL(this.url, import.meta.url);
    console.log("gltfLoader", gltfLoader, this.url);
    return `${downloadUrl}/`;
  }

  // 加载GLTF模型
  loadGLTF() {
    let donut = null;
    const gltfLoader = new GLTFLoader();
    const downloadUrl = new URL(
      `../../vilhelm_13_low_res_textures.glb`,
      import.meta.url
    );
    gltfLoader.load(
      `${downloadUrl}/`,
      (gltf) => {
        console.log("gltf", gltf);

        donut = gltf.scene;

        this.scene.add(donut);
      },
      (progress) => {
        console.log(progress);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // 创建光源
  createLight() {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // 创建环境光
    this.scene.add(ambientLight); // 将环境光添加到场景

    const spotLight = new THREE.SpotLight(0xffffff); // 创建聚光灯
    spotLight.position.set(150, 150, 150);
    spotLight.castShadow = true;
    this.scene.add(spotLight);
  }
}
