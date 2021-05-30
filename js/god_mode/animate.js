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

// function animate_mercury(){
//     mercury.rotation.y += (speed/58.6)*time;
//     mercury.position.y = 1;
//     mercury.position.x = (-d*mercuryorbitradius)*Math.cos(alpha/0.24);
//     mercury.position.z = (d*mercuryorbitradius)*Math.sin(alpha/0.24);

//     mercuryGhost.rotation.y += (speed/58.6)*time;
//     mercuryGhost.position.y = 1;
//     mercuryGhost.position.x = (-d*0.38)*Math.cos(alpha/0.24);
//     mercuryGhost.position.z = (d*0.38)*Math.sin(alpha/0.24);
//     requestAnimationFrame(animate_mercury);
// }

// function animate_venus(){
//     venus.rotation += (speed/243)*time;
//     venus.position.y = 1;
//     venus.position.x = (-d*venusorbitradius)*Math.cos(alpha/0.616);
//     venus.position.z = (d*venusorbitradius)*Math.sin(alpha/0.616);

//     venusGhost.rotation += (speed/243)*time;
//     venusGhost.position.y = 1;
//     venusGhost.position.x = (-d*0.72)*Math.cos(alpha/0.616);
//     venusGhost.position.z = (d*0.72)*Math.sin(alpha/0.616);
//     requestAnimationFrame(animate_venus);
// }

// function animate_earth(){
//     earth.rotation.y += speed*time;
//     earth.position.y = 1;
//     earth.position.x = (-d*earthorbitradius)*Math.cos(alpha);
//     earth.position.z = (d*earthorbitradius)*Math.sin(alpha);

//     earthGhost.rotation.y += speed*time;
//     earthGhost.position.y = 1;
//     earthGhost.position.x = (-d*1)*Math.cos(alpha);
//     earthGhost.position.z = (d*1)*Math.sin(alpha);
//     requestAnimationFrame(animate_earth);
// }

// function animate_moon(){
//     moon.rotation.y += speed*time;
//     moon.position.y = earth.position.y;
//     moon.position.x = earth.position.x+5*Math.sin(alpha*20);
//     moon.position.z = earth.position.z-5*Math.cos(alpha*20);
//     moonOrbit.position.x = earth.position.x;
//     moonOrbit.position.z = earth.position.z;
//     requestAnimationFrame(animate_moon);
// }

// function animate_mars() {
//     mars.rotation.y += (speed*1.03)*time;
//     mars.position.y = 1;
//     mars.position.x = (-d*marsorbitradius)*Math.cos(alpha/1.9);
//     mars.position.z= (d*marsorbitradius)*Math.sin(alpha/1.9);

//     marsGhost.rotation.y += (speed*1.03)*time;
//     marsGhost.position.y = 1;
//     marsGhost.position.x = (-d*1.524)*Math.cos(alpha/1.9);
//     marsGhost.position.z= (d*1.524)*Math.sin(alpha/1.9);
//     requestAnimationFrame(animate_mars);
// }

// function animate_phobos(){
//     phobos.position.y = mars.position.y;
//     phobos.position.x = mars.position.x+3*Math.sin(alpha*43.2);
//     phobos.position.z = mars.position.z-3*Math.cos(alpha*43.2);
//     phobosOrbit.position.x = mars.position.x;
//     phobosOrbit.position.z = mars.position.z;
//     requestAnimationFrame(animate_phobos);
// }

// function animate_deimos(){
//     deimos.position.y = mars.position.y;
//     deimos.position.x = mars.position.x+5*Math.sin(alpha*3.68);
//     deimos.position.z = mars.position.z-5*Math.cos(alpha*3.68);
//     deimosOrbit.position.x = mars.position.x;
//     deimosOrbit.position.z = mars.position.z;
//     requestAnimationFrame(animate_deimos);
// }

// function animate_jupiter(){
//     jupiter.rotation.y += (speed*0.41)*time;
//     jupiter.position.y = 1;
//     jupiter.position.x = (d*jupiterorbitradius)*Math.sin(alpha/11.862);
//     jupiter.position.z = (d*jupiterorbitradius)*Math.cos(alpha/11.862);

//     jupiterGhost.rotation.y += (speed*0.41)*time;
//     jupiterGhost.position.y = 1;
//     jupiterGhost.position.x = (d*5.203)*Math.sin(alpha/11.862);
//     jupiterGhost.position.z = (d*5.203)*Math.cos(alpha/11.862);
//     requestAnimationFrame(animate_jupiter);
// }

// function animate_io(){
//     io.position.y = jupiter.position.y;
//     io.position.x = jupiter.position.x+30*Math.sin(alpha*9.4);
//     io.position.z = jupiter.position.z-30*Math.cos(alpha*9.4);
//     ioOrbit.position.x = jupiter.position.x;
//     ioOrbit.position.z = jupiter.position.z;
//     requestAnimationFrame(animate_io);
// }

