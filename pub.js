var mqtt = require('mqtt');
var colors = require('colors');
var json2xml = require('json2xml');

var client = mqtt.connect('mqtt://localhost:8080');
var topic = 'test';

var data = '{ "userInfo":{"name":"John", "age":31, "car":"Ford"} }';

client.on('connect', () => {
    console.log('\n🟢 Publisher is connected. \n'.green);

    setInterval(() => {
        /* var message = `Message sent from pub.js – ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}` */

        var jsonObj = JSON.parse(data); // Convert JSON string into Object
        var message = json2xml(jsonObj); // Convert to JSON to XML

        client.publish(topic, message.toString())
        console.log('––– Message sent:', message.blue)
    }, 7000);

});