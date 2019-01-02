import * as THREE from 'three';
import * as dat from 'dat.gui';
const OrbitControls = require('three-orbit-controls')(THREE);
var camera, scene, renderer;
var geometry, material, cube;
var controls;
var cubeSettings;

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
    controls = new OrbitControls(camera,renderer.domElement);
    //TODO restrict controls to renderer DOM
    camera.position.set( 0, 5, 5 );
    controls.update();

    //Add canvas to DOM
    document.body.appendChild( renderer.domElement );


    //gui init
    const gui = new dat.GUI();
    cubeSettings = new itemSettings();
    gui.add(cubeSettings, 'itemScale', -5, 5);
    
}

var itemSettings = function() {
    this.itemScale = 1;
}
function animate() {
    //Wait for this function 
    requestAnimationFrame(animate);
    
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    cube.scale.set(cubeSettings.itemScale,cubeSettings.itemScale,cubeSettings.itemScale);
    //rotate camera around object
    controls.update()
    //Render the scene with camera
    renderer.render(scene, camera);
}

init();
animate();
