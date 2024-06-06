const phidget22 = require('phidget22');

async function runExample() {
	phidget22.Log.enable(phidget22.LogLevel.INFO);
	const conn = new phidget22.NetworkConnection(5661, 'localhost');
	try {
		await conn.connect();
	} catch(err) {
		console.error('Error during connect', err);
		process.exit(1);
	}

	//Create your Phidget channels
	const voltageInput0 = new phidget22.VoltageInput();

    const digtalInput0 = new phidget22.DigitalInput();

	//Set addressing parameters to specify which channel to open (if any)

	//Assign any event handlers you need before calling open so that no events are missed.
	voltageInput0.onVoltageChange = (voltage) => {
		console.log('Voltage: ' + voltage.toString());
	};

    digtalInput0.onStateChange = (state) => {
        console.log('State: ' + state.toString());
    }

    digtalInput0.onError = (code, description) => {
        console.log('Description: ' + description.toString());
        console.log('----------');
    }

	voltageInput0.onAttach = () => {
		console.log('Attach! VoltageInput0');
	};

	voltageInput0.onDetach = () => {
		console.log('Detach!');
	};

	voltageInput0.onError = (code, description) => {
		console.log('Description: ' + description.toString());
		console.log('----------');
	};

	//Open your Phidgets and wait for attachment
	try {
		await voltageInput0.open(5000);
	} catch(err) {
		console.error('Error during open', err);
		process.exit(1);
	}

	//Do stuff with your Phidgets here or in your event handlers.

	// setTimeout(async () => {
	// 	//Close your any Phidgets and connections once the program is done.
	// 	await voltageInput0.close();
	// 	conn.close();
	// 	conn.delete();
	// }, 5000);
}

runExample();