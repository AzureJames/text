import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
// import droidTypeface from '../node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

/*font*/
// const fontLoader = new THREE.FontLoader();
const loader = new FontLoader;
loader.load('droid_sans_bold.typeface.json', (font)=>{
    const textGeometry = new TextGeometry(
        'Droid Bold Font',
        {
            font: font,
            size: 0.5,
            height: 0.2,
            curveSegments: 2,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 2
        }
    )
    const textMaterial = new THREE.MeshLambertMaterial({color:'orange'})
    // textMaterial.wireframe = true;
    const text = new THREE.Mesh(textGeometry, textMaterial)
    text.position.x = 1;

    scene.add(text)
})

loader.load('helvetiker_regular.typeface.json', (font)=>{
    const textGeometry2 = new TextGeometry(
        'Helvetiker Font',
        {
            font: font,
            size: 0.5,
            height: .02,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0,
            bevelOffset: 0,
            bevelSegments: 6
        }
    )
    const textMaterial2 = new THREE.MeshLambertMaterial({color:'red'})
    // textMaterial2.wireframe = true;
    const text = new THREE.Mesh(textGeometry2, textMaterial2)
    text.position.y = -1;

    scene.add(text)
})

let light1 = new THREE.PointLight('white',4);
light1.position.set(-2,2,-2);
let light2 = new THREE.PointLight('white',4);
light2.position.set(2,-2,2);
scene.add(light2);
scene.add(light1);
scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()