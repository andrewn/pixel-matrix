pixel-matrix
===

1. Connect an LED matrix to your Arduino/Genuino
2. `npm install`
3. Run `TOPIC=<topic> npm start`
4. Watch as your matrix dances

## Deets

### Connect an LED matrix to your Arduino

I used one of [these cheap ones from eBay](http://www.ebay.co.uk/itm/141777360808). It has an MAX7219 chip and works over SPI.

I kind of followed [these Johnny Five instructions](http://johnny-five.io/examples/led-matrix/) but with different pins on the Uno.

|  Matrix | Uno   |
|---------|-------|
|  VCC    |  5V   |
|  GND    |  GND  |
|  DIN    |  11   |
|  CS     |  10   |
|  CLK    |  11   |

### Connect an LED matrix to your Pi

[Pin diagram here](http://pi.gadgetoid.com/pinout/spi) and [here](https://github.com/nebrius/raspi-io/wiki/Pin-Information).

|  Matrix | Fn           | Pin num | Name     |
|---------|--------------|---------|----------|
|  VCC    |  5V          | 4       | 5v power |
|  GND    |  GND         | 6       | Ground   |
|  DIN    |  SPI1 MOSI   | 38      | GPIO20   |
|  CS     |  SPI1 CE2    | 36      | GPIO16   |
|  CLK    |  SPI1 SCLK   | 40      | GPIO21   |

### Pick a topic and run it

The node process listens on the MQTT topic specified by the `TOPIC` environment variable. It falls back to the random `andrewn/game-of-life/state` topic if none is given.

[http://gameoflife.surge.sh]() is publishing to this topic.

On a Pi, you also need to:

    npm install raspi-io

And add the `PLATFORM=pi` flag to `npm start` like this:

     sudo TOPIC=<topic> PLATFORM=pi npm start

You can autorun on boot:

     sudo cp pixel-matrix.service /etc/systemd/system/
     sudo systemctl enable pixel-matrix

### Data format

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
