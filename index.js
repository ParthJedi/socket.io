const express = require('express');
const socket = require('socket.io');

// app setup
const app = express();

const server = app.listen(7777, function () {
	console.log('server started');
});

app.use(express.static('public'));

// socket setup
var io = socket(server);

io.on('connection', function (socket) {
	console.log('socket connection established', socket.id);
});
