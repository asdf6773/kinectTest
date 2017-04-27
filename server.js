var Kinect2 = require('kinect2');
var express = require('express');
var app = express();
var socket = require('socket.io');
var server = app.listen(8888);
var io = socket(server);
console.log('Listening to port 8888');
var kinect = new Kinect2();

app.use(express.static(__dirname + '/public'))

if (kinect.open()) {
    console.log("Kinect Opened");
    //listen for body frames
    kinect.on('bodyFrame', function(bodyFrame) {
        for (var i = 0; i < bodyFrame.bodies.length; i++) {
            if (bodyFrame.bodies[i].tracked) {
                //  console.log(bodyFrame.bodies[i].joints.length);
                io.of('/').emit('bodyData', bodyFrame.bodies[i]);
            }
        }
    });
    app.get('/', function(req, res) {
        res.sendFile(__dirname + "/public/index.html");
    })
    kinect.openBodyReader();
}
