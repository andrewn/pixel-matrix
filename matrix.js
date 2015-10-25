var five = require('johnny-five'),
    mqtt = require('mqtt');

var io, config;

// Allow running Johnny Five on Pi
if (process.env.PLATFORM === 'pi') {
  try {
    config = require('./config/pi.json');
    var RaspiIO = require('raspi-io');
    io = new RaspiIO();
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.error('pi platform specified but "raspi-io" module not found');
      console.error('Install: npm install raspi-io');
      process.exit();
    }
  }
} else {
  config = require('./config/arduino.json');
}

var topic = process.env.TOPIC || 'andrewn/game-of-life/state';

if (!process.env.TOPIC) {
  console.warn('No TOPIC environment variable set falling back to "%s"', topic);
}

var board = new five.Board({ io: io, repl: false });

board.on("ready", function() {
  var client = mqtt.connect({
    host: 'test.mosquitto.org'
  });

  var matrix = new five.Led.Matrix(config);

  client.on('connect', function () {
    client.subscribe(topic);
  });

  client.on('message', function (topic, payload) {
    var image = JSON.parse(payload);
    matrix.draw(image);
  });

  matrix.on();

});
