import ThreeFactory from "./ThreeFactory";
const threeFactory = new ThreeFactory();
const { scene, camera, renderer } = threeFactory.init();
function render() {
  renderer.render(scene, camera);
  // 渲染下一帧的时候调用render函数
  requestAnimationFrame(render);
}
render();
