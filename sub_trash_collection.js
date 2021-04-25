const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:8080');
const colors = require('colors');
const helpers = require('./helpers');
const trashTopic = 'trash-level';

//When the broker has a message with the 'trash-level' topic run this code:
client.on('message', (topic, message) => {
    var message = message
    let messageAsObj = JSON.parse(message)

    trashLevel = messageAsObj[0].v;
    temperature = messageAsObj[1].v;
    humidity = messageAsObj[2].v;

    if (trashLevel > 50 && temperature > 20 && humidity > 50) {
        console.log('🥵💦 Hot, sweaty trash is ready to be picked up.'.red);

    } else if (trashLevel >= 80) {
        console.log(`Trash is full. It can be collected. (${helpers.readableDate(messageAsObj[0].t)})`.red);

    } else if (trashLevel > 50 && trashLevel < 79){
        console.log(`The trash can is soon full. (Fullness level: ${trashLevel}%).`.yellow);

    } else {
        console.log(`The trash can is not full. (Fullness level: ${trashLevel}%).`.green);
    }
});

client.on('connect', () => {
    console.log('🟢 Trash subscriber is connected. \n'.green);
    client.subscribe(trashTopic)
});