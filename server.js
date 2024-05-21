// server.js
const express = require('express');
const { VoltageInput } = require('phidget22');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Phidget22 Signal Listener');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Phidget22 setup
const voltageInput = new VoltageInput();

voltageInput.onAttach = () => {
  console.log('Phidget22 device attached');
};

voltageInput.onVoltageChange = (voltage) => {
  console.log(`Voltage changed: ${voltage}`);
  if (voltage > 4) { // Adjust threshold as needed
    sendRequest();
  }
};

voltageInput.open().catch((err) => {
  console.error('Failed to open Phidget22 device:', err);
});

const sendRequest = () => {
  console.log('Sending request based on Phidget22 signal');
  axios.get('http://example.com/your-endpoint')
    .then(response => {
      console.log('Request successful:', response.data);
    })
    .catch(error => {
      console.error('Error sending request:', error);
    });
};
