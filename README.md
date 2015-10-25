pixel-matrix
===

1. Connect an LED matrix to your Arduino/Genuino
2. `npm install`
3. Run `TOPIC=<topic> npm start`
4. Watch as your matrix dances

## Deets

### Connect an LED matrix to your Arduino

I used one of [these cheap ones from eBay](http://www.ebay.co.uk/itm/141777360808). It has an MAX7219 chip and works over SPI.

I kind of followed [these Johnny Five instructions](http://johnny-five.io/examples/led-matrix/).

|  Matrix | Uno   |
|---------|-------|
|  VCC    |  5V   |
|  GND    |  GND  |
|  DIN    |  11   |
|  CS     |  10   |
|  CLK    |  11   |

### Pick a topic and run it

The node process listens on the MQTT topic specified by the `TOPIC` environment variable. It falls back to the random `andrewn/game-of-life/state` topic if none is given.

[http://gameoflife.surge.sh]() is publishing to this topic.

### Date format

Your topic must supply a JSON-encode multi-dimensional array representing each pixel in the matrix.

For example, this will draw a heart:

    image = JSON.stringify(
      [
        "01100110",
        "10011001",
        "10000001",
        "10000001",
        "01000010",
        "00100100",
        "00011000",
        "00000000"
      ]
    );
