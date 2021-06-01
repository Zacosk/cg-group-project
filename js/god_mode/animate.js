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
    
    for (var i = 0; i < ghostPlanetList.length; i++) {
        animate_object(ghostPlanetList[i], ghostPlanetModelsList[i]);
    } 
    requestAnimationFrame(animate_system);
}

//reposition camera
var raycaster = new THREE.Raycaster();

//Define a selected object
var planetselected = false;
var selectedplanet;
var selectedplanetname;
var dist = calculateCameraDistance("Sun planet");
var height;

//add event listener
function onDocumentMouseDown(event) {
    var mouse = new THREE.Vector2;
    
    mouse.x = (event.clientX / renderer.domElement.clientWidth)*2-1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight)*2+1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
        //object is selected
        if ((intersects[0].object.name.includes("planet")) && (!planetselected)) {
            planetselected= true;
            selectedplanet = intersects[0].object;
            selectedplanetname = intersects[0].object.name;
            //window.open("https://en.wikipedia.org/wiki/Earth");
            selectPlanet();
        }
    }
}

var cameralock = true;
var trackplanet = false;
function followPlanet() {
    if (trackplanet) {
        var pos = selectedplanet.position;
        if (cameralock) {
            camera.position.set(pos.x+(dist*camdistance), pos.y+((dist/10)*camheight), pos.z);
        }
        controls.target.set(pos.x, pos.y, pos.z);
        controls.update();
        requestAnimationFrame(followPlanet);
    }
}

// lock the camera to a planet and select it
function selectPlanet() {
    planetselected = true;
    trackplanet = true;
    selectedplanetshortname = selectedplanet.name.replace(' planet', '');
    dist = calculateCameraDistance(selectedplanet.name);
    var pos = selectedplanet.position;
    camera.position.set(pos.x+dist, pos.y+(dist/10), pos.z);
    controls.update();
    camdistance = 1;
    camheight = 1;
    followPlanet();
}

// return the distance the camera should be from each planet
function calculateCameraDistance(nam) {
    var name = nam.replace(' planet', '');
    var dist;
    switch(name) {
        case "Sun": return dist = 150; break;
        case "Mercury": return dist = 10; break;
        case "Venus": return dist = 20; break;
        case "Earth": return dist = 20; break;
        case "Moon": return dist = 5; break;
        case "Mars": return dist = 15; break;
        case "Jupiter": return dist = 150; break;
        case "Saturn": return dist = 150; break;
        case "Uranus": return dist = 70; break;
        case "Neptune": return dist = 70; break;
        case "Pluto": return dist = 4; break;
    }
}

// reset the camera if esc is pressed
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 27) {
        resetCamera();
    }
    if (keyCode == 90) {
    // test code
    console.log(spotlightgroup.children[0].distance);
    }
}

function resetCamera() {
    controls.reset();
    //planetselected= false;
    //selectedplanetname = "";
    camheight = 1;
    camdistance = 1;
    trackplanet = false;
}

var lightDistance = 100;
function resizePlanet() {
    if (planetselected) {
        selectedplanet.scale.x = size;
        selectedplanet.scale.y = size;
        selectedplanet.scale.z = size;
        if (selectedplanet.name.includes("Saturn")) {
            rings.scale.x = size;
            rings.scale.y = size;
            rings.scale.z = size;
        }
        if (selectedplanet.name.includes("Sun")) {
            for (var i = 0; i < spotlightgroup.children.length; i++) {
                spotlightgroup.children[i].distance = lightDistance * size;
            }
            spotlightgroup.scale.x = size;
            spotlightgroup.scale.y = size;
            spotlightgroup.scale.z = size;
        }
    }

    requestAnimationFrame(resizePlanet);
}

function resetOrbit() {
    if (planetselected) {
        //console.log("planetselected");
        switch (selectedplanetshortname) {
        case "Mercury": planetModelsList[10].orbitRadius = 38; scene.remove(mercuryGhost); break;
        case "Venus": planetModelsList[9].orbitRadius = 72; scene.remove(venusGhost); break;
        case "Earth": planetModelsList[7].orbitRadius = 100; scene.remove(earthGhost); break;
        case "Moon": moonModelsList[15].orbitRadius = 5; scene.remove(moonGhost); break;
        case "Mars": planetModelsList[6].orbitRadius = 152.4; scene.remove(marsGhost); break;
        case "Jupiter": planetModelsList[5].orbitRadius = 520.3; scene.remove(jupiterGhost); break;
        case "Saturn": planetModelsList[4].orbitRadius = 950; scene.remove(saturnGhost); break;
        case "Uranus": planetModelsList[3].orbitRadius = 1920; scene.remove(uranusGhost); break;
        case "Neptune": planetModelsList[2].orbitRadius = 3005; scene.remove(neptuneGhost); break;
        case "Pluto": planetModelsList[1].orbitRadius = 3948; scene.remove(plutoGhost); break;
        }
    }
}

