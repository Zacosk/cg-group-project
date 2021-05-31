/* global THREE, scene, renderer, camera */

// Light Variables
var ambientlight;
var cameralight;
var sunlight;
var orbits = new THREE.Group();
var astralObjects = new THREE.Group();
var orbitsBarycenterList = [], planetsList = [], planetModelsList = [], moonList = [], moonModelsList = [], ghostPlanetList = [], ghostPlanetModelsList = [];

var mercuryorbitradius = 0.38;
var venusorbitradius = 0.72;
var earthorbitradius = 1;
var marsorbitradius = 1.524;
var jupiterorbitradius = 5.203;
var saturnorbitradius = 9.5;
var uranusorbitradius = 19.2;
var neptuneorbitradius = 30.05;
var plutoorbitradius = 39.48;



//Add 'ghost' planets with shader
function buildShader(object) {
    //Define the Shader geometry
    var geometry = new THREE.SphereBufferGeometry(object.radius, object.hlines, object.vlines);
    // Define the number of vertices in the Shader geometry
    var numVertices = geometry.attributes.position.count;
    // Create a vertex array
    var alphas = new Float32Array(numVertices*1);
    // Radomly populate the vertex array
    for (var i = 0; i < numVertices; i++) {
        alphas[i] = Math.random();
    }
    // Assign the vertex array as attribute to the vertex geometry
    geometry.addAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    // Define the uniforms parameter to set the color value of the Shader
    var color = new THREE.Color(0x999999);
    //color.setHex(Math.random()* 0xffffff);
    var uniforms = {
        color: {
            value: color
        },
    }
    // Define the Shader material from (color,vertex,fragment) objects
    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById(vertex).textContent,
        fragmentShader: document.getElementById(fragment).textContent,
        transparent: true
    });
    // Create a cloud of point using the geometry and Shader material
    var ghostSphere = new THREE.Points(geometry, shaderMaterial);

    ghostPlanetList.push(ghostSphere);
    return ghostSphere;
}

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

//old function
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

//old function
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


