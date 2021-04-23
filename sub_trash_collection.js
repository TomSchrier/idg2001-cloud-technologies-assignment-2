const mqtt = require('mqtt');
const xml2js = require('xml2js');
const colors = require('colors');

var client = mqtt.connect('mqtt://localhost:8080');
var trashTopic = 'trash-level';

client.on('connect', () => {
    console.log('🟢 Trash subscriber is connected. \n'.green);
    client.subscribe(trashTopic)
});

client.on('message', (topic, message) => {
    var message = message
    let messageAsObj = JSON.parse(message)

    if (messageAsObj[0].v > 80) {
        console.log('Trash level is full (mood)');
    }
    console.log(`I got: '${messageAsObj}' from the topic '${topic.yellow}'.`)
});

