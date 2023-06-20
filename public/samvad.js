// connect backend socket
const socket = io.connect('http://localhost:7777/');

// get DOM elements
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');
const senderUser = document.getElementById('senderUser');
const message = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');

// add event listeners and emit events
sendBtn.addEventListener('click', function () {
	if (message.value) {
		socket.emit('discuss', {
			senderUser: senderUser.value,
			message: message.value
		});
		message.value = '';
		senderUser.disabled = true;
	}
	socket.emit('success');
});

message.addEventListener('keypress', function () {
	socket.emit('typing', senderUser.value);
});

// listen for socket events
socket.on('discuss', function (data) {
	output.innerHTML += `<p>${data.senderUser}: ${data.message}</p>`;
});

socket.on('typing', function (sender) {
	if (sender) feedback.innerHTML = `<p><em>${sender} is typing..</em></p>`;
});

socket.on('success', function () {
	feedback.innerHTML = '';
});
