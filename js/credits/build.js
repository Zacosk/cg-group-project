/* global THREE, scene, renderer, camera */

// Light Variables
var ambientlight;
var cameralight;
var credits = new THREE.Group();

//Create text function
function createText(string){
    var text_material = new THREE.MeshPhongMaterial();
    text_material.color = new THREE.Color(1, 1, 1);
    // var text_geo = new THREE.TextGeometry(string, {
	// 	font: font,
	// 	size: 80,
	// 	height: 5,
	// 	curveSegments: 12,
	// 	bevelEnabled: true,
	// 	bevelThickness: 10,
	// 	bevelSize: 8,
	// 	bevelOffset: 0,
	// 	bevelSegments: 5
    // });

    var text_geo = function(){
        const loader = new THREE.FontLoader();
        loader.load('css/fonts/SPACEBAR.ttf', function (font) {
        const geometry = new THREE.TextGeometry(string, {
            font: font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        });
    });
    }
    var text = new THREE.Mesh(text_geo, text_material);
    return text;
}

//Creates the skybox
function createSkyBox(radius, hlines, vlines, textureName) {
    var material = new THREE.MeshLambertMaterial();
    var texture = new THREE.TextureLoader().load(textureName);
    material.side = THREE.DoubleSide;
    material.map = texture;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    var sphere = new THREE.Mesh(geometry_sphere, material);
    return sphere;
}

//Create names
var david = createText('David Schutte');
var zach = createText('Zachary Loofs');
var felix = createText('Felix Burge');
var max = createText('Max Gottardi');


// Create sunlight within the sun (does not illuminate sun), create camera light and ambient light
function createLight() {
    cameralight = new THREE.PointLight((1, 1, 1), 0.5);
    camera.add(cameralight);
    
    ambientlight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.1);
    scene.add(ambientlight);
}

function addShapes() {
    scene.add(david);
    scene.add(zach);
    scene.add(felix);
    scene.add(max);
    scene.add(createSkyBox());
    scene.add(camera);
    scene.add(renderer);
}