/*
 * Include standard and third-party npm modules
 */
var dgram = require('dgram');
var socket = dgram.createSocket('udp4')
var process = require('process');

const instrumentsList = require('./instrumentsList.js');
const { v4: uuidGenerator } = require('uuid')

const IP_MULTICAST = "239.255.22.5"
const PORT = 2205
const INTERVAL = 1000

if (process.argv.length != 3) {
	console.log("Invalid arguments number");
	process.exit(1);
}

var instrumentParam = process.argv[2];

if (instrumentsList.has(instrumentParam) != true) {
	console.log("Invalid instrument");
	process.exit(1);
}

var musician = {
	uuid: uuidGenerator(),
	sound: instrumentsList.get(instrumentParam)
};

var payload = Buffer.from(JSON.stringify(musician));

function playMusic() {
	socket.send(payload, 0, payload.length, PORT, IP_MULTICAST, console.log("Data send : " + payload));
}

setInterval(playMusic, INTERVAL);