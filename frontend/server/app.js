
const express = require('express');


const app = express();

// app.use(express.static(__dirname + "/dist/"));
//app.use(express.static("../dist/"));

const server = app.listen(3001, function() {
    console.log('server running on port 3001');
});


const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data)
    });
});