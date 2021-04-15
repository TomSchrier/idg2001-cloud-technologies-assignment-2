var mqtt = require('mqtt');
var colors = require('colors');

var client = mqtt.connect('mqtt://localhost:8080');
var topic = 'test';

client.on('message', (topic, message) => {
    message = message.toString()
    console.log(`I got: '${message.blue}' from the topic '${topic.yellow}'.`)
});

client.on('connect', () => {
    console.log('🟢 Subscriber is connected. \n'.green);
    client.subscribe(topic)
});