const THREE = require('three');
var createApp = require('./createApp')
var app = createApp({
    antialias: true
});
var bodyData;
var createLoop = require('raf-loop')
var MAX_POINTS = 1000;
var geometry = new THREE.BufferGeometry();
var positions = new Float32Array(MAX_POINTS * 3);
var attrib = new THREE.BufferAttribute(positions, 3);
var uniforms = {}
var vShader = $('#vertexshader');
var fShader = $('#fragmentshader');
var ran = [];
for (var i = 0; i < MAX_POINTS; i++) {
    ran.push(10 * Math.random())
}
var shaderMaterial = new THREE.ShaderMaterial({ //6
    uniforms: uniforms,
    vertexShader: vShader.text(),
    fragmentShader: fShader.text()
});


geometry.addAttribute('position', attrib);
var starsMaterial = new THREE.MeshBasicMaterial({
    color: 0x888888,
    opacity: 0.5
})
starsMaterial.transparent = true
var point = new THREE.Mesh(geometry, starsMaterial);
app.scene.add(point);
positions = point.geometry.attributes.position.array;
var index = 0;
for (var i = 0, l = MAX_POINTS; i < l; i++) {
    //    opacity[i] = 0.5;
    positions[index++] = 0;
    positions[index++] = 0;
    positions[index++] = 0;
}
geometry.setDrawRange(0, 10000);
var time = 0;
createLoop(function(dt) {

    time += dt / 1000;
    index = 0;
    // if (bodyData) {
    //     for (var i = 0; i < MAX_POINTS; i++) {
    //         positions[index++] = bodyData.joints[i % 25].cameraX * 20 + 5 * Math.random();
    //         positions[index++] = bodyData.joints[i % 25].cameraY * 20 + 5 * Math.random();
    //         positions[index++] = bodyData.joints[i % 25].cameraZ * 20 + 5 * Math.random();
    //     }
    // }
    if (bodyData) {
        for (var i = 0; i < MAX_POINTS/25; i++) {
            positions[index++] = bodyData.joints[0].cameraX * 20
            positions[index++] = bodyData.joints[0].cameraY * 20
            positions[index++] = bodyData.joints[0].cameraZ * 20

            positions[index++] = bodyData.joints[1].cameraX * 20
            positions[index++] = bodyData.joints[1].cameraY * 20
            positions[index++] = bodyData.joints[1].cameraZ * 20

            positions[index++] = bodyData.joints[2].cameraX * 20
            positions[index++] = bodyData.joints[2].cameraY * 20
            positions[index++] = bodyData.joints[2].cameraZ * 20

            positions[index++] = bodyData.joints[12].cameraX * 20
            positions[index++] = bodyData.joints[12].cameraY * 20
            positions[index++] = bodyData.joints[12].cameraZ * 20

            positions[index++] = bodyData.joints[16].cameraX * 20
            positions[index++] = bodyData.joints[16].cameraY * 20
            positions[index++] = bodyData.joints[16].cameraZ * 20

            positions[index++] = bodyData.joints[4].cameraX * 20
            positions[index++] = bodyData.joints[4].cameraY * 20
            positions[index++] = bodyData.joints[4].cameraZ * 20

            positions[index++] = bodyData.joints[8].cameraX * 20
            positions[index++] = bodyData.joints[8].cameraY * 20
            positions[index++] = bodyData.joints[8].cameraZ * 20

            positions[index++] = bodyData.joints[20].cameraX * 20
            positions[index++] = bodyData.joints[20].cameraY * 20
            positions[index++] = bodyData.joints[20].cameraZ * 20

        }
    }
        // point.drawMode = THREE.TriangleFanDrawMode
    geometry.attributes.position.needsUpdate = true;
    geometry.setDrawRange(0, MAX_POINTS);
    app.updateProjectionMatrix();
    app.camera.position.set(0, 0, 100);
    app.renderer.render(app.scene, app.camera);
    app.frame += 0.1;
    //  console.log(app.frame)
}).start();

// alert("tttt");


var socket = io.connect('http://127.0.0.1:8888/')
socket.on('bodyData', getData)

function getData(data) {
    bodyData = data;
    console.log(data);
}
