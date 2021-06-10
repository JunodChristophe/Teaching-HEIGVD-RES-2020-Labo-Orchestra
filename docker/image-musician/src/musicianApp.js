/*
 * Implement an application that simulates a musician who plays music at regulat interval.
 * The sound is based on an instrument initially given by parameter.
 * The music is a UDP signal that multicasts to anyone who listens to.
 */
 
var dgram = require('dgram');
var socket = dgram.createSocket('udp4')
var process = require('process');

const orchestra = require('./orchestra-protocol.js');
const { v4: uuidGenerator } = require('uuid')

// Error if wrong number of arguments.
if (process.argv.length != 3) {
	console.log("Invalid arguments number");
	process.exit(1);
}

// Get the instrument in parameter.
var instrumentParam = process.argv[2];

// Error if the instrument name is unsupported.
if (orchestra.INSTRUMENTS.has(instrumentParam) != true) {
	console.log("Invalid instrument");
	process.exit(1);
}

// An musician has an id and play a sound with his instrument.
var musician = {
	uuid: uuidGenerator(),
	sound: orchestra.INSTRUMENTS.get(instrumentParam)
};

var payload = Buffer.from(JSON.stringify(musician));

function playMusic() {
	socket.send(payload, 0, payload.length, orchestra.PORT, orchestra.IP_MULTICAST, console.log("Data send : " + payload));
}

// Send a signal at regular interval.
setInterval(playMusic, orchestra.INTERVAL);