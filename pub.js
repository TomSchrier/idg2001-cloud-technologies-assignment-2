var mqtt = require('mqtt');
var colors = require('colors');
var json2xml = require('json2xml');

var client = mqtt.connect('mqtt://localhost:8080');
var topic = 'test';
var topic2 = 'fire';

var data = '{ "userInfo":{"name":"John", "age":31, "car":"Ford"} }';
var data2 = '{ "userInfo":{"name":"Jane", "age":25, "car":"BMW"} }';

client.on('connect', () => {
    console.log('\n🟢 Publisher is connected. \n'.green);

    setInterval(() => {
        /* var message = `Message sent from pub.js – ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}` */

        var jsonObj = JSON.parse(data); // Convert JSON string into Object
        var message = json2xml(jsonObj); // Convert to JSON to XML

        var jsonObj2 = JSON.parse(data2); // Convert JSON string into Object
        var message2 = json2xml(jsonObj2); // Convert to JSON to XML

        client.publish(topic, message.toString())
        client.publish(topic2, message2.toString())
        console.log('––– Message sent:', message.blue)
        console.log('––– Message sent:', message2.blue)
    }, 7000);

});