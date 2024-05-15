let lastState = false;
let isPlaying = false;

app = function() {
    console.log('JS up');
    // the port and local host are from phidgets server
    var conn = new phidget22.Connection(8989, 'localhost');
    var ch = new phidget22.DigitalInput();

    ch.onError = onError;
    ch.onPropertyChange = propChange;
    ch.onAttach = onAttach;

    conn.connect().then(function() {
        console.log('connected');
        ch.open().then(function(ch) {
            console.log('channel open');
        }).catch(function(err) {
            console.log('failed to open the channel:' + err);
        });
    }).catch(function(err) {
        alert('failed to connect to server:' + err);
    });
}

function onError(err) {
    console.log('Error: ' + err);
}

function propChange(key, value) {
    console.log('Property Changed: ' + key + ' ' + value);
}

function onAttach(ch) {
    console.log('Channel Attached');
    ch.onStateChange = onStateChange;
}

function onStateChange(state) {
    const video = document.getElementById('video');
    if (state && !lastState) {
        // Toggle the play/pause state
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        isPlaying = !isPlaying;
    }
    lastState = state;
}

window.onload = app;
