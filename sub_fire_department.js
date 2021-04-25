const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:8080');
const colors = require('colors');
const fireTopic = 'fire';
const helpers = require('./helpers');

//When the broker has a message with the 'fire' topic run this code:
client.on('message', (fireTopic, message) => {
    message = message.toString()

    let messageAsObj = JSON.parse(message)

    //check if the 'isBurning' value is true, if so, log it to the console with a time stamp.
    if (messageAsObj[0].bv) {
        console.log(`\n🔥 Dumpster fire detected! – (${helpers.readableDate(messageAsObj[0].t)}) \n`.red);
    }
});

client.on('connect', () => {
    console.log('🟢 Subscriber is connected. \n'.green);
    client.subscribe(fireTopic)
});