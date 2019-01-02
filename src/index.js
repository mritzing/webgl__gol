import * as THREE from 'three';
import * as dat from 'dat.gui';
const OrbitControls = require('three-orbit-controls')(THREE);
var camera, scene, renderer;
var geometry, material;
var cubes = [];
var controls;
var cubeSettings;
let boolGrid;
let itemGrid;
var curCols;
var curRows;
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
    gui.add(cubeSettings, 'xNum', 0, 500,1);
    gui.add(cubeSettings, 'yNum', 0, 500,1);
    gui.add(cubeSettings, 'density', 0, 10);
    gui.add(cubeSettings, 'createCubes')
}

var itemSettings = function() {
    this.xNum = 100;
    this.yNum = 100;
    this.density = 2;
    this.createCubes = function() {
        //clear cubes 
        for ( var i = 0, il = cubes.length; i < il; i ++ ) {
            scene.remove( cubes[ i ]);
        }
        itemGrid = make2DArray();
        curCols = this.yNum; 
        curRows = this.xNum;
        controls.target.set(this.xNum/2 , this.yNum /2,50);
        controls.update();
    };
}

function make2DArray() {
    var rows = cubeSettings.xNum;
    var cols = cubeSettings.yNum;
    var density = cubeSettings.density;
    let boolArray = new Array(cols);
    let arr = new Array(cols);
    for (let i = 0; i < arr.length;i++ ) {
        arr[i] = new Array(rows);
        boolArray[i] = new Array(rows);
    }
    for (let i = 0; i < cols; i ++) {
        for (let j = 0; j < rows; j++){
            if( Math.random()*100 <density){
                var cube_ = new THREE.Mesh( geometry, material);
                cube_.position.set(i, j , 0);
                scene.add(cube_ );
                cubes.push(cube_);
                arr[i][j]=cube_;
                boolArray[i][j]=1;
            }
            else{
                boolArray[i][j] = 0;
            }
        }
    }
    boolGrid = boolArray;
    
    return arr;
}



function animate() {
    //Wait for this function 
    requestAnimationFrame(animate);

    
    nextFrame();
    
    //rotate camera around object
    controls.update();
    //Render the scene with camera
    
    renderer.render(scene, camera);
}

/**
 * Game of life rules
 */
function nextFrame() {
    // computate next grid

    let nGrid = new Array(curCols);
    for (let i = 0; i < nGrid.length;i++ ) {
        nGrid[i] = new Array(curRows);
    }
    
    for (let i = 0; i < curCols; i ++) {
        for (let j = 0; j < curRows; j++){
            //count live neighbors
            //edge cases
            

                let neighbors = countNeighbors(i, j);   
                //console.log(neighbors);
                let state = boolGrid[i][j];
                //console.log(state);
                //console.log(neighbors);
                //console.log(state);
                if (state == 0 && neighbors ==3){ 
                    nGrid[i][j] = 1;
                    var cube_ = new THREE.Mesh( geometry, material);
                    cube_.position.set(i, j , 0);
                    scene.add(cube_ );
                    cubes.push(cube_);
                    itemGrid[i][j] = cube_;
                   // console.log("adding")
                }
                else if (state == 1 && ( neighbors < 1 || neighbors > 3)) {
                    nGrid[i][j] = 0;
                   // console.log("removing")
                    scene.remove(itemGrid[i][j]);
                    itemGrid[i][j] = null;
                }
                else {
                    nGrid[i][j] = state;
                
                }
        }   
    }
    boolGrid= nGrid;
}


function countNeighbors(x ,y) {

    let sum = -boolGrid[x][y];
    for (let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            let col = (x + i + curCols) %curCols;
            let row = (y + j + curRows) % curRows;
            sum += boolGrid[col][row];
        }
    }
    return sum;
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
itemGrid = make2DArray();
animate();
