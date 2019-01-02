import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE)


//Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Create cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


//Create webGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
const controls = new OrbitControls(camera);
camera.position.set( 0, 5, 5 );
controls.update();

//Add canvas to DOM
document.body.appendChild( renderer.domElement );

function animate() {
    //Wait for this function 
    requestAnimationFrame(animate);

    //rotate Cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    //rotate camera around object
    controls.update()
    //Render the scene with camera
    renderer.render(scene, camera);
}

animate();