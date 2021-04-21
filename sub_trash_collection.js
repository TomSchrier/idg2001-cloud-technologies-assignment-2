const mqtt = require('mqtt');
const xml2js = require('xml2js');
const colors = require('colors');

var client = mqtt.connect('mqtt://localhost:8080');
var trashTopic = 'trash-level';

client.on('connect', () => {
    console.log('🟢 Trash subscriber is connected. \n'.green);
    client.subscribe(trashTopic)
});

await client.on('message', (topic, message) => {
    var message = message
    console.log(`I got: '${message.blue}' from the topic '${topic.yellow}'.`)
});

