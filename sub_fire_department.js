const mqtt = require('mqtt');

const colors = require('colors');

var client = mqtt.connect('mqtt://localhost:8080');
var fireTopic = 'fire';

client.on('message', (fireTopic, message) => {
    message = message.toString()
    console.log(`I got: '${message.blue}' from the topic '${fireTopic.yellow}'.`)
});

client.on('connect', () => {
    console.log('🟢 Subscriber is connected. \n'.green);
    client.subscribe(fireTopic)
});