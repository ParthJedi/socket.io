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

	socket.on('discuss', function (data) {
		io.sockets.emit('discuss', data);
	});

	socket.on('typing', function (data) {
		socket.broadcast.emit('typing', data);
	});

	socket.on('success', function () {
		socket.broadcast.emit('success');
	});
});
