const mqtt = require('mqtt');
const colors = require('colors');
var client = mqtt.connect('mqtt://localhost:8080');
var fireTopic = 'fire';

//function to convert Date.now() to human readable time.
function readableDate(timestamp) {
    const dateObject = new Date(timestamp)
    const humanDateFormat = dateObject.toLocaleString() //DD.MM.YYYY, HH:MM:SS
    return humanDateFormat;
}

//When the broker has a message with the 'fire' topic run this code:
client.on('message', (fireTopic, message) => {
    message = message.toString()

    let messageAsObj = JSON.parse(message)

    //check if the 'isBurning' value is true, if so, log it to the console with a time stamp.
    if (messageAsObj[0].bv) {
        console.log(`\n🔥 Dumpster fire detected! – (${readableDate((messageAsObj[0].t))}) \n`.red)
    }
});

client.on('connect', () => {
    console.log('🟢 Subscriber is connected. \n'.green);
    client.subscribe(fireTopic)
});