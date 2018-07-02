


$( document ).ready(function() {  
}); /* END doc ready */


// source: https://steemit.com/utopian-io/@clayjohn/learning-3d-graphics-with-three-js-or-dynamic-geometry


var renderer = new THREE.WebGLRenderer({ canvas : document.getElementById('myCanvas'), antialias:true});
// default bg canvas color //
renderer.setClearColor(0x7b7b7b);
//  use device aspect ratio //
renderer.setPixelRatio(window.devicePixelRatio);
// set size of canvas within window //
renderer.setSize(window.innerWidth, window.innerHeight);




var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// create ambient lighting, params -> color, intensity
var light = new THREE.AmbientLight(0xffffff, 0.5)
// add light to scene
scene.add(light)

// create point lighting, params -> color, intensity
var light1 = new THREE.PointLight(0xffffff, 0.5)
// add light to scene
scene.add(light1)




var sphere_geometry = new THREE.SphereGeometry(1, 128, 128);
var material = new THREE.MeshNormalMaterial();


// var material = new THREE.MeshLambertMaterial({ 
//  color: 0xF3FFE2,
//  emissive: 0xff0000,
//  emissiveIntensity: 0.1,
//  /*side: THREE.BackSide,*/
//  map: new THREE.TextureLoader().load('img/test.png'),
//  side:THREE.DoubleSide
// });

var sphere = new THREE.Mesh(sphere_geometry, material);
scene.add(sphere);


var update = function() {

  var time = performance.now() * 0.001;
  //console.log(time)

  //go through vertices here and reposition them 
  var k = 4;
  for (var i = 0; i < sphere.geometry.vertices.length; i++) {
      var p = sphere.geometry.vertices[i];
      p.normalize().multiplyScalar(1 + 0.3 * noise.perlin3(p.x * k + time, p.y * k, p.z * k));
  }
  sphere.geometry.computeVertexNormals();
  sphere.geometry.normalsNeedUpdate = true;
  sphere.geometry.verticesNeedUpdate = true;


}

function animate() {
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  update();
  /* render scene and camera */
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}


requestAnimationFrame(animate);


