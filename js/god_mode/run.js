setScene();
addShapes();
createAsteroids();
createsaturnring();

//animate_cube();
//animate_sphere();
// animate_earth();
// animate_moon();
// animate_sun();
// animate_mercury();
// animate_venus();
// animate_mars();
//  animate_phobos();
//  animate_deimos();
// // animate_jupiter();
//  animate_io();
//  animate_europa();
//  animate_ganymede();
//  animate_callisto();
//  animate_Asteroids();
// // animate_saturn();
  animate_saturnring();
//  animate_titan();
//  animate_rhea();
//  animate_iapetus();
//  animate_dione();
// // animate_uranus();
//  animate_titania();
//  animate_oberon();
//  animate_umbriel();
//  animate_ariel();
// // animate_neptune();
//  animate_triton();
//animate_pluto();
animate_system();

renderScene();
updateTime();

createLight();
buildGui();

// Recenter camera
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('keydown', onDocumentKeyDown, false);

window.addEventListener('resize', resizeScene);