// function animate_europa() {
//     europa.position.y = jupiter.position.y;
//     europa.position.x = jupiter.position.x+40*Math.sin(alpha*4);
//     europa.position.z = jupiter.position.z-40*Math.cos(alpha*4);
//     europaOrbit.position.x = jupiter.position.x;
//     europaOrbit.position.z = jupiter.position.z;
//     requestAnimationFrame(animate_europa);
// }

// function animate_ganymede() {
//     ganymede.position.y = jupiter.position.y;
//     ganymede.position.x = jupiter.position.x+50*Math.sin(alpha*2);
//     ganymede.position.z = jupiter.position.z-50*Math.cos(alpha*2);
//     ganymedeOrbit.position.x = jupiter.position.x;
//     ganymedeOrbit.position.z = jupiter.position.z;
//     requestAnimationFrame(animate_ganymede);
// }

// function animate_callisto() {
//     callisto.position.y = jupiter.position.y;
//     callisto.position.x = jupiter.position.x+70*Math.sin(alpha);
//     callisto.position.z = jupiter.position.z-70*Math.cos(alpha);
//     callistoOrbit.position.x = jupiter.position.x;
//     callistoOrbit.position.z = jupiter.position.z;
//     requestAnimationFrame(animate_callisto);
// }

// function rotate(object) {
//     object.rotation.x += (Math.random()/50)*time;
//     object.rotation.z += (Math.random()/50)*time;
//     object.rotation.y += (Math.random()/50)*time;
// }

// function animate_Asteroids() {
//     //Rotate all cubes
//     cubes.forEach(rotate);
//     //Rotate the group around the Y axis
//     asteroids.rotation.y += 0.0008*(time/2);
//     requestAnimationFrame(animate_Asteroids);
// }

// function animate_saturn() {
//     saturn.rotation.y += (speed*0.425)*time;
//     saturn.position.y = 1;
//     saturn.position.x = (d*saturnorbitradius)*Math.sin(alpha/29.456);
//     saturn.position.z = (d*saturnorbitradius)*Math.cos(alpha/29.456); //26.456

//     saturnGhost.rotation.y += (speed*0.425)*time;
//     saturnGhost.position.y = 1;
//     saturnGhost.position.x = (d*9.5)*Math.sin(alpha/29.456);
//     saturnGhost.position.z = (d*9.5)*Math.cos(alpha/29.456);
//     requestAnimationFrame(animate_saturn);
// }

function animate_saturnring() {
    rings.rotation.z = 0.47;
    rings.rotation.y += (speed*0.425)*time;
    rings.position.y = saturn.position.y;
    rings.position.x = saturn.position.x;
    rings.position.z = saturn.position.z;
    controls.update();
    requestAnimationFrame(animate_saturnring);
}

// function animate_titan() {
//     titan.position.y = saturn.position.y;
//     titan.position.x = saturn.position.x+50*Math.sin(alpha/0.6);
//     titan.position.z = saturn.position.z-50*Math.cos(alpha/0.6);
//     titanOrbit.position.x = saturn.position.x;
//     titanOrbit.position.z = saturn.position.z;
//     requestAnimationFrame(animate_titan);
// }

// function animate_rhea() {
//     rhea.position.y = saturn.position.y;
//     rhea.position.x = saturn.position.x+41*Math.sin(alpha/0.2);
//     rhea.position.z = saturn.position.z-41*Math.cos(alpha/0.2);    
//     rheaOrbit.position.x = saturn.position.x;
//     rheaOrbit.position.z = saturn.position.z;
//     requestAnimationFrame(animate_rhea);
// }

// function animate_iapetus() {
//     iapetus.position.y = saturn.position.y;
//     iapetus.position.x = saturn.position.x+145*Math.sin(alpha/2.9);
//     iapetus.position.z = saturn.position.z-145*Math.cos(alpha/2.9);    
//     iapetusOrbit.position.x = saturn.position.x;
//     iapetusOrbit.position.z = saturn.position.z;
//     requestAnimationFrame(animate_iapetus);
// }

// function animate_dione() {
//     dione.position.y = saturn.position.y;
//     dione.position.x = saturn.position.x+30.4*Math.sin(alpha/0.1);
//     dione.position.z = saturn.position.z-30.4*Math.cos(alpha/0.1);    
//     dioneOrbit.position.x = saturn.position.x;
//     dioneOrbit.position.z = saturn.position.z;
//     requestAnimationFrame(animate_dione);
// }

