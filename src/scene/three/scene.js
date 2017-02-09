import createLoop from 'raf-loop'
import THREE from './three'
const OrbitControls = require('three-orbit-controls')(THREE)
import Field from './field'
import SceneObject from './sceneObject'
import VideoPlayer from './videoPlayer';

const { Vector2, Vector3 } = THREE

const MAX_X = 60
const MAX_Y = 60
const MAX_Z = 700

export default function Scene(target, elements) {
  var camera, scene, renderer, controls, width, height;

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 0;

  //controls = new OrbitControls(camera)

  scene = new THREE.Scene();
  renderer = new THREE.CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'absolute';
  target.appendChild(renderer.domElement);

  const sceneObjects = [];
  const videoPlayers = [];

  elements.forEach(obj => {
    var object = new THREE.CSS3DObject(obj.domNode);
    object.element.classList.add('youtube-video');
    scene.add(object);
    sceneObjects.push(new SceneObject(object));
    videoPlayers.push(new VideoPlayer(obj.domNode))
    resetParticles(sceneObjects[sceneObjects.length - 1], videoPlayers.length)
  })


  const loop = createLoop(render).start();
  window.addEventListener('resize', resize, false);
  window.addEventListener('mousemove', onMouseMove, false);
  resize();

  var fields = []


  function resetParticles(sceneObjects, i = 1) {
    sceneObjects.position.x = Math.random() * MAX_X - MAX_X / 2
    sceneObjects.position.y = Math.random() * MAX_Y - MAX_Y / 2
    sceneObjects.position.z = Math.random() * MAX_Z - (MAX_Z * i + Math.random() * MAX_Z)
  }

  function plotParticles() {
    // a new array to hold particles within our bounds
    for (var i = 0; i < sceneObjects.length; i++) {
      var particle = sceneObjects[i];
      var player = videoPlayers[i];
      var pos = particle.position;
      /*
            // If we're out of bounds, drop this particle and move on to the next
            if (pos.x < -1000 || pos.x > 1000 || pos.y < -1000 || pos.y > 1000){
              //particle.reset()
              resetParticles(particle)
              continue;
            }

            // Update velocities and accelerations to account for the fields
            //particle.submitToFields(fields);
            particle.update(fields);*/

      // Move our sceneObjects
      particle.move();
      player.update(particle.position)
    }
  }

  function onMouseMove(e) {
    const x = e.pageX / width - 0.5
    const y = e.pageY / height - 0.5
    fields = [new Field(new Vector2(x, y), 1.001)]
  }

  function resize() {
    width = target.offsetWidth
    height = target.offsetHeight
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function render(dt) {
    plotParticles()
    renderer.render(scene, camera);
  }

  setTimeout(()=>{
    videoPlayers[0].play()
  },4000)
}
