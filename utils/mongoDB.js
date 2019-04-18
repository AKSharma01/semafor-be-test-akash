"use strict";

const Mongoose = require('mongoose');
Mongoose.Promise = require('bluebird');

const options = {
	useNewUrlParser: true,
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	// If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0,
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};


console.log('mongo url is ' + process.env.MONGO_URL);

Mongoose.connect(process.env.MONGO_URL, options);
const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
	console.log("Connection with mongodb database succeeded. selltm");
});


db.candidate = require(rootDir + "/models/noSequel/candidate");
// console.log("db.candidate", db.candidate);
exports.db = db;