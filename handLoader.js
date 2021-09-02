if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer;

init();

function init() {

  scene = new THREE.Scene();
  scene.add( new THREE.AmbientLight( 0x999999) );

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100 );

  //x Z is up for objects intended to be 3D printed.

  camera.up.set( 0, 0, 1 );
  camera.position.set( 0, 21 , 6);

  camera.add( new THREE.PointLight( 0xffffff, 0.8) );

  scene.add( camera );

  var grid = new THREE.GridHelper( 10, 10, 0xffffff, 0x555555 );
  grid.rotateOnAxis( new THREE.Vector3( 1, 0, 0 ), 90 * ( Math.PI/180 ) );
  scene.add( grid );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xFFCE33 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var loader = new THREE.STLLoader();


  // Binary files

  var material = new THREE.MeshPhongMaterial( { color: 0x0e2044, specular: 0x111111, shininess: 200 } );
  loader.load( './models/Shoulder_Bone.stl', function ( geometry ) {
    var mesh = new THREE.Mesh( geometry, material );

    // mesh.position.set( 1, -2, 16 );
    mesh.position.set( 1, -2, 16);
    mesh.rotation.set( 0,0,0);
    mesh.scale.set( .02, .02, .02 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add( mesh );
    render();
  });

  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );
  controls.target.set( 0, 1.2, 2 );
  controls.update();
  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();

}

function render() {

  renderer.render( scene, camera );

}
