import * as THREE from "three";
import loadTexture from "../utils/textureLoader";

export default function ThreeEntryPoint(sceneRef) {
  let scene, camera, renderer, cone, tx, ice;

  const init = function() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("red");

    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.x = 5;
    camera.position.y = 6;
    camera.position.z = 5;
    camera.lookAt(scene.position);
    var light = new THREE.PointLight( 0xff0000, 1, 100 );
    light.position.set( 50, 50, 50 );
    scene.add( light );

    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    sceneRef.appendChild(renderer.domElement);
    // let controls = new OrbitControls(camera, sceneRef);
    // controls.target.set(1, 2, 3);
    // controls.rotateSpeed = 0.9;
    // controls.update();

    const geometry = new THREE.ConeGeometry(1, 4);
    var image = new Image()
    image.src = require('../textures/b64cone2.json').img
    var tx = new THREE.Texture();
    tx.image = image
    image.onload = function(){
      tx.needsUpdate = true;
    }
    //tx.repeat.set(1, 1);
    //tx.wrapS = tx.wrapT = THREE.MirroredRepeatWrapping;
    var material = new THREE.MeshBasicMaterial({map:tx});
    cone = new THREE.Mesh(geometry, material);
    cone.rotation.setFromVector3(new THREE.Vector3( 10, 10, 7));
    scene.add(cone);


    var icemat = new THREE.MeshNormalMaterial();
    //icemat.position.set(THREE.Vector3(0,45,25))
    const icecream_vanilla = new THREE.SphereGeometry(1.5)
    ice = new THREE.Mesh(icecream_vanilla, icemat);
    //ice.position.set(THREE.Vector3(0,5,5))
    ice.position.set(-1.5,2.4,0)
    scene.add(ice);
  };

  const animate = function() {
    requestAnimationFrame(animate);
    cone.rotation.z += 0.01;
    ice.rotation.z += 0.01;
    renderer.render(scene, camera);
  };

  const onWindowResize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("resize", onWindowResize, false);
  init();
  animate();
}
