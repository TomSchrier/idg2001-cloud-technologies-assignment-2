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

    if (messageAsObj[0].v > 75 && messageAsObj[1].v > 20 && messageAsObj[2].v > 66) {
        console.log('🥵💦 Hot sweaty trash is ready to be picked up'.red);
    } else if (messageAsObj[0].v > 75 ) {
        console.log('Trash is full'.red);
    }




    console.log(`I got: '${messageAsObj}' from the topic '${topic.yellow}'.`)
});

