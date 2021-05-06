/* global THREE, scene, renderer, camera */

// Light Variables
var ambientlight;
var cameralight;
var sunlight;
var orbits = new THREE.Group();

//Create a cube using variable w, h, d
function createCube(w, h, d, color) {
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(color);
    //material.wireframe = true;
    var geometry_cube = new THREE.BoxGeometry(w, h, d);
    var cube = new THREE.Mesh(geometry_cube, material);
    return cube;
}

//Create a cube using variable w, h, d
function createTexturedCube(w, h, d, textureName) {
    var material = new THREE.MeshLambertMaterial();
    var texture = new THREE.TextureLoader().load(textureName);
    material.map = texture;
    var geometry_cube = new THREE.BoxGeometry(w, h, d);
    var cube = new THREE.Mesh(geometry_cube, material);
    return cube;
}

//Create a sphere using variable radius, vertical lines, horizontal lines
function createSphere(radius, hlines, vlines, color) {
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(color);
    material.wireframe = false;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    var sphere = new THREE.Mesh(geometry_sphere, material);
    sphere.recieveShadow = true;
    sphere.castShadow = true;
    return sphere;
}

//Create a sphere using variable radius, vertical lines, horizontal lines
function createTexturedSphere(radius, hlines, vlines, planetName, textureName) {
    var material = new THREE.MeshLambertMaterial();
    var texture = new THREE.TextureLoader().load(textureName);
    //material.side = THREE.DoubleSide;
    material.map = texture;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    var sphere = new THREE.Mesh(geometry_sphere, material);
    sphere.name = planetName;
    sphere.castShadow = true;
    sphere.recieveShadow = true;
    return sphere;
}

function createSkyBox(radius, hlines, vlines, textureName) {
    var material = new THREE.MeshLambertMaterial();
    var texture = new THREE.TextureLoader().load(textureName);
    material.side = THREE.DoubleSide;
    material.map = texture;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    var sphere = new THREE.Mesh(geometry_sphere, material);
    return sphere;
}

function createOrbitLines(orbitRadius){
    var material = new THREE.LineBasicMaterial({
        color:0x999999,
        linewidth: 5
    });
    var circumference = 12 * orbitRadius;
    var alpha = 0;
    var dalpha = 2 * Math.PI / circumference;
    var xPos;
    var zPos;

    var points = [];
    for(let i = 0; i <= circumference; i++){
        alpha += dalpha;
        xPos = -orbitRadius*Math.cos(alpha);
        zPos = orbitRadius*Math.sin(alpha)
        points.push(new THREE.Vector3(xPos, 1, zPos));
    }
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var orbit = new THREE.Line( geometry, material );
    orbits.add(orbit);

    return orbit
}

var pluto = createTexturedSphere(0.465,8.184,8.184,"Pluto planet", 'images/textures/moontexture.jpg');
var plutoOrbit = createOrbitLines(3948);
var triton = createSphere(0.526,9.2,9.2,0x828f88);
var tritonOrbit = createOrbitLines(15);
var neptune = createTexturedSphere(9.7,170,170, "Neptune planet", 'images/textures/neptunetexture.jpg');
var neptuneOrbit = createOrbitLines(3005);

var ariel = createSphere(0.224,3.956,3.956,0x8e7c72);
var arielOrbit = createOrbitLines(12);
var umbriel = createSphere(0.227,3.99,3.99,0x7b7b7b);
var umbrielOrbit = createOrbitLines(15);
var oberon = createSphere(0.296,5.169,5.169,0xc0a99f);
var oberonOrbit = createOrbitLines(25);
var titania = createSphere(0.306,5.39,5.39,0xd2c6b9);
var titaniaOrbit = createOrbitLines(20);
var uranus = createTexturedSphere(10,176,176,"Uranus planet", 'images/textures/uranustexture.jpg');
var uranusOrbit = createOrbitLines(1920);

var dione = createSphere(0.216,3.8,3.5,0x7d7d7d);
var dioneOrbit = createOrbitLines(30.4);
var iapetus = createSphere(0.284,4.99,4.99,0x493729);
var iapetusOrbit = createOrbitLines(145);
var rhea = createSphere(0.297,5.227,5.227,0xb8b8b8);
var rheaOrbit = createOrbitLines(41);
var titan = createSphere(1.07,17.464,17.464,0xd7c461);
var titanOrbit = createOrbitLines(50);
var saturn = createTexturedSphere(22.74,400,400,"Saturn planet", 'images/textures/saturntexture.jpg');
var saturnOrbit = createOrbitLines(950)

var callisto = createSphere(0.945,16.6,16.6,0x7c6d60);
var callistoOrbit = createOrbitLines(70);
var ganymede = createSphere(1.03,18.16,18.16,0xb4b1b2);
var ganymedeOrbit = createOrbitLines(50);
var europa = createSphere(0.61,10.77,10.77,0xac966f);
var europaOrbit = createOrbitLines(40);
var io = createSphere(0.7,12.57,12.57,0xcabf55);
var ioOrbit = createOrbitLines(30);
var jupiter = createTexturedSphere(27.2,482,482,"Jupiter planet", 'images/textures/jupitertexture.jpg');
var jupiterOrbit = createOrbitLines(520.3);

var deimos = createSphere(0.002,0.035,0.035,0x2596be);
var deimosOrbit = createOrbitLines(5);
var phobos = createSphere(0.004,0.07,0.07,0x2596be);
var phobosOrbit = createOrbitLines(3);
var mars = createTexturedSphere(1.33,23.43,23.43,"Mars planet",'images/textures/marstexture.jpg');
var marsOrbit = createOrbitLines(152.4);

