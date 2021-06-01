setScene();
addShapes();
createAsteroids();
createsaturnring();

animate_Asteroids();

animate_saturnring();

animate_system();

//setShuttlePos();
//animate_shuttle();

animate_shuttle();

renderScene();
updateTime();

createLight();
//followShuttle();
//moveShuttle();



buildGui();
// Recenter camera
//document.addEventListener('mousedown', onDocumentMouseDown, false);
//document.addEventListener('keydown', onDocumentKeyDown, false);
//document.addEventListener('keyup', onDocumentKeyUp, false);

window.addEventListener('resize', resizeScene);