// function animate_uranus() {
//     uranus.rotation.y -= (speed*0.718)*time;
//     uranus.position.y = 1;
//     uranus.position.x = (d*uranusorbitradius)*Math.sin(alpha/83.7);
//     uranus.position.z = (d*uranusorbitradius)*Math.cos(alpha/83.7);

//     uranusGhost.rotation.y -= (speed*0.718)*time;
//     uranusGhost.position.y = 1;
//     uranusGhost.position.x = (d*19.2)*Math.sin(alpha/83.7);
//     uranusGhost.position.z = (d*19.2)*Math.cos(alpha/83.7);
//     requestAnimationFrame(animate_uranus);
// }

// function animate_titania() {
//     titania.position.y = uranus.position.y;
//     titania.position.x = uranus.position.x+20*Math.sin(alpha*2.5);
//     titania.position.z = uranus.position.z-20*Math.cos(alpha*2.5);    
//     titaniaOrbit.position.x = uranus.position.x;
//     titaniaOrbit.position.z = uranus.position.z;
//     requestAnimationFrame(animate_titania);
// }

// function animate_oberon() {
//     oberon.position.y = uranus.position.y;
//     oberon.position.x = uranus.position.x+25*Math.sin(alpha*4.1);
//     oberon.position.z = uranus.position.z-25*Math.cos(alpha*4.1);    
//     oberonOrbit.position.x = uranus.position.x;
//     oberonOrbit.position.z = uranus.position.z;
//     requestAnimationFrame(animate_oberon);
// }

// function animate_umbriel() {
//     umbriel.position.y = uranus.position.y;
//     umbriel.position.x = uranus.position.x+15*Math.sin(alpha*13.4);
//     umbriel.position.z = uranus.position.z-15*Math.cos(alpha*13.4);    
//     umbrielOrbit.position.x = uranus.position.x;
//     umbrielOrbit.position.z = uranus.position.z;
//     requestAnimationFrame(animate_umbriel);
// }

// function animate_ariel() {
//     ariel.position.y = uranus.position.y;
//     ariel.position.x = uranus.position.x+12*Math.sin(alpha*8.7);
//     ariel.position.z = uranus.position.z-12*Math.cos(alpha*8.7);    
//     arielOrbit.position.x = uranus.position.x;
//     arielOrbit.position.z = uranus.position.z;
//     requestAnimationFrame(animate_ariel);
// }

// function animate_neptune() {
//     neptune.rotation.y += (speed*0.673)*time;
//     neptune.position.y = 1;
//     neptune.position.x = (d*neptuneorbitradius)*Math.sin(alpha/163.7);
//     neptune.position.z = (d*neptuneorbitradius)*Math.cos(alpha/163.7);

//     neptuneGhost.rotation.y += (speed*0.673)*time;
//     neptuneGhost.position.y = 1;
//     neptuneGhost.position.x = (d*30.05)*Math.sin(alpha/163.7);
//     neptuneGhost.position.z = (d*30.05)*Math.cos(alpha/163.7);
//     requestAnimationFrame(animate_neptune);
// }

// function animate_triton() {
//     triton.position.y = neptune.position.y;
//     triton.position.x = neptune.position.x+15*Math.sin(alpha*-5.876);
//     triton.position.z = neptune.position.z-15*Math.cos(alpha*-5.876);    
//     tritonOrbit.position.x = neptune.position.x;
//     tritonOrbit.position.z = neptune.position.z;
//     requestAnimationFrame(animate_triton);
// }

// function animate_pluto() {
//     pluto.rotation.y += (speed*0.673)*time;
//     pluto.position.x = (d*plutoorbitradius)*Math.cos(alpha/247.9);
//     pluto.position.z = (-d*plutoorbitradius)*Math.sin(alpha/247.9);
//     pluto.position.y = (plutoModel.orbitTilt)*Math.sin(alpha/247.9)*100 + 1;

//     plutoGhost.rotation.y += (speed*0.673)*time;
//     plutoGhost.position.y = 1;
//     plutoGhost.position.x = (d*39.48)*Math.sin(alpha/247.9);
//     plutoGhost.position.z = (d*39.48)*Math.cos(alpha/247.9);
//     requestAnimationFrame(animate_pluto);
// }


function animate_object(object, objectModel) {

    var barycenter = objectModel.barycenter().position;

    object.rotation.y += (speed*objectModel.rotaionSpeed)*time;
    object.position.x = (((scale*objectModel.orbitRadius)*Math.cos(alpha/objectModel.orbitSpeed)) + barycenter.x) ;
    object.position.z = (((-scale*objectModel.orbitRadius)*Math.sin(alpha/objectModel.orbitSpeed)) + barycenter.z) ;
    object.position.y = (((scale*objectModel.orbitTilt)*Math.sin(alpha/objectModel.orbitSpeed)*100) ) + 1 ;
    if (object.name.includes("Venus planet")) {
        console.log("x");
    }

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
        //code to remove sun?
    sun.geometry.dispose();
    sun.material.dispose();
    scene.remove(sun);
    }
    if (keyCode == 88) {
        scene.add(sun);
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
            spotlightgroup.scale.x = size;
            spotlightgroup.scale.y = size;
            spotlightgroup.scale.z = size;
            //add in code to increase spotlight distance
            //for (var i = 0; i < spotlightgroup.size)
            //console.log("yes");
        }
    }

    requestAnimationFrame(resizePlanet);
}

