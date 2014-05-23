var express = require('express');
var fs = require('fs');
var amqp = require('amqp');

var app = express();

app.get('/', function(req, res) {
	fs.readFile('./views/index.html', function(err, file) {
		res.end(file);
	});
});

app.use("/public", express.static(__dirname + '/public'));

var server = app.listen(3000, function() {
	console.log("listening on 3000");
});


var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) { console.log("new socket"); });

var connection = amqp.createConnection({ host: "dev.bellycard.com" });

connection.on('ready', function() {
	console.log("connected to rabbit");

	connection.queue('my-queue', function(q) {
		console.log('queue');

		q.bind('my-exchange', 'checkins', function() {
			console.log('bound to exchange');
		});

		q.subscribe(function(message) {
			io.sockets.emit("checkin", message);
		});
	});
})
