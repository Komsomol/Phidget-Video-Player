const phidget22 = require('phidget22');

// Global arrays for channel management
var digitalInput = []; // Digital input
var voltageInput = []; // Voltage input

async function main() {
    // this is defined by the server running the phidget controller
    let conn = new phidget22.Connection(5661, 'localhost');

    try {
        // Initialize 1 digital input and 2 voltage inputs
        digitalInput.push(new phidget22.DigitalInput());
        
        for (let i = 0; i < 2; i++) {
            voltageInput.push(new phidget22.VoltageInput());
        }


        // Configure the digital input channel
        // Set the serial number of the device (read at the bottom of the device)
        digitalInput[0].setDeviceSerialNumber(506736);

        digitalInput[0].onAttach = (ch) => console.log(`${ch} attached`);
        digitalInput[0].onError = (arg0, arg1) => console.error(`Error: 0x${arg0.toString(16)}, ${arg1}`);
        digitalInput[0].onStateChange = (state) => {
            console.log(`Digital Input state: ${state}`);
            console.log('----------');
        } 

        console.log(digitalInput[0]);

        // Configure the voltage input channels
        for (let i = 0; i < 2; i++) {
            voltageInput[i].setDeviceSerialNumber(506736);
            voltageInput[i].onAttach = (ch) => {
                console.log(`${ch} attached`);
            };
            voltageInput[i].onError = (arg0, arg1) => console.error(`Error: 0x${arg0.toString(16)}, ${arg1}`);
            voltageInput[i].onVoltageChange = (voltage) => {
                console.log(`Voltage Input ${i} voltage: ${voltage}`);
            }
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