function resetOrbit() {
    if (planetselected) {
        //console.log("planetselected");
        switch (selectedplanetshortname) {
        case "Mercury": mercuryorbitradius = 0.38; scene.remove(mercuryGhost); break;
        case "Venus": venusorbitradius = 0.72; scene.remove(venusGhost); break;
        case "Earth": earthorbitradius = 1; scene.remove(earthGhost); break;
        case "Mars": marsorbitradius = 1.524; scene.remove(marsGhost); break;
        case "Jupiter": jupiterorbitradius = 5.203; scene.remove(jupiterGhost); break;
        case "Saturn": saturnorbitradius = 9.5; scene.remove(saturnGhost); break;
        case "Uranus": uranusorbitradius = 19.2; scene.remove(uranusGhost); break;
        case "Neptune": neptuneorbitradius = 30.05; scene.remove(neptuneGhost); break;
        case "Pluto": plutoorbitradius = 39.48; scene.remove(plutoGhost); break;
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
                radius:newPlanetRadius,
                hLine:32,
                vLine:32,
                objectName:"New planet" + newPlanetCount,
                texture: newPlanetTexture,
                orbitRadius: newPlanetOrbitRadius,
                barycenter: function() {return sun},
                orbitTilt : newPlanetOrbitTilt,
                orbitSpeed: newPlanetOrbitSpeed,
                rotaionSpeed: newPlanetRotationSpeed
            };
            planetModelsList.push(newPlanetModel);
            var newPlanet = generateTexturedPlanet(newPlanetModel); 
            var newPlanetOrbit = gererateOrbitLines(newPlanetModel);
            newPlanetCount++;
            console.log(planetsList.length);
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
        createplanetfolder.add(params, 'Add_Planet_Orbit_Speed', 0.2, 250).name("Orbit Speed").onChange(function(val){
            newPlanetOrbitSpeed = val;
        });
        createplanetfolder.add(params, 'Add_Planet_Rot_Speed', 0, 2).name("Rotation Speed").onChange(function(val){
            newPlanetRotationSpeed = val;
        });
        createplanetfolder.add(params, 'Add_Planet_Texture', {Sun: 'images/textures/suntexture.jpg', Mercury: 'images/textures/mercurytexture.jpg', Venus: 'images/textures/venustexture.jpg', Earth: 'images/textures/earthtexture.jpg', Moon: 'images/textures/moontexture.jpg', Mars: 'images/textures/marstexture.jpg', Jupiter: 'images/textures/jupitertexture.jpg', Saturn: 'images/textures/saturntexture.jpg', Uranus: 'images/textures/uranustexture.jpg', Neptune: 'images/textures/neptunetexture.jpg', Pluto: 'images/textures/plutotexture.jpg'}).name("Texture").onChange(function(val){
            newPlanetTexture = val;
        });

        createplanetfolder.add(params, 'Add_Planet').name("Add Planet");

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

        // Selected Planet folder
        selectedplanetfolder.add(params, 'Size', 0.1, 50).onChange(function(val){
            size = val;
            resizePlanet();
        });
        selectedplanetfolder.add(params, 'Orbit_Radius', 0, 50).name("Orbit Radius").onChange(function(val){
            //orbit = val;
            if (planetselected) {
                //console.log("planetselected");
                switch (selectedplanetshortname) {
                case "Mercury": mercuryorbitradius = val; scene.add(mercuryGhost); break;
                case "Venus": venusorbitradius = val; scene.add(venusGhost); break;
                case "Earth": earthorbitradius = val; scene.add(earthGhost); break;
                case "Mars": marsorbitradius = val; scene.add(marsGhost); break;
                case "Jupiter": jupiterorbitradius = val; scene.add(jupiterGhost); break;
                case "Saturn": saturnorbitradius = val; scene.add(saturnGhost); break;
                case "Uranus": uranusorbitradius = val; scene.add(uranusGhost); break;
                case "Neptune": neptuneorbitradius = val; scene.add(neptuneGhost); break;
                case "Pluto": plutoorbitradius = val; scene.add(plutoGhost); break;
                }
            }
        });
        selectedplanetfolder.add(params, 'Reset_Orbit').name("Reset Orbit");
    }