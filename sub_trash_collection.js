const mqtt = require('mqtt');
const xml2js = require('xml2js');
const colors = require('colors');

var client = mqtt.connect('mqtt://localhost:8080');
var topic = 'trash-level';

client.on('message', (topic, message) => {
    var message = message

    const xml = message.toString()

    xml2js.parseString(xml, (err, result) => {
        if (err) {
            throw err;
        } 
        const json = JSON.stringify(result, null, 4); // `result` is a JavaScript object. convert it to a JSON string 
        console.log(json);
    });


    console.log(`I got: '${message.blue}' from the topic '${topic.yellow}'.`)
});

client.on('connect', () => {
    console.log('🟢 Subscriber is connected. \n'.green);
    client.subscribe(topic)
});