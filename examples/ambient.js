/*********************************************
This ambient module example reports sound and
light levels to the console, and console.logs
whenever a specified light or sound level
trigger is met.
*********************************************/

// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

var tessel = require('tessel');
var ambient = require('../').use(tessel.port('A')); // Replace '../' with 'ambient-attx4' in your own code

ambient.on('ready', function(err, ambient) {
 // Get a stream of light data
  ambient.on('light', function(data) {
    console.log("Got some  light: ", data);
  });

  // Get a stream of sound level data
  ambient.on('sound', function(data) {
    console.log("Got some  sound: ", data);
  });

  // Set trigger levels
  // The trigger value is a float between zero to 1
  ambient.setLightTrigger(0.15);

  ambient.on('light-trigger', function(data) {
    console.log("Our light trigger was hit:", data);

    // Clear the trigger so it stops firing
    ambient.clearLightTrigger();
  });

  // Set a sound level trigger
  // The trigger is a float between 0 and 1
  ambient.setSoundTrigger(0.43);

  ambient.on('sound-trigger', function(data) {

    console.log("Something happened with sound: ", data);

    // Clear it
    ambient.clearSoundTrigger();
  });
});

ambient.on('error', function (err) {
  console.log(err)
});

setInterval(function() {}, 200);
