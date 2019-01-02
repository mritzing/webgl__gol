import * as THREE from 'three';
import * as dat from 'dat.gui';
const OrbitControls = require('three-orbit-controls')(THREE);
var camera, scene, renderer;
var geometry, material, cube;
var controls;

function init() {
    //Setup scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000 );

    //Create cube
    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    material = new THREE.MeshNormalMaterial();
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    // add lights
    const ambientLight = new THREE.AmbientLight( 0x404040 );
    scene.add( ambientLight );

    //Create webGL renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls = new OrbitControls(camera);
    camera.position.set( 0, 5, 5 );
    controls.update();

    //Add canvas to DOM
    document.body.appendChild( renderer.domElement );
}
var xFactor = +.01;
var yFactor = -.01;
var zFactor = +.01;

function animate() {
    //Wait for this function 
    requestAnimationFrame(animate);

    //rotate Cube
    if (cube.scale.x <= 0){
        xFactor = +Math.random()*.1;
    }
    else if (cube.scale.x >= 2){
        xFactor = -Math.random()*.1;
    }
    if (cube.scale.y <= 0){
        yFactor = +Math.random()*.1;
    }
    else if (cube.scale.y >= 2){
        yFactor = -Math.random()*.1;
    }
    if (cube.scale.z <= 0){
        zFactor = +Math.random()*.1;
    }
    else if (cube.scale.z >= 2){
        zFactor = -Math.random()*.1;
    }
    cube.scale.x += xFactor;
    cube.scale.y += yFactor;
    cube.scale.z += zFactor;
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    //rotate camera around object
    controls.update()
    //Render the scene with camera
    renderer.render(scene, camera);
}

function shrink(){

}

init();
animate();
