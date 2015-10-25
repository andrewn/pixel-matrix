var five = require("johnny-five"),
    mqtt = require('mqtt');

var topic = process.env.TOPIC || 'andrewn/game-of-life/state';

if (!process.env.TOPIC) {
  console.warn('No TOPIC environment variable set falling back to "%s"', topic);
}

var board = new five.Board({ repl: false });

board.on("ready", function() {
  var client = mqtt.connect({
    host: 'test.mosquitto.org'
  });

  var matrix = new five.Led.Matrix({
    pins: {
      data: 11,//2,
      clock: 13,//3,
      cs: 10//4
    }
  });

  client.on('connect', function () {
    client.subscribe(topic);
  });

  client.on('message', function (topic, payload) {
    var image = JSON.parse(payload);
    matrix.draw(image);
  });

  matrix.on();

});
