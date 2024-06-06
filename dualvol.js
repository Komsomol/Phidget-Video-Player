const phidget22 = require('phidget22');

// Global arrays for channel management
var digitalInput = []; // Digital input
var voltageInput = []; // Voltage input

async function main() {
    // this is defined by the server running the phidget controller
    let conn = new phidget22.Connection(5661, 'localhost');

    try {

        const voltageInput_1 = new phidget22.VoltageInput();
        const voltageInput_2 = new phidget22.VoltageInput();
       

        voltageInput_1.setDeviceSerialNumber(506736);
        voltageInput_2.setDeviceSerialNumber(506736);

        voltageInput_1.onAttach = (ch) => console.log(`${ch} attached`);
        voltageInput_1.onDetach = () => console.log('Detach!');

        voltageInput_1.onError = (code, description) => {
            console.log('Description: ' + description.toString());
            console.log('----------');
        }

        voltageInput_1.onVoltageChange = (voltage) => {
            console.log('Voltage: ' + voltage.toString());
        }

        voltageInput_2.onAttach = (ch) => console.log(`${ch} attached`);
        voltageInput_2.onDetach = () => console.log('Detach!');
        voltageInput_2.onError = (code, description) => {
            console.log('Description: ' + description.toString());
            console.log('----------');
        }

        voltageInput_2.onVoltageChange = (voltage) => {
            console.log('Voltage: ' + voltage.toString());
        }

    

        // Connect to the Phidget server
        await conn.connect();
        console.log('connected');

        // Open the digital input and voltage input channels
        await digitalInput[0].open();
        for (let i = 0; i < 2; i++) {
            await voltageInput[i].open();
        }

        // close  on exit
        process.on('SIGINT', async () => {
            console.log('closing');
            await digitalInput[0].close();
            for (let i = 0; i < 2; i++) {
                await voltageInput[i].close();
            }
            conn.close();
            conn.delete();
            process.exit(0);
        });
    } catch (err) {

        console.error('Failed to connect or open channel:', err);
    }
}

main();
