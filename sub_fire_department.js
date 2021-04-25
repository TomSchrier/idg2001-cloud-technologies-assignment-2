const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:8080');
const colors = require('colors');
const fireTopic = 'fire';
const helpers = require('./helpers');
const parser = require('xml2json');

//When the broker has a message with the 'fire' topic run this code:
client.on('message', (fireTopic, message) => {

    //convert XML to JSON
    message = message.toString()
    var json = parser.toJson(message);
    var JSONObject = JSON.parse(json);

    //check if the 'isBurning' value is true, if so, log it to the console with a time stamp.
    if (JSONObject.fireSensorData.bv == 'true') {
        console.log(`\n🔥 Dumpster fire detected! – (${helpers.readableDate(JSONObject.fireSensorData.t)}) \n`.red);
    }
});

client.on('connect', () => {
    console.log('🟢 Subscriber is connected. \n'.green);
    client.subscribe(fireTopic)
});