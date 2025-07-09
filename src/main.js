import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { loadAlphabeticTimeIndices, getTimeIndex } from './timeIndices.js';
import * as TFUNC from './timefuncs.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth /
    window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const plane = new THREE.PlaneGeometry(8, 8);
const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const mesh = new THREE.Mesh(plane, material);
mesh.position.z = -1
scene.add(mesh);

const alphabeticTimeIndices = loadAlphabeticTimeIndices('./src/alphanums_out.json');
const transitionDuration = 0.5;
let lastUpdateTime = performance.now();
let hourFrom = 0, hourTo = 0;
let minuteFrom = 0, minuteTo = 0;
let secondFrom = 0, secondTo = 0;

function updateTimeTargets() {
    const now = new Date();
    const hour = TFUNC.getCurrentHour12();
    const minute = TFUNC.getCurrentMinute();
    const second = TFUNC.getCurrentSecond();

    const alphaHour = getTimeIndex('hours', hour);
    const alphaMinute = getTimeIndex('minutes', minute);
    const alphaSecond = getTimeIndex('minutes', second);

    hourFrom = hourTo;
    minuteFrom = minuteTo;
    secondFrom = secondTo;

    hourTo = -TFUNC.getHourAngle(alphaHour);
    minuteTo = -TFUNC.getMinuteAngle(alphaMinute);
    secondTo = -TFUNC.getSecondAngle(alphaSecond);

    lastUpdateTime = performance.now();
}
setInterval(updateTimeTargets, 1000);
updateTimeTargets();

const loader = new GLTFLoader();
let clockBody = null
loader.load('./public/Body.glb',
    function (gltf) {
        clockBody = gltf.scene;
        clockBody.position.set(0, 0, 0);
        clockBody.rotation.set((Math.PI / 2), 0, 0)

        scene.add(clockBody);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);
let clockFace = null
loader.load('./public/Face.glb',
    function (gltf) {
        clockFace = gltf.scene;
        clockFace.position.set(0, 0, 0);
        clockFace.rotation.set((Math.PI / 2), 0, 0)

        scene.add(clockFace);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);
let clockHourHand = null
loader.load('./public/HourHand.glb',
    function (gltf) {
        clockHourHand = gltf.scene;
        clockHourHand.position.set(0, 0, 0);
        clockHourHand.rotation.set((Math.PI / 2), 0, 0)

        scene.add(clockHourHand);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);
let clockMinuteHand = null
loader.load('./public/MinuteHand.glb',
    function (gltf) {
        clockMinuteHand = gltf.scene;
        clockMinuteHand.position.set(0, 0, 0);
        clockMinuteHand.rotation.set((Math.PI / 2), 0, 0)

        scene.add(clockMinuteHand);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);
let clockSecondHand = null
loader.load('./public/SecondHand.glb',
    function (gltf) {
        clockSecondHand = gltf.scene;
        clockSecondHand.position.set(0, 0, 0);
        clockSecondHand.rotation.set((Math.PI / 2), 0, 0)

        scene.add(clockSecondHand);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 2, 1)
directionalLight.rotation.z = 2;
scene.add(ambientLight);

camera.position.z = 0.7;

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function animate() {
    const now = performance.now();
    const t = Math.min((now - lastUpdateTime) / (transitionDuration * 1000), 1);

    if (alphabeticTimeIndices) {
    
        if (clockHourHand) {
            clockHourHand.rotation.y = lerp(hourFrom, hourTo, t);
        }
        if (clockMinuteHand) {
            clockMinuteHand.rotation.y = lerp(minuteFrom, minuteTo, t);
        }
        if (clockSecondHand) {
            clockSecondHand.rotation.y = lerp(secondFrom, secondTo, t);
        }
    }
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);