// Build the GUI
var size = 1;
var camdistance = 1;
var camheight = 1;
var orbit = 1;
var planetrotation = 1;
var orbit_show = 1
var selectedplanetshortname = "";

//variables for new planet creation
var newPlanetCount = 0;
var newPlanetRadius = 5;
var newPlanetName = "New Planet " + newPlanetCount;
var newPlanetTexture = 'images/textures/earthtexture.jpg';
var newPlanetOrbitRadius = 50;
var newPlanetOrbitTilt = 0;
var newPlanetOrbitSpeed = 20;
var newPlanetRotationSpeed = 1;
var newPlanet;
var newPlanetOrbit;

function buildGui() {
    gui = new dat.GUI();
    var solarsystemfolder = gui.addFolder('Solar System Controls');
    var createplanetfolder = gui.addFolder('Create Planet');
    var planetfolder = gui.addFolder('Planet Selection');
    var selectedplanetfolder = gui.addFolder('Selected Planet');
    var camerafolder = gui.addFolder('Camera Controls');
    var params={
        //solar system functions
        Time: time,
        Orbit_Show: function() {if(orbit_show == 1){
            scene.remove(orbits);
            orbit_show = 0;
        }
        else{ scene.add(orbits);
            orbit_show = 1;
        }
    },

        Add_Planet: function() { 
            var newPlanetModel = {
                radius: newPlanetRadius,
                hLine:32,
                vLine:32,
                objectName:"New planet " + newPlanetCount,
                texture:newPlanetTexture,
                orbitRadius:newPlanetOrbitRadius,
                barycenter: function() {return sun},
                orbitTilt : newPlanetOrbitTilt,
                orbitSpeed: newPlanetOrbitRadius/newPlanetOrbitSpeed,
                rotaionSpeed: newPlanetRotationSpeed
            };
            planetModelsList.push(newPlanetModel);
            newPlanet = generateTexturedPlanet(newPlanetModel);
            newPlanetOrbit = gererateOrbitLines(newPlanetModel);
            newPlanetCount++;
        },

        Remove_Planet: function() {
            for (var i = 0; i < astralObjects.children.length; i++){
                var latestPlanetNumber = newPlanetCount -1;
                latestPlanetNumber.toString();
                if (astralObjects.children[i].name.includes(latestPlanetNumber)) {
                    scene.remove(astralObjects.children[i]);
                    scene.remove(orbits.children[i-1]);
                    astralObjects.remove(astralObjects.children[i]);
                    orbits.remove(orbits.children[i-1]);
                }
            }

            if (planetsList.length > 11) {
                planetModelsList.pop();
                planetsList.pop();
                orbitsBarycenterList.pop();
            }
            
            newPlanetCount--;
        },

        Add_Planet_Radius: newPlanetRadius,
        Add_Planet_Orbit: newPlanetOrbitRadius,
        Add_Planet_Tilt: newPlanetOrbitTilt,
        Add_Planet_Orbit_Speed: newPlanetOrbitSpeed,
        Add_Planet_Rot_Speed: newPlanetRotationSpeed,
        Add_Planet_Texture: newPlanetTexture,

        //select planet functions
        Sun: function() {selectedplanet = sun; selectPlanet(); selectedplanetfolder.open();},
        Mercury: function() {selectedplanet = mercury; selectPlanet(); selectedplanetfolder.open();},
        Venus: function() {selectedplanet = venus; selectPlanet(); selectedplanetfolder.open();},
        Earth: function() {selectedplanet = earth; selectPlanet(); selectedplanetfolder.open();},
        Moon: function() {selectedplanet = moon; selectPlanet(); selectedplanetfolder.open();},
        Mars: function() {selectedplanet = mars; selectPlanet(); selectedplanetfolder.open();},
        Jupiter: function() {selectedplanet = jupiter; selectPlanet(); selectedplanetfolder.open();},
        Saturn: function() {selectedplanet = saturn; selectPlanet(); selectedplanetfolder.open();},
        Uranus: function() {selectedplanet = uranus; selectPlanet(); selectedplanetfolder.open();},
        Neptune: function() {selectedplanet = neptune; selectPlanet(); selectedplanetfolder.open();},
        Pluto: function() {selectedplanet = pluto; selectPlanet(); selectedplanetfolder.open();},

        //Selected planet functions
        Size: size,
        Orbit_Radius: orbit,
        Reset_Orbit: function() {resetOrbit();},

        //Camera Functions
        Lock_Camera: cameralock,
        Distance: camdistance,
        Height: camheight,
        Reset_Camera: function() {resetCamera();}
    }
        // Solar system folder
        solarsystemfolder.add(params, 'Time', 0.005, 1000).onChange(function(val){
            time = val;
        });
        solarsystemfolder.add(params, 'Orbit_Show').name("Toggle Orbit Rings");

        // Create Planet Folder
        createplanetfolder.add(params, 'Add_Planet_Radius', 0.5, 50).name("Size").onChange(function(val){
            newPlanetRadius = val;
        });
        createplanetfolder.add(params, 'Add_Planet_Orbit', 35, 3000).name("Orbit Radius").onChange(function(val){
            newPlanetOrbitRadius = val;
        });
        createplanetfolder.add(params, 'Add_Planet_Tilt', 0, 2).name("Orbit Tilt").onChange(function(val){
            newPlanetOrbitTilt = val;
        });
        createplanetfolder.add(params, 'Add_Planet_Orbit_Speed', 1, 100).name("Orbit Speed").onChange(function(val){
            newPlanetOrbitSpeed = val;
        });
        createplanetfolder.add(params, 'Add_Planet_Rot_Speed', 0, 2).name("Rotation Speed").onChange(function(val){
            newPlanetRotationSpeed = val;
        });
        createplanetfolder.add(params, 'Add_Planet_Texture', {Sun: 'images/textures/suntexture.jpg', Mercury: 'images/textures/mercurytexture.jpg', Venus: 'images/textures/venustexture.jpg', Earth: 'images/textures/earthtexture.jpg', Moon: 'images/textures/moontexture.jpg', Mars: 'images/textures/marstexture.jpg', Jupiter: 'images/textures/jupitertexture.jpg', Saturn: 'images/textures/saturntexture.jpg', Uranus: 'images/textures/uranustexture.jpg', Neptune: 'images/textures/neptunetexture.jpg', Pluto: 'images/textures/plutotexture.jpg', Asteroid: 'images/textures/asteroidtexture.jpg'}).name("Texture").onChange(function(val){
            newPlanetTexture = val;
        });

        createplanetfolder.add(params, 'Add_Planet').name("Add Planet");
        createplanetfolder.add(params, 'Remove_Planet').name("Remove Last Planet");

        // planet selection folder
        planetfolder.add(params, 'Sun').name("The Sun");
        planetfolder.add(params, 'Mercury');
        planetfolder.add(params, 'Venus');
        planetfolder.add(params, 'Earth');
        planetfolder.add(params, 'Moon').name("The Moon");
        planetfolder.add(params, 'Mars');
        planetfolder.add(params, 'Jupiter');
        planetfolder.add(params, 'Saturn');
        planetfolder.add(params, 'Uranus');
        planetfolder.add(params, 'Neptune');
        planetfolder.add(params, 'Pluto');

        // Camera Controls Folder
        camerafolder.add(params, 'Height',-50, 50).onChange(function(val){
            camheight = val;
        });
        camerafolder.add(params, 'Distance', 0.2, 6).onChange(function(val){
            camdistance = val;
        });
        camerafolder.add(params, 'Lock_Camera').name("Lock Camera").onChange(function(val){
            cameralock = val;
        });
        camerafolder.add(params, 'Reset_Camera').name("Reset Camera");

        planetfolder.open();
        camerafolder.open();
        solarsystemfolder.open();
        createplanetfolder.open();

        // Selected Planet folder
        selectedplanetfolder.add(params, 'Size', 0.1, 50).onChange(function(val){
            size = val;
            resizePlanet();
        });
        selectedplanetfolder.add(params, 'Orbit_Radius', 0, 3950).name("Orbit Radius").onChange(function(val){
            //orbit = val;
            if (planetselected) {
                //console.log(selectedplanetshortname);
                switch (selectedplanetshortname) {
                case "Mercury": planetModelsList[10].orbitRadius = val; scene.add(mercuryGhost); break;
                case "Venus": planetModelsList[9].orbitRadius = val; scene.add(venusGhost); break;
                case "Earth": planetModelsList[7].orbitRadius = val; scene.add(earthGhost); break;
                case "Moon": moonModelsList[15].orbitRadius = val; scene.add(moonGhost); break;
                case "Mars": planetModelsList[6].orbitRadius = val; scene.add(marsGhost); break;
                case "Jupiter": planetModelsList[5].orbitRadius = val; scene.add(jupiterGhost); break;
                case "Saturn": planetModelsList[4].orbitRadius = val; scene.add(saturnGhost); break;
                case "Uranus": planetModelsList[3].orbitRadius = val; scene.add(uranusGhost); break;
                case "Neptune": planetModelsList[2].orbitRadius = val; scene.add(neptuneGhost); break;
                case "Pluto": planetModelsList[1].orbitRadius = val; scene.add(plutoGhost); break;
                }
            }
        });
        selectedplanetfolder.add(params, 'Reset_Orbit').name("Reset Orbit");
    }