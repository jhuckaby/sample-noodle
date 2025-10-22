// Sample App API

var os = require('os');

module.exports = {
	
	startup: function(callback) {
		// A worker child is starting up
		callback();
	},
	
	handler: function(args, callback) {
		// Send JSON response
		callback({
			code: 0,
			query: args.query,
			random: Math.random(),
			description: "Hello there!",
			hostname: os.hostname(),
			pid: process.pid
		});
	},
	
	shutdown: function(callback) {
		// Worker child is shutting down
		callback();
	}
	
};