function generateMoon(object) {
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(object.colour);
    material.wireframe = false;
    var geometry_sphere = new THREE.SphereGeometry(object.radius, object.hLine, object.vLine);
    var sphere = new THREE.Mesh(geometry_sphere, material);
    sphere.recieveShadow = true;
    sphere.castShadow = true;
    astralObjects.add(sphere);
    moonList.push(sphere);
    return sphere;
}
function generateTexturedPlanet(object) {
    var material = new THREE.MeshLambertMaterial();
    var texture = new THREE.TextureLoader().load(object.texture);
    //material.side = THREE.DoubleSide;
    material.map = texture;
    var geometry_sphere = new THREE.SphereGeometry(object.radius, object.hLine, object.vLine);
    var sphere = new THREE.Mesh(geometry_sphere, material);
    sphere.name = object.objectName;
    sphere.castShadow = true;
    sphere.recieveShadow = true;
    astralObjects.add(sphere);
    planetsList.push(sphere);
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

//old function
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

function gererateOrbitLines(object){
    var scale = 1;
    var material = new THREE.LineBasicMaterial({
        color:0x999999,
        linewidth: 5
    });
    var circumference = 24 * object.orbitRadius * scale;
    var alpha = 0;
    var dalpha = 2 * Math.PI / circumference;
    var xPos, zPos, yPos;

    var points = [];
    for(let i = 0; i <= circumference; i++){
        alpha += dalpha;
        xPos = object.orbitRadius*Math.sin(alpha)*scale;
        zPos = object.orbitRadius*Math.cos(alpha)*scale;
        yPos = -object.orbitTilt*Math.cos(alpha)*scale*100 + 1;
        points.push(new THREE.Vector3(xPos, yPos, zPos));
    }
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var orbit = new THREE.Line( geometry, material );
    orbits.add(orbit);
    orbitsBarycenterList.push(object.barycenter());

    return orbit
}

var sunModel = {
    radius:30,
    hLine:550,
    vLine:550,
    objectName:"Sun planet",
    texture:'images/textures/suntexture.jpg',
    orbitRadius:0,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 0.0001,
    rotaionSpeed: 0.5
};
planetModelsList.push(sunModel);
var sun = generateTexturedPlanet(sunModel);


var plutoModel = {
    radius:0.465,
    hLine:12,
    vLine:12,
    objectName:"Pluto planet",
    texture:'images/textures/plutotexture.jpg',
    orbitRadius:3948,
    barycenter: function() {return sun},
    orbitTilt : 12.076,
    orbitSpeed: 247.9,
    rotaionSpeed: 0.673
};

planetModelsList.push(plutoModel);
var pluto = generateTexturedPlanet(plutoModel);

var vertex = 'vertexShader'
var fragment = 'fragmentShader'

var plutoGhostModel = {
    radius: 0.2,
    hlines: 12,
    vlines: 12,
    orbitRadius:3948,
    barycenter: function() {return sun},
    orbitTilt : 12.076,
    orbitSpeed: 247.9,
    rotaionSpeed: 0.673
}
ghostPlanetModelsList.push(plutoGhostModel);
var plutoGhost = buildShader(plutoGhostModel);

var plutoOrbit = gererateOrbitLines(plutoModel);

var neptuneModel = {
    radius:9.7,
    hLine:170,
    vLine:170,
    objectName:"Neptune planet",
    texture:'images/textures/neptunetexture.jpg',
    orbitRadius:3005,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 163.7,
    rotaionSpeed: 0.673
};
planetModelsList.push(neptuneModel);
var neptune = generateTexturedPlanet(neptuneModel);

var neptuneGhostModel = {
    radius: 8.8,
    hlines: 44,
    vlines: 44,
    orbitRadius:3005,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 163.7,
    rotaionSpeed: 0.673
}
ghostPlanetModelsList.push(neptuneGhostModel);
var neptuneGhost = buildShader(neptuneGhostModel);

var neptuneOrbit = gererateOrbitLines(neptuneModel);

var tritonModel = {
    radius:0.526,
    hLine:9.2,
    vLine:9.2,
    colour:0x828f88,
    orbitRadius:15,
    barycenter: function() {return neptune},
    orbitTilt: 0,
    orbitSpeed: 5.876,
    rotaionSpeed: 0
}
var triton = generateMoon(tritonModel);
var tritonOrbit = gererateOrbitLines(tritonModel);
moonModelsList.push(tritonModel);

var uranusModel = {
    radius:10,
    hLine:176,
    vLine:176,
    objectName:"Uranus planet",
    texture:'images/textures/uranustexture.jpg',
    orbitRadius:1920,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 83.7,
    rotaionSpeed: 0.718
};
planetModelsList.push(uranusModel);
var uranus = generateTexturedPlanet(uranusModel);

var uranusGhostModel = {
    radius: 9,
    hlines: 44,
    vlines: 44,
    orbitRadius:1920,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 83.7,
    rotaionSpeed: 0.718
}
ghostPlanetModelsList.push(uranusGhostModel);
var uranusGhost = buildShader(uranusGhostModel);

var uranusOrbit = gererateOrbitLines(uranusModel);
var arielModel = {
    radius:0.244,
    hLine:3.956,
    vLine:3.956,
    colour:0x8e7c72,
    orbitRadius:12,
    barycenter: function() {return uranus},
    orbitTilt: 0,
    orbitSpeed: 8.7,
    rotaionSpeed: 0
};

var ariel = generateMoon(arielModel);
var arielOrbit = gererateOrbitLines(arielModel);
moonModelsList.push(arielModel);
var umbrielModel = {
    radius:0.277,
    hLine:3.99,
    vLine:3.99,
    colour:0x7b7b7b ,
    orbitRadius: 15,
    barycenter: function() {return uranus},
    orbitTilt: 0,
    orbitSpeed: 13.4,
    rotaionSpeed: 0
};
var umbriel = generateMoon(umbrielModel);
var umbrielOrbit = gererateOrbitLines(umbrielModel);
moonModelsList.push(umbrielModel);
var oberonModel = {
    radius:0.296,
    hLine:5.169,
    vLine:5.169,
    colour:0xc0a99f,
    orbitRadius: 25,
    barycenter: function() {return uranus},
    orbitTilt: 0,
    orbitSpeed: 4.1,
    rotaionSpeed: 0
};
var oberon = generateMoon(oberonModel);
var oberonOrbit = gererateOrbitLines(oberonModel);
moonModelsList.push(oberonModel);
var titaniaModel = {
    radius:0.306,
    hLine:5.39,
    vLine:5.39,
    colour:0xd2c6b9,
    orbitRadius: 20,
    barycenter: function() {return uranus},
    orbitTilt: 0,
    orbitSpeed: 2.5,
    rotaionSpeed: 0
};
var titania = generateMoon(titaniaModel);
var titaniaOrbit = gererateOrbitLines(titaniaModel);
moonModelsList.push(titaniaModel);

var saturnModel = {
    radius:22.74,
    hLine:400,
    vLine:400,
    objectName:"Saturn planet",
    texture:'images/textures/saturntexture.jpg',
    orbitRadius:950,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 29.456,
    rotaionSpeed: 0.425
};
planetModelsList.push(saturnModel);
var saturn = generateTexturedPlanet(saturnModel);

var saturnGhostModel = {
    radius: 21,
    hlines: 44,
    vlines: 44,
    orbitRadius:950,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 29.456,
    rotaionSpeed: 0.425
}
ghostPlanetModelsList.push(saturnGhostModel);
var saturnGhost = buildShader(saturnGhostModel);

var saturnOrbit = gererateOrbitLines(saturnModel);
var dioneModel = {
    radius:0.216,
    hLine:3.8,
    vLine:3.8,
    colour: 0x7d7d7d,
    orbitRadius: 30.4,
    barycenter: function() {return saturn},
    orbitTilt: 0,
    orbitSpeed: 10,
    rotaionSpeed: 0
};
var dione = generateMoon(dioneModel);
var dioneOrbit = gererateOrbitLines(dioneModel);
moonModelsList.push(dioneModel);

var iapetusModel = {
    radius:0.284,
    hLine:4.99,
    vLine:4.99,
    colour: 0x493729,
    orbitRadius: 145,
    barycenter: function() {return saturn},
    orbitTilt: 0,
    orbitSpeed: 2.9,
    rotaionSpeed: 0
};
var iapetus = generateMoon(iapetusModel);
var iapetusOrbit = gererateOrbitLines(iapetusModel);
moonModelsList.push(iapetusModel);

var rheaModel = {
    radius:0.297,
    hLine:5.227,
    vLine:5.227,
    colour: 0xb8b8b8,
    orbitRadius: 41,
    barycenter: function() {return saturn},
    orbitTilt: 0,
    orbitSpeed: 2.9,
    rotaionSpeed: 0
};
var rhea = generateMoon(rheaModel);
var rheaOrbit = gererateOrbitLines(rheaModel);
moonModelsList.push(rheaModel);

var titanModel = {
    radius:1.07,
    hLine:17.464,
    vLine:17.464,
    colour: 0xd7c461,
    orbitRadius: 50,
    barycenter: function() {return saturn},
    orbitTilt: 0,
    orbitSpeed: 1.6666,
    rotaionSpeed: 0
};
var titan = generateMoon(titanModel);
var titanOrbit = gererateOrbitLines(titanModel);
moonModelsList.push(titanModel);

var jupiterModel = {
    radius:27.2,
    hLine:482,
    vLine:482,
    objectName:"Jupiter planet",
    texture:'images/textures/jupitertexture.jpg',
    orbitRadius:520.3,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 11.862,
    rotaionSpeed: 0.41
};
planetModelsList.push(jupiterModel);
var jupiter = generateTexturedPlanet(jupiterModel);

var jupiterGhostModel = {
    radius: 26,
    hlines: 44,
    vlines: 44,
    orbitRadius:520.3,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 11.862,
    rotaionSpeed: 0.41
}
ghostPlanetModelsList.push(jupiterGhostModel);
var jupiterGhost = buildShader(jupiterGhostModel);

var jupiterOrbit = gererateOrbitLines(jupiterModel);

var callistoModel = {
    radius:0.945,
    hLine:16.6,
    vLine:16.6,
    colour: 0x7c6d60,
    orbitRadius: 70,
    barycenter: function() {return jupiter},
    orbitTilt: 0,
    orbitSpeed: 1,
    rotaionSpeed: 0
};
var callisto = generateMoon(callistoModel);
var callistoOrbit = gererateOrbitLines(callistoModel);
moonModelsList.push(callistoModel);

var ganymedeModel = {
    radius:1.03,
    hLine:18.16,
    vLine:18.16,
    colour: 0xb4b1b2,
    orbitRadius: 50,
    barycenter: function() {return jupiter},
    orbitTilt: 0,
    orbitSpeed: 2,
    rotaionSpeed: 0
};
var ganymede = generateMoon(ganymedeModel);
var ganymedeOrbit = gererateOrbitLines(ganymedeModel);
moonModelsList.push(ganymedeModel);

var europaModel = {
    radius:0.61,
    hLine:10.77,
    vLine:10.77,
    colour: 0xac966f,
    orbitRadius: 40,
    barycenter: function() {return jupiter},
    orbitTilt: 0,
    orbitSpeed: 4,
    rotaionSpeed: 0
};
var europa = generateMoon(europaModel);
var europaOrbit = gererateOrbitLines(europaModel);
moonModelsList.push(europaModel);

var ioModel = {
    radius:0.7,
    hLine:12.57,
    vLine:12.57,
    colour: 0xcabf55,
    orbitRadius: 30,
    barycenter: function() {return jupiter},
    orbitTilt: 0,
    orbitSpeed: 9.4,
    rotaionSpeed: 0
};
var io = generateMoon(ioModel);
var ioOrbit = gererateOrbitLines(ioModel);
moonModelsList.push(ioModel);

var marsModel = {
    radius:1.33,
    hLine:23,
    vLine:23,
    objectName:"Mars planet",
    texture:'images/textures/marstexture.jpg',
    orbitRadius:152.4,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 1.9,
    rotaionSpeed: 1.03 
};
planetModelsList.push(marsModel);
var mars = generateTexturedPlanet(marsModel);

var marsGhostModel = {
    radius: 0.8,
    hlines: 11,
    vlines: 11,
    orbitRadius:152.4,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 1.9,
    rotaionSpeed: 1.03
}
ghostPlanetModelsList.push(marsGhostModel);
var marsGhost = buildShader(marsGhostModel);

var marsOrbit = gererateOrbitLines(marsModel);

var deimosModel = {
    radius:0.02,
    hLine:4,
    vLine:4,
    colour: 0x2596be,
    orbitRadius: 5,
    barycenter: function() {return mars},
    orbitTilt: 0,
    orbitSpeed: 3.68,
    rotaionSpeed: 0
};
var deimos = generateMoon(deimosModel);
var deimosOrbit = gererateOrbitLines(deimosModel);
moonModelsList.push(deimosModel);

var phobosModel = {
    radius:0.04,
    hLine:4,
    vLine:4,
    colour: 0x2596be,
    orbitRadius: 3,
    barycenter: function() {return mars},
    orbitTilt: 0,
    orbitSpeed: 43.2,
    rotaionSpeed: 0
};
var phobos = generateMoon(phobosModel);
var phobosOrbit = gererateOrbitLines(phobosModel);
moonModelsList.push(phobosModel);

var earthModel = {
    radius:2.5,
    hLine:44,
    vLine:44,
    objectName:"Earth planet",
    texture:'images/textures/earthtexture.jpg',
    orbitRadius:100,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 1,
    rotaionSpeed: 1
};
planetModelsList.push(earthModel);
var earth = generateTexturedPlanet(earthModel);

var earthGhostModel = {
    radius: 2,
    hlines: 22,
    vlines: 22,
    orbitRadius:100,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 1,
    rotaionSpeed: 1
}
ghostPlanetModelsList.push(earthGhostModel);
var earthGhost = buildShader(earthGhostModel);

var earthOrbit = gererateOrbitLines(earthModel);
var moonModel = {
    radius:0.675,
    hLine:11.88,
    vLine:11.88,
    objectName:"Moon planet",
    texture:'images/textures/moontexture.jpg',
    orbitRadius:5,
    barycenter: function() {return earth},
    orbitTilt : 0,
    orbitSpeed: 20,
    rotaionSpeed: 1
};
planetModelsList.push(moonModel);
moonModelsList.push(moonModel);
var moon = generateTexturedPlanet(moonModel);
var moonOrbit = gererateOrbitLines(moonModel);

var venusModel = {
    radius:2.5,
    hLine:44,
    vLine:44,
    objectName:"Venus planet",
    texture:'images/textures/venustexture.jpg',
    orbitRadius:72,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 0.616,
    rotaionSpeed: 0.00411522
};
planetModelsList.push(venusModel);
var venus = generateTexturedPlanet(venusModel);

var venusGhostModel = {
    radius: 2,
    hlines: 22,
    vlines: 22,
    orbitRadius:72,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 0.616,
    rotaionSpeed: 0.00411522
}
ghostPlanetModelsList.push(venusGhostModel);
var venusGhost = buildShader(venusGhostModel);

var venusOrbit = gererateOrbitLines(venusModel);

var mercuryModel = {
    radius:1,
    hLine:32,
    vLine:32,
    objectName:"Mercury planet",
    texture:'images/textures/mercurytexture.jpg',
    orbitRadius:38,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 0.24,
    rotaionSpeed: 0.01706
};
planetModelsList.push(mercuryModel);
var mercury = generateTexturedPlanet(mercuryModel);

var mercuryGhostModel = {
    radius: 0.5,
    hlines: 16,
    vlines: 16,
    orbitRadius:38,
    barycenter: function() {return sun},
    orbitTilt : 0,
    orbitSpeed: 0.24,
    rotaionSpeed: 0.01706
}
ghostPlanetModelsList.push(mercuryGhostModel);
var mercuryGhost = buildShader(mercuryGhostModel);

var mercuryOrbit = gererateOrbitLines(mercuryModel);

var skybox = createSkyBox(100000, 55, 55, 'images/textures/milkywaytexture.jpeg');

//asteroids
var n = 600;
var cubes = [];
var asteroids = new THREE.Group();

//saturn's ring
var r = 40;
var ring = [];
var rings = new THREE.Group();

function createAsteroids() {
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
        //combined.multiply(sca);
        
        var rdmsize = (Math.random()*2)+0.5;
        var rdmcolnum = Math.round(Math.random() * 3);
        var colour = new THREE.Color(0xffffff);

        switch(rdmcolnum) {
            case 0: colour.setHex(0x594433); break;
            case 1: colour.setHex(0x382c23); break;
            case 2: colour.setHex(0x402e1f); break;
            case 3: colour.setHex(0x4d3929); break;
        }
        cubes[i] = createSphere(rdmsize, 5, 6, colour)
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
    scene.add(astralObjects); 
    scene.add(skybox);
    scene.add(spotlightgroup);
    scene.add(orbits);
    scene.add(rings);
    scene.add(asteroids);
}