var earth = createTexturedSphere(2.5,44,44,"Earth planet",'images/textures/earthtexture.jpg');
var earthOrbit = createOrbitLines(100);
var moon = createTexturedSphere(0.675,11.88,11.88,"Moon planet",'images/textures/moontexture.jpg');
var moonOrbit = createOrbitLines(5);

var venus = createTexturedSphere(2.5,44,44,"Venus planet",'images/textures/venustexture.jpg');
var venusOrbit = createOrbitLines(72);

var mercury = createTexturedSphere(1,32,32,"Mercury planet",'images/textures/mercurytexture.jpg');
var mercuryOrbit = createOrbitLines(38);

var sun = createTexturedSphere(30,55,55,"Sun planet",'images/textures/suntexture.jpg');

var skybox = createSkyBox(100000, 55, 55, 'images/textures/milkywaytexture.jpeg');

//asteroids
var n = 300;
var cubes = [];
var asteroids = new THREE.Group();

//saturn's ring
var r = 40;
var ring = [];
var rings = new THREE.Group();

function createAsteroids(){
    
    for(let i=0; i < n; i++) {
        var rot2 = new THREE.Matrix4();
        var sca = new THREE.Matrix4();
        var rot = new THREE.Matrix4();
        var tra = new THREE.Matrix4();
        var combined = new THREE.Matrix4();

        sca.makeScale(0.5, 3, 1.5);
        rot2.makeRotationZ(i * (Math.PI/n));
        tra.makeTranslation(270, ((Math.random()*15)-(Math.random()*15)), (Math.random()*200));
        rot.makeRotationY(i * (2*Math.PI/n));

        combined.multiply(rot);
        combined.multiply(tra);
        combined.multiply(rot2);
        combined.multiply(sca);
        
        cubes[i] = createSphere(1, 3, 3, 0x594433)
        cubes[i].applyMatrix4(combined);
        asteroids.add(cubes[i]);
    }
}

function createsaturnring() {
    
    for(let b=0; b < r; b++) {
        var rot2 = new THREE.Matrix4();
        var sca = new THREE.Matrix4();
        var rot = new THREE.Matrix4();
        var tra = new THREE.Matrix4();
        var combined = new THREE.Matrix4();

        sca.makeScale(2, 0.1, 4);
        //rot2.makeRotationX(b * (Math.PI/r));
        tra.makeTranslation(30, 0, 0);
        rot.makeRotationY(b * (2*Math.PI/r));

        combined.multiply(rot);
        combined.multiply(tra);
        combined.multiply(rot2);
        combined.multiply(sca);
        
        //ring[b] = createCube(2, 1, 1.25, 0xD8AE6D);
        ring[b] = createTexturedCube(2, 1, 1.25, 'images/textures/saturnringtexture.png');
        ring[b].applyMatrix4(combined);
        rings.add(ring[b]);
    }
}

// Create sunlight within the sun (does not illuminate sun), create camera light and ambient light
const spotlightgroup = new THREE.Group();
function createLight() {
    sunlight = new THREE.PointLight(new THREE.Color(1, 1, 1), 1, 0, 2);
    sunlight.position.set(0, 1, 0);
    sunlight.castShadow = true;
    scene.add(sunlight);

    cameralight = new THREE.PointLight((1, 1, 1), 0.5);
    camera.add(cameralight);
    
    ambientlight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.1);
    scene.add(ambientlight);

    //add a series of spotlights directed at the sun
    var ypos = 40;
    var displace = 50;
    //top
    addSpotlight(sun, 0, ypos+20, 0);
    //upper
    addSpotlight(sun, displace, ypos, 0);
    addSpotlight(sun, -displace, ypos, 0);
    addSpotlight(sun, 0, ypos, displace);
    addSpotlight(sun, 0, ypos, -displace);
    //middle
    addSpotlight(sun, displace, 0, displace);
    addSpotlight(sun, -displace, 0, displace);
    addSpotlight(sun, -displace, 0, -displace);
    addSpotlight(sun, displace, 0, -displace);
    //lower
    addSpotlight(sun, displace, -ypos, 0);
    addSpotlight(sun, -displace, -ypos, 0);
    addSpotlight(sun, 0, -ypos, displace);
    addSpotlight(sun, 0, -ypos, -displace);
    //bottom
    addSpotlight(sun, 0, -ypos-20, 0);
}

function addSpotlight(object, xpos, ypos, zpos) {
    var spotlight = new THREE.SpotLight(new THREE.Color(1,1,1), 0.8);
    spotlight.position.x = xpos;
    spotlight.position.y = ypos;
    spotlight.position.z = zpos;
    spotlight.angle = Math.PI/3;
    spotlight.penumbra = 0.3;
    spotlight.castShadow = false;
    spotlight.target = object;
    spotlight.distance = 100;
    spotlightgroup.add(spotlight);
    //helpers used to show the wireframe of the spotlight's light cone:
    // var helper = new THREE.SpotLightHelper(spotlight);
    // spotlightgroup.add(helper);
}

function addShapes() {
    scene.add(pluto);
    scene.add(triton);
    scene.add(neptune);
    scene.add(ariel);
    scene.add(umbriel);
    scene.add(oberon);
    scene.add(titania);
    scene.add(uranus);
    scene.add(dione);
    scene.add(iapetus);
    scene.add(rhea);
    scene.add(titan);
    scene.add(rings);
    scene.add(saturn);
    scene.add(callisto);
    scene.add(ganymede);
    scene.add(europa);
    scene.add(io);
    scene.add(jupiter);
    scene.add(asteroids);
    scene.add(deimos);
    scene.add(phobos);
    scene.add(mars);
    scene.add(earth);
    scene.add(moon);
    scene.add(venus);
    scene.add(mercury);
    scene.add(sun);
    scene.add(skybox);
    scene.add(spotlightgroup);
    scene.add(orbits);
}