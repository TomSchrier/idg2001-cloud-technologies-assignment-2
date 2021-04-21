var mqtt = require('mqtt');
var colors = require('colors');
var json2xml = require('json2xml');
var client = mqtt.connect('mqtt://localhost:8080');

var topic = 'trash-level';

client.on('connect', () => {
    console.log('\n🟢 Publisher is connected. \n'.green);

    function generateRandomFullness() {
        return Math.floor(Math.random() * 101); // number between 0 and 100
    }

    function generateRandomTemperature() {
        return Math.floor(Math.random() * 30);
    }

    function generateHumidity() {
        return Math.floor(Math.random() * 101); // number between 0 and 100
    }

    function generateIsBurning() {
        return Math.random() < 0.1 // 10% chance for fire = true
    }

    function getTime() {
        return Date.now();
    }

    setInterval(() => {
        var data = [
            { "n": "fullnessSensor", "u": "Percent", "t": getTime(), "v": generateRandomFullness() },
            { "n": "temperatureSensor", "u": "Cel", "t": getTime(), "v": generateRandomTemperature() },
            { "n": "humiditySensor", "u": "Percent", "t": getTime(), "v": generateHumidity() },
            { "n": "fireSensor", "u": "Boolean", "t": getTime(), "bv": generateIsBurning() }
        ]

        var jsonObj = JSON.parse(data); // Convert JSON string into Object
        var message = json2xml(jsonObj); // Convert to JSON to XML

        client.publish(topic, message.toString())
        console.log('––– Message sent:', message.blue)
    }, 7000);

});