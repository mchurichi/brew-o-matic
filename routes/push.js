
var io = require('socket.io');

var util = require("../public/js/util/util.js");

var _socket = [];

exports.initOn = function(app) {
	var i = io.listen(app);
	i.sockets.on("connection", function(socket) {
		console.log("INFO", "WebSocket start");
		_socket.push(socket);
		
		socket.on('disconnect', function () {
		    util.Arrays.remove(_socket,socket);
		});
	});
};

exports.emit = function(id, data) {
	for ( var i=0; i<_socket.length; i++ ) {
		_socket[i].volatile.emit(id, data);	
	}
	
};