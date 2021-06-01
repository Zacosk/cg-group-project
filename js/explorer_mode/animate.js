const speed = 0.005;

// x = d*cos(angle)
// z = d*sin(angle)

const d = 100;
var alpha = 0;
var dalpha = Math.PI/10000;

function renderScene(){
    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
    //renderer.render(sceneHUD, cameraHUD);
}

function animate_sun(){
    sun.rotation.y += speed/2;
    sun.position.y = 1;
    requestAnimationFrame(animate_sun);
}

function animate_mercury(){
    alpha += dalpha;

    mercury.rotation.y += speed/58.6;
    mercury.position.y = 1;
    mercury.position.x = (-d*0.38)*Math.cos(alpha/0.24);
    mercury.position.z = (d*0.38)*Math.sin(alpha/0.24);
    requestAnimationFrame(animate_mercury);
}

function animate_venus(){
    venus.rotation += speed/243;
    venus.position.y = 1;
    venus.position.x = (-d*0.72)*Math.cos(alpha/0.616);
    venus.position.z = (d*0.72)*Math.sin(alpha/0.616);
    requestAnimationFrame(animate_venus);
}

function animate_earth(){
    earth.rotation.y += speed;
    earth.position.y = 1;
    earth.position.x = -d*Math.cos(alpha);
    earth.position.z = d*Math.sin(alpha);
    requestAnimationFrame(animate_earth);
}

function animate_moon(){
    moon.rotation.y += speed;
    moon.position.y = earth.position.y;
    moon.position.x = earth.position.x+5*Math.sin(alpha*20);
    moon.position.z = earth.position.z-5*Math.cos(alpha*20);
    moonOrbit.position.x = earth.position.x;
    moonOrbit.position.z = earth.position.z;
    requestAnimationFrame(animate_moon);
}

function animate_mars() {
    mars.rotation.y += speed*1.03;
    mars.position.y = 1;
    mars.position.x = (-d*1.524)*Math.cos(alpha/1.9);
    mars.position.z= (d*1.524)*Math.sin(alpha/1.9);
    requestAnimationFrame(animate_mars);
}

function animate_phobos(){
    phobos.position.y = mars.position.y;
    phobos.position.x = mars.position.x+3*Math.sin(alpha*43.2);
    phobos.position.z = mars.position.z-3*Math.cos(alpha*43.2);
    phobosOrbit.position.x = mars.position.x;
    phobosOrbit.position.z = mars.position.z;
    requestAnimationFrame(animate_phobos);
}

function animate_deimos(){
    deimos.position.y = mars.position.y;
    deimos.position.x = mars.position.x+5*Math.sin(alpha*3.68);
    deimos.position.z = mars.position.z-5*Math.cos(alpha*3.68);
    deimosOrbit.position.x = mars.position.x;
    deimosOrbit.position.z = mars.position.z;
    requestAnimationFrame(animate_deimos);
}

function animate_jupiter(){
    jupiter.rotation.y += speed*0.41;
    jupiter.position.y = 1;
    jupiter.position.x = (d*5.203)*Math.sin(alpha/11.862);
    jupiter.position.z = (d*5.203)*Math.cos(alpha/11.862);
    requestAnimationFrame(animate_jupiter);
}

function animate_io(){
    io.position.y = jupiter.position.y;
    io.position.x = jupiter.position.x+30*Math.sin(alpha*9.4);
    io.position.z = jupiter.position.z-30*Math.cos(alpha*9.4);
    ioOrbit.position.x = jupiter.position.x;
    ioOrbit.position.z = jupiter.position.z;
    requestAnimationFrame(animate_io);
}

function animate_europa() {
    europa.position.y = jupiter.position.y;
    europa.position.x = jupiter.position.x+40*Math.sin(alpha*4);
    europa.position.z = jupiter.position.z-40*Math.cos(alpha*4);
    europaOrbit.position.x = jupiter.position.x;
    europaOrbit.position.z = jupiter.position.z;
    requestAnimationFrame(animate_europa);
}

