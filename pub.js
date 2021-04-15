var mqtt = require('mqtt');
var colors = require('colors');

var client = mqtt.connect('mqtt://localhost:8080');
var topic = 'test';
var message = '';

client.on('connect', () => {
    console.log('🟢 Publisher is connected. \n'.green);

    setInterval(() => {
        var message = `Message sent from pub.js – ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

        client.publish(topic, message)
        console.log('––– Message sent:', message.blue)
    }, 7000);

});