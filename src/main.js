import * as THREE from "three"
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


//loading a texture using textureLoader
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/matcaps/1.png');


//defining a  resize function 
window.addEventListener("resize", () => {
 
  //update camer aspect ratio
  camera.aspect(window.innerWidth / window.innerHeight);
  camera.updateProjectionMatrix();

  //update the renderer size 
  renderer.setSize(window.innerWidth, window.innerHeight)

})  


//instanciating a font Loader
const fontLoader = new FontLoader();

//loading a font using font loader
fontLoader.load(
  '../static/fonts/helvetiker_bold.typeface.json',
  (font) => {
    const textGeometry = new TextGeometry(
      'FriedBotStudio',
      {
        font: font,
        size: 100, // Reduced size
        height: 0.02, // Reduced depth
        curveSegments: 20,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0.5,
        bevelOffset: 0,
        bevelSegments: 5
      }
    );

    textGeometry.computeBoundingBox();
    textGeometry.center(); // Center the text

    const material = new THREE.MeshMatcapMaterial({ matcap:matcapTexture });
    const text = new THREE.Mesh(textGeometry, material);
    

//text.position.x=0;
//text.position.y=0;
//text.position.z=0;
    //text.scale.set(0.5, 0.5, 0.5); // Additional scaling if needed

    scene.add(text);
  }
);




//getting canvas element to render the scene
const canvas = document.querySelector('canvas');


//create a scene
const scene = new THREE.Scene();


//axes helper
const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);


//create a cube 
//const cube = new THREE.Mesh(
//  new THREE.BoxGeometry(1,1,1),
//  new THREE.MeshBasicMaterial({color:0xffffff})
//);

//create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight , 0.1 , 5000 );
camera.position.z = 100;

//adding camera and cube to the scene
scene.add(camera);


//creating a renderer
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(window.innerWidth , window.innerHeight );
renderer.render(scene, camera);


//adding OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


function animate() {
  renderer.setAnimationLoop(animate);
  //cube.rotation.x += 0.005;
  //cube.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();



//adding donuts to the scene
for(let i=0 ; i<100 ; i++){

  //crate a donut using its geometry and material
  const donut = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 20, 45),
    new THREE.MeshMatcapMaterial({matcap:matcapTexture})
  )
 
  //now define its position
  donut.position.x = (Math.random() - 0.5 ) * 2000;
  donut.position.y = (Math.random() - 0.5 ) * 2000;
  donut.position.z = (Math.random() - 0.5 ) * 2000;

  //now define its rotation
  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;

  //now define its scale
  //const scale = Math.random();
  donut.scale.set(100,100,100);
  
  //now add it to the scene
  scene.add(donut);

}