function animate_ganymede() {
    ganymede.position.y = jupiter.position.y;
    ganymede.position.x = jupiter.position.x+50*Math.sin(alpha*2);
    ganymede.position.z = jupiter.position.z-50*Math.cos(alpha*2);
    ganymedeOrbit.position.x = jupiter.position.x;
    ganymedeOrbit.position.z = jupiter.position.z;
    requestAnimationFrame(animate_ganymede);
}

function animate_callisto() {
    callisto.position.y = jupiter.position.y;
    callisto.position.x = jupiter.position.x+70*Math.sin(alpha);
    callisto.position.z = jupiter.position.z-70*Math.cos(alpha);
    callistoOrbit.position.x = jupiter.position.x;
    callistoOrbit.position.z = jupiter.position.z;
    requestAnimationFrame(animate_callisto);
}

function rotate(object) {
    object.rotation.x += Math.random()/50;
    object.rotation.z += Math.random()/50;
    object.rotation.y += Math.random()/50;
}

function animate_Asteroids() {
    //Rotate all cubes
    cubes.forEach(rotate);
    //Rotate the group around the Y axis
    asteroids.rotation.y += 0.0008;
    requestAnimationFrame(animate_Asteroids);
}

function animate_saturn() {
    saturn.rotation.y += speed*0.425;
    saturn.position.y = 1;
    saturn.position.x = (d*9.5)*Math.sin(alpha/29.456);
    saturn.position.z = (d*9.5)*Math.cos(alpha/26.456);
    requestAnimationFrame(animate_saturn);
}

function animate_saturnring() {
    rings.rotation.z = 0.47;
    rings.rotation.y += speed*0.425;
    rings.position.y = saturn.position.y;
    rings.position.x = saturn.position.x;
    rings.position.z = saturn.position.z;
    requestAnimationFrame(animate_saturnring);
}

function animate_titan() {
    titan.position.y = saturn.position.y;
    titan.position.x = saturn.position.x+50*Math.sin(alpha/0.6);
    titan.position.z = saturn.position.z-50*Math.cos(alpha/0.6);
    titanOrbit.position.x = saturn.position.x;
    titanOrbit.position.z = saturn.position.z;
    requestAnimationFrame(animate_titan);
}

function animate_rhea() {
    rhea.position.y = saturn.position.y;
    rhea.position.x = saturn.position.x+41*Math.sin(alpha/0.2);
    rhea.position.z = saturn.position.z-41*Math.cos(alpha/0.2);    
    rheaOrbit.position.x = saturn.position.x;
    rheaOrbit.position.z = saturn.position.z;
    requestAnimationFrame(animate_rhea);
}

function animate_iapetus() {
    iapetus.position.y = saturn.position.y;
    iapetus.position.x = saturn.position.x+145*Math.sin(alpha/2.9);
    iapetus.position.z = saturn.position.z-145*Math.cos(alpha/2.9);    
    iapetusOrbit.position.x = saturn.position.x;
    iapetusOrbit.position.z = saturn.position.z;
    requestAnimationFrame(animate_iapetus);
}

function animate_dione() {
    dione.position.y = saturn.position.y;
    dione.position.x = saturn.position.x+30.4*Math.sin(alpha/0.1);
    dione.position.z = saturn.position.z-30.4*Math.cos(alpha/0.1);    
    dioneOrbit.position.x = saturn.position.x;
    dioneOrbit.position.z = saturn.position.z;
    requestAnimationFrame(animate_dione);
}

function animate_uranus() {
    uranus.rotation.y -= speed*0.718;
    uranus.position.y = 1;
    uranus.position.x = (d*19.2)*Math.sin(alpha/83.7);
    uranus.position.z = (d*19.2)*Math.cos(alpha/83.7);
    requestAnimationFrame(animate_uranus);
}

function animate_titania() {
    titania.position.y = uranus.position.y;
    titania.position.x = uranus.position.x+20*Math.sin(alpha*2.5);
    titania.position.z = uranus.position.z-20*Math.cos(alpha*2.5);    
    titaniaOrbit.position.x = uranus.position.x;
    titaniaOrbit.position.z = uranus.position.z;
    requestAnimationFrame(animate_titania);
}

