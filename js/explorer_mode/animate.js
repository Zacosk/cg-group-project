/* global THREE, cube, scene, camera, renderer */
/*
//Animate a cube to rotate around: x, and y axis
function animate_cube() {
    
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.04;
    cube.position.z = 1;
   
    renderer.render(scene, camera);
    requestAnimationFrame(animate_cube);
}
var clock = new THREE.Clock();
var time = 0;
var delta = 0;
//Animate a sphere to rotate around x axis and transform along y, z axis
function animate_sphere() {
    
    delta = clock.getDelta();
    time += delta;
    sphere.rotation.x = time*4;
    sphere.position.y = 0.5*Math.abs(Math.sin(time*3))*2;
    sphere.position.z = -1+Math.cos(time)*4;
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate_sphere);
}
*/


const speed = 0.005;

// x = d*cos(angle)
// z = d*sin(angle)

const scale = 1;
const d = 100;
var alpha = 0;
var dalpha = Math.PI/10000;
var time = 1;
var planetrotationspeed = 1;
var resizeScale = 1;

function renderScene(){
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(renderScene);
    //renderer.render(sceneHUD, cameraHUD);
}

function updateTime() {
    dalpha = Math.PI/(10000/time);
    alpha += dalpha;
    requestAnimationFrame(updateTime);
}

function animate_sun(){
    sun.rotation.y += (speed/2)*time;
    sun.position.y = 1;
    requestAnimationFrame(animate_sun);
}

function animate_saturnring() {
    rings.rotation.z = 0.47;
    rings.rotation.y += (speed*0.425)*time;
    rings.position.y = saturn.position.y;
    rings.position.x = saturn.position.x;
    rings.position.z = saturn.position.z;
    controls.update();
    requestAnimationFrame(animate_saturnring);
}

function animate_object(object, objectModel) {

    var barycenter = objectModel.barycenter().position;

    object.rotation.y += (speed*objectModel.rotaionSpeed)*time;
    object.position.x = (((scale*objectModel.orbitRadius)*Math.cos(alpha/objectModel.orbitSpeed)) + barycenter.x) ;
    object.position.z = (((-scale*objectModel.orbitRadius)*Math.sin(alpha/objectModel.orbitSpeed)) + barycenter.z) ;
    object.position.y = (((scale*objectModel.orbitTilt)*Math.sin(alpha/objectModel.orbitSpeed)*100) ) + 1 ;
}

function animate_orbit(orbit, orbitModel) {
    orbit.position.z = orbitModel.position.z;
    orbit.position.x = orbitModel.position.x ;
}

function animate_system(){
    for (var i = 0; i < planetsList.length; i++){
        animate_object(planetsList[i], planetModelsList[i]);
    }
    for (var i = 0; i < moonList.length; i++){
        animate_object(moonList[i], moonModelsList[i]);
    }
    for (var i = 0; i < orbitsBarycenterList.length; i++){
        animate_orbit(orbits.children[i], orbitsBarycenterList[i]);
    }
    requestAnimationFrame(animate_system);
}

function rotate(object) {
    object.rotation.x += (Math.random()/50)*time;
    object.rotation.z += (Math.random()/50)*time;
    object.rotation.y += (Math.random()/50)*time;
}

function animate_Asteroids() {
    //Rotate all cubes
    cubes.forEach(rotate);
    //Rotate the group around the Y axis
    asteroids.rotation.y += 0.0008*(time/2);
    requestAnimationFrame(animate_Asteroids);
}

// reset the camera if esc is pressed
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 27) {
        resetCamera();
    }
    if (keyCode == 90) {
    // test code
    console.log(ghostPlanetList.length);
    }
    if (keyCode == 88) {
        scene.add(sun);
    }
}

var spd = 0.01;
var time = 1;
var lookspeed = 0.01;

function buildGui() {
    gui = new dat.GUI();
    var params = {
        shuttle_speed: spd,
        look_speed: lookspeed,
        Time: time
    };
    gui.add(params, 'shuttle_speed', 1, 10).onChange(function(val){
        spd = val;
    });
    gui.add(params, 'look_speed', 0.01, 0.5).onChange(function(val){
        lookspeed = val;
    });
    gui.add(params, 'Time', 1, 50).onChange(function(val){
        time = val;
    });
}

//attempt at moving camera based on model:
/*
function setShuttlePos() {
    shuttle.position.y = 50;
}

function followShuttle() {
    var pos = shuttle.position;
    camera.position.set(pos.x-0.4, pos.y+ 0.2, pos.z)
    controls.target.set(pos.x+0.2, pos.y, pos.z);
    controls.update();
    requestAnimationFrame(followShuttle);
}

var forward = false;
var backward = false;
var left = false;
var right = false;

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    // W
    if (keyCode == 87) {
        forward = true;
    }
    // S
    if (keyCode == 83) {
        backward = true;
    }
    // A
    if (keyCode == 65) {
        left = true;
    }
    // D
    if (keyCode == 68) {
        right = true;
    }
}

function onDocumentKeyUp(event) {
    var keyCode = event.which;
    // W
    if (keyCode == 87) {
        forward = false;
    }
    // S
    if (keyCode == 83) {
        backward = false;
    }
    // A
    if (keyCode == 65) {
        left = false;
    }
    // D
    if (keyCode == 68) {
        right = false;
    }
}

function moveShuttle() {
    if (forward) {shuttle.position.x+=1;}
    if (backward) {}
    if (left) {}
    if (right) {}
    requestAnimationFrame(moveShuttle);
} */

var clock = new THREE.Clock();
var started = false;

function updatePositionForCamera(camera) {
    // fixed distance from camera to the object
    var dist = -10
    var cwd = new THREE.Vector3();
    
    camera.getWorldDirection(cwd);

    cwd.multiplyScalar(dist);
    cwd.add(camera.position);

    shuttle.position.set(cwd.x, cwd.y, cwd.z);
    shuttle.setRotationFromQuaternion(camera.quaternion);
}


//Code to animate shuttle and take user input for shuttle

function animate_shuttle() {
    //Start the camera at earth's position
    if (!started) {
        camera.position.x = earth.position.x;
        camera.position.y = earth.position.y;
        camera.position.z = earth.position.z;
        started = true;
    }
    //Force camera to follow the shuttle

    //Render the camera
    var delta = clock.getDelta();
    controls.update(delta);
    controls.lookSpeed = lookspeed;
    controls.movementSpeed = spd;
    requestAnimationFrame(animate_shuttle);
}