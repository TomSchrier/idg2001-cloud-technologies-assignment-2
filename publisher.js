const mqtt = require('mqtt');
const colors = require('colors');
const json2xml = require('json2xml');
const client = mqtt.connect('mqtt://localhost:8080');

const trashTopic = 'trash-level';
const fireTopic = 'fire';

client.on('connect', () => {
    console.log('\n🟢 Publisher is connected. \n'.green);

    function getRandomNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    function generateIsBurning() {
        return Math.random() < 0.25 // 25% chance for fire = true
    }

    setInterval(() => {

        var trashSensorData = [
            {
                "n": "fullnessSensor",
                "u": "Percent",
                "t": Date.now(),
                "v": getRandomNum(0, 100)
            },
            {
                "n": "temperatureSensor",
                "u": "Celsius",
                "t": Date.now(),
                "v": getRandomNum(-30, 40)
            },
            {
                "n": "humiditySensor",
                "u": "Percent",
                "t": Date.now(),
                "v": getRandomNum(0, 100)
            }
        ]

        var arrayAsString = JSON.stringify(trashSensorData);
        /* var jsonObj = JSON.parse(arrayAsString); // Convert JSON string into Object
        var message = json2xml(jsonObj); // Convert to JSON to XML */

        client.publish(trashTopic, arrayAsString) 
        console.log('––– Trash sensor sent:', arrayAsString.blue, '\n')
    }, 10000);


    /* 
    * Fire detector for fire department
    */
    setInterval(() => {

        var fireSensorData = 
            [{
                "n": "fireSensor",
                "u": "Bool",
                "t": Date.now(),
                "bv": generateIsBurning()
            }]
        

        var arrayTostring = JSON.stringify(fireSensorData);

        /*var jsonObj = JSON.parse(arrayTostring); // Convert JSON string into Object

        console.log(jsonObj)
        var message = json2xml(jsonObj); // Convert to JSON to XML

        console.log(message) */

        client.publish(fireTopic, arrayTostring.toString()) 
        console.log('––– Fire sensor sent:', arrayTostring.blue, '\n')
    }, 3500);

});