function animate_oberon() {
    oberon.position.y = uranus.position.y;
    oberon.position.x = uranus.position.x+25*Math.sin(alpha*4.1);
    oberon.position.z = uranus.position.z-25*Math.cos(alpha*4.1);    
    oberonOrbit.position.x = uranus.position.x;
    oberonOrbit.position.z = uranus.position.z;
    requestAnimationFrame(animate_oberon);
}

function animate_umbriel() {
    umbriel.position.y = uranus.position.y;
    umbriel.position.x = uranus.position.x+15*Math.sin(alpha*13.4);
    umbriel.position.z = uranus.position.z-15*Math.cos(alpha*13.4);    
    umbrielOrbit.position.x = uranus.position.x;
    umbrielOrbit.position.z = uranus.position.z;
    requestAnimationFrame(animate_umbriel);
}

function animate_ariel() {
    ariel.position.y = uranus.position.y;
    ariel.position.x = uranus.position.x+12*Math.sin(alpha*8.7);
    ariel.position.z = uranus.position.z-12*Math.cos(alpha*8.7);    
    arielOrbit.position.x = uranus.position.x;
    arielOrbit.position.z = uranus.position.z;
    requestAnimationFrame(animate_ariel);
}

function animate_neptune() {
    neptune.rotation.y += speed*0.673;
    neptune.position.y = 1;
    neptune.position.x = (d*30.05)*Math.sin(alpha/163.7);
    neptune.position.z = (d*30.05)*Math.cos(alpha/163.7);
    requestAnimationFrame(animate_neptune);
}

function animate_triton() {
    triton.position.y = neptune.position.y;
    triton.position.x = neptune.position.x+15*Math.sin(alpha*-5.876);
    triton.position.z = neptune.position.z-15*Math.cos(alpha*-5.876);    
    tritonOrbit.position.x = neptune.position.x;
    tritonOrbit.position.z = neptune.position.z;
    requestAnimationFrame(animate_triton);
}

function animate_pluto() {
    pluto.rotation.y += speed*0.673;
    pluto.position.y = 1;
    pluto.position.x = (d*39.48)*Math.sin(alpha/247.9);
    pluto.position.z = (d*39.48)*Math.cos(alpha/247.9);
    requestAnimationFrame(animate_pluto);
}

// go back a page if the shift button is pressed
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    // shift key
    if (keyCode == 16) {
        console.log("detected");
        window.location.href = "index.html";
    }
}

// Build the GUI
var spd = 4.01;
var time = 1;
var lookspeed = 0.015;

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
    /*
    gui.add(params, 'Time', 1, 50).onChange(function(val){
        time = val;
    }); */
}

var clock = new THREE.Clock();
var started = false;

function updatePositionForCamera(camera) {
    // fixed distance from camera to the object
    var dist = -10;
    var cwd = new THREE.Vector3();
    
    camera.getWorldDirection(cwd);
    
    cwd.multiplyScalar(dist);
    cwd.add(camera.position);
    
    shuttle.position.set(cwd.x, cwd.y, cwd.z);
    shuttle.setRotationFromQuaternion(camera.quaternion);

    console.log("shuttle: ");
    console.log(shuttle.position.z);
    console.log("cwd: " + cwd.z);
}

//Code to animate shuttle and take user input for shuttle
function animate_shuttle(){
    //Start the camera at earth's position
    if(!started){
        camera.position.x = earth.position.x+50;
        camera.position.y = earth.position.y+5;
        camera.position.z = earth.position.z+100;
        started = true;
    }
    //Force camera to follow the shuttle
    updatePositionForCamera(camera);
    
    //Render the camera
    var delta = clock.getDelta();
    controls.update(delta);
    controls.lookSpeed = lookspeed;
    controls.movementSpeed = spd;

    var output = "Move Speed: " + spd + ", Look Speed: " + lookspeed;

    function changeMoveSpeed(event){
        spd = event.deltaY;
    }

    window.onload = function(){
        document.getElementById("output").innerHTML = output;
    }

    requestAnimationFrame(animate_shuttle);
}
