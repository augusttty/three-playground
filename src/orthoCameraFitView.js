// Import stylesheets
import * as THREE from 'three';
// Write Javascript code!
// const appDiv = document.getElementById('app');
// appDiv.innerHTML = `<h1>JS Starter</h1>`;
function sandbox() {
  var colorSelectedLine = 0xe5dd48;
  var originalCameraPosition = new THREE.Vector3();

  var scene = new THREE.Scene();

  // CAMERA (ortographic)
  //
  var aspect = window.innerWidth / window.innerHeight;
  var viewHeight = 15;
  var viewWidth = viewHeight * aspect;
  var camera = new THREE.OrthographicCamera(
    viewWidth / -2,
    viewWidth / 2,
    viewHeight / 2,
    viewHeight / -2,
    1,
    1000
  );
  // position.z not really important for otographic camera, except to fit objects between near/far frustum planes
  camera.translateZ(15);
  // save this to reset to original position on mouse up
  originalCameraPosition.copy(camera.position);

  scene.add(camera);

  // GRID HELPER
  //
  var gridHelper = new THREE.GridHelper(10, 10);
  gridHelper.geometry.rotateX(-Math.PI / 2);
  scene.add(gridHelper);

  // OBJECT
  //
  var ellipse = createEllipse(1, 2);
  scene.add(ellipse);

  // RENDERER
  //
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  const box = document.getElementById('app');
  box.appendChild(renderer.domElement);

  // LISTENERS
  //
  window.addEventListener('mousedown', onMouseDown, false);
  window.addEventListener('mouseup', onMouseUp, false);

  // PRIVATE FUNCTIONS
  //
  function onMouseDown(event) {
    // center camera on the object (ellipse in this case)
    var boundingSphere = ellipse.geometry.boundingSphere;
    camera.position.copy(boundingSphere.center);
    camera.position.z = 15;

    // aspect equals window.innerWidth / window.innerHeight
    if (aspect > 1.0) {
      // if view is wider than it is tall, zoom to fit into height
      camera.zoom = viewHeight / (boundingSphere.radius * 2);
    } else {
      // if view is taller than it is wide, zoom to fit into width
      camera.zoom = viewWidth / (boundingSphere.radius * 2);
    }

    camera.updateProjectionMatrix();
  }

  function onMouseUp(event) {
    // restore original camera position and zoom
    camera.position.copy(originalCameraPosition);
    camera.zoom = 1.0;

    camera.updateProjectionMatrix();
  }

  function createEllipse(x, y) {
    // CALCULATES ELLIPSE POINTS
    //
    var curve = new THREE.EllipseCurve(
      x,
      y, // ax, aY
      6,
      6, // xRadius, yRadius
      0,
      2 * Math.PI, // aStartAngle, aEndAngle
      false, // aClockwise
      0 // aRotation
    );

    // CREATES AN ARRAY OF CURVES FROM POINTS, A PATH
    //
    var path = new THREE.Path(curve.getPoints(50));

    // CREATES A GEOMETRY FROM THE PATH
    //
    var geometry = path.createPointsGeometry(50);
    var material = new THREE.LineBasicMaterial({ color: colorSelectedLine });

    // FINAL OBJECT IS A LINE(S)
    //
    var ellipse = new THREE.Line(geometry, material);

    return ellipse;
  }

  function render() {
    renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  animate();
}

sandbox();
