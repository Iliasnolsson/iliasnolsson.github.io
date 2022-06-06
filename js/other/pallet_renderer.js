import * as THREE from '/node_modules/vite/deps/three.js?v=05030b91';
import { OrbitControls } from '/node_modules/vite/deps/three_examples_jsm_controls_OrbitControls_js.js?v=05030b91';
import SplineLoader from '/node_modules/vite/deps/@splinetool_loader.js?v=05030b91';

var scriptTag = document.getElementsByTagName('script');
scriptTag = scriptTag[scriptTag.length - 2];
var parent = scriptTag.parentNode;

// camera
const camera = new THREE.PerspectiveCamera(33, window.innerWidth / window.innerHeight, 5, 100000);
camera.position.set(0, 0, 1360.37);
camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

// scene
const scene = new THREE.Scene();
scene.background = null

// spline scene
const loader = new SplineLoader();
loader.load(
    'https://prod.spline.design/RUoE0eEXE7ZlMGFn/scene.splinecode',
    (splineScene) => {
        scene.add(splineScene);
    }
);

// renderer
var parentBounds = parent.getBoundingClientRect()
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(parentBounds.width, parentBounds.height)
renderer.setAnimationLoop(animate);
parent.appendChild(renderer.domElement);

// scene settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setClearColor(0x000000, 0);

// orbit controls
const controls = new OrbitControls(camera, parent.parentNode);
controls.enableDamping = true;
controls.enablePan = false
controls.enableZoom = false
controls.rotateSpeed = 0.12
controls.dampingFactor = 0.04;

function resizeRenderer() {
    var bounding = parent.getBoundingClientRect()
    camera.aspect = bounding.width / bounding.height;
    camera.updateProjectionMatrix();
    renderer.setSize(bounding.width, bounding.height);
}

var rendererResizeTimeoutId
rendererResizeTimeoutId = window.addEventListener('resize', () => {
    if (rendererResizeTimeoutId != undefined) {
        clearTimeout(rendererResizeTimeoutId)
    }
    rendererResizeTimeoutId = setTimeout(() => {
        resizeRenderer()
    }, 400)
});


var _targetRotation = {x: 0, y: 0}

function rotationForEvent(e) {
    var bounding = parent.getBoundingClientRect()
    var boundingCenterX = bounding.x + bounding.width / 2
    var boundingCenterY = bounding.y + bounding.height / 2

    var differenceX = e.clientX - boundingCenterX
    var differenceY = e.clientY - boundingCenterY
    
    var newX =  Math.min(0.16, Math.max(differenceY * 0.0007, -0.2) ) 
    var newY = Math.max(-0.15, differenceX * 0.0004)
    return {x: newX, y: newY}
}

var rotationTimoutId
window.addEventListener("mousemove", e => {
    _targetRotation = rotationForEvent(e)
})

var previousTime
function animate(time) {
    if (previousTime == undefined) {
        previousTime = time
    }
    var timeDifference = time - previousTime
    var differenceX = _targetRotation.x - scene.rotation.x
    var differenceY = _targetRotation.y - scene.rotation.y

    var changeX = differenceX * timeDifference * 0.0003
    var changeY = differenceY * timeDifference * 0.0003
    scene.rotation.x += changeX
    scene.rotation.y += changeY
    controls.update();

    renderer.render(scene, camera);
    previousTime = time
}

setTimeout(() => {
    resizeRenderer()
}, 400);