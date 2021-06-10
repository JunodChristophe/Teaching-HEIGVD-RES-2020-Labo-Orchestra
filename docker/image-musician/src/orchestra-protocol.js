/*
 * General information for the communication between the musicians and the auditor.
 */
 
var instrumentsList = new Map();
instrumentsList.set("piano", "ti-ta-ti");
instrumentsList.set("trumpet", "pouet");
instrumentsList.set("flute", "trulu");
instrumentsList.set("violin", "gzi-gzi");
instrumentsList.set("drum", "boum-boum");
var soundsList = new Map(Array.from(instrumentsList, i => i.reverse()));

module.exports.INSTRUMENTS = instrumentsList;
module.exports.SOUNDS = soundsList;
exports.IP_MULTICAST = "239.255.22.5";
exports.PORT = 2205;
exports.TIMEOUT = 5; // seconds
exports.INTERVAL = 1000; // milliseconds