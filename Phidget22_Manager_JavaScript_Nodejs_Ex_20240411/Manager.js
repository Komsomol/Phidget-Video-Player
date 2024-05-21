/*
 * A manager is a class that monitors the channels attached to the system.
 *
 * The most basic use of a manager is to detect when channels attach, and when they detach.
 */

var phidget22 = require('phidget22');

var SERVER_PORT = 5661;

function main() {

	if (process.argv.length != 3) {
		console.log('usage: node Manager.js <server address>');
		process.exit(1);
	}

	var url = 'phid://' + process.argv[2] + ':' + SERVER_PORT;

	console.log('connecting to:' + url);
	var conn = new phidget22.Connection(url, { name: 'Server Connection', passwd: '' });
	conn.connect()
		.then(runExample.bind(conn))
		.catch(function (err) {
			console.error('Error running example:', err.message);
			process.exit(1);
		});
}

/*
 * Create the manager, assign the call back handlers and open the manager.
 */
function runExample() {

	manager = new phidget22.Manager();

	manager.onAttach = function (ch) {
		console.log(ch + ' attached');
	};

	manager.onDetach = function (ch) {
		console.log(ch + ' detached');
	};

	manager.open();
}

if (require.main === module)
	main();

