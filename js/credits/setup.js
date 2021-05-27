//Declare System Variables

var scene;
var camera;
var renderer;
var controls;

var width = window.innerWidth;
var height = window.innerHeight;

//Setup the 3 main components: scene, camera, renderer
function setScene() {
    scene = new THREE.Scene();
    var ratio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(10, ratio, 0.1, 1000000);
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, 0);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

}

//Resize the scene and update the camera aspect to the screen ration
var resizeScene = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
};