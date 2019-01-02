import * as THREE from 'three';
import * as dat from 'dat.gui';
const OrbitControls = require('three-orbit-controls')(THREE);
var camera, scene, renderer;
var geometry, material;
var cubes = [];
var controls;
var cubeSettings;

function init() {
    //Setup scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000 );

    //Create cube
    geometry = new THREE.BoxGeometry( .8, .8, .8 );
    material = new THREE.MeshNormalMaterial();


    // add lights
    const ambientLight = new THREE.AmbientLight( 0x404040 );
    scene.add( ambientLight );

    //Create webGL renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls = new OrbitControls(camera,renderer.domElement);

    camera.position.set( 0, 5, 5 );
    controls.update();

    //Add canvas to DOM
    document.body.appendChild( renderer.domElement );


    //gui init
    const gui = new dat.GUI();
    cubeSettings = new itemSettings();
    gui.add(cubeSettings, 'xNum', 0, 100,1);
    gui.add(cubeSettings, 'yNum', 0, 100,1);
    gui.add(cubeSettings, 'density', 0, 100);
    gui.add(cubeSettings, 'createCubes')
}

var itemSettings = function() {
    this.xNum = 1;
    this.yNum = 1;
    this.density = 1;
    this.createCubes = function() {
        //clear cubes 
        for ( var i = 0, il = cubes.length; i < il; i ++ ) {
            scene.remove( cubes[ i ]);
        }
        createCubes();
    };
}

function createCubes() {
    
    var xNum = cubeSettings.xNum;
    var yNum = cubeSettings.yNum;
    var density = cubeSettings.density;
    for ( var x = 0 ;x<xNum; x++ ){    
        for ( var y = 0; y<yNum; y++ ){
            if (Math.random()*100 < density){
                var cube_ = new THREE.Mesh( geometry, material);
                
                cube_.position.set(x, y , 0);
                scene.add(cube_ );
                cubes.push(cube_);
                
            }
        }
    }
    // center camera
    //TODO figure out z pos
    controls.target.set(xNum/2 , yNum /2,0 );
    controls.update();
}
function animate() {
    //Wait for this function 
    requestAnimationFrame(animate);
    
    //rotate camera around object
    controls.update()
    //Render the scene with camera

    renderer.render(scene, camera);
}

/**
for ( var i = 0, il = spheres.length; i < il; i ++ ) {
    var sphere = spheres[ i ];
    sphere.position.x = 5 * Math.cos( timer + i );
    sphere.position.y = 5 * Math.sin( timer + i * 1.1 );
}
 */

//object rotation
//cube.rotation.x += 0.01;
//cube.rotation.y += 0.01;

//object scaling
//cube.scale.set(cubeSettings.itemScale,cubeSettings.itemScale,cubeSettings.itemScale);

init();
animate();
