/*
 * Implement an application that simulates an auditor listening to music being played.
 * The music played is a UDP signal that is multicasted.
 * The application has to identify the musician and the instrument played.
 * The application provides the information of the active musicians via a TCP connection.
 */
 
var net = require('net');
var dgram = require('dgram');
var moment = require('moment');
var process = require('process');

const orchestra = require('./orchestra-protocol.js');

// List of active musicians.
var musicians = new Map();

// Listen to UDP signals.
var socketUDP = dgram.createSocket('udp4');

socketUDP.bind(orchestra.PORT, function() { 
	console.log("Listening to multicast on port :" + orchestra.PORT);
	socketUDP.addMembership(orchestra.IP_MULTICAST);
});

// For each signal received.
socketUDP.on('message', function(msg, source) {
	console.log("Data received : " + msg);
	const message = JSON.parse(msg);
	
	// Expect an unique id and a sound.
	var musician = {
		uuid: message.uuid,
		instrument: orchestra.SOUNDS.get(message.sound),
		activeSince: moment().format()
	};
	
	musicians.set(message.uuid, musician);
});

// Listen to TCP request.
var socketTCP = net.createServer();

socketTCP.listen(orchestra.PORT, console.log("TCP server is running"));

// For each signal received.
socketTCP.on('connection', function(client) {
	console.log("Connection received");
	
	// Update list musicians. Delete those that have been silent beyond a time limit.
	musicians.forEach((value, key) => {
		if (moment().diff(value.activeSince, 'seconds') >= orchestra.TIMEOUT) {
			musicians.delete(key);
		}
	});
	
	// return the list of active musicians.
	console.log("Data send : " + JSON.stringify(Array.from(musicians.values())))
	client.write(Buffer.from(JSON.stringify(Array.from(musicians.values()))));
	
	client.destroy();
});
