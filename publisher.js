const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:8080');
const colors = require('colors');
const fireTopic = 'fire';
const helpers = require('./helpers');
const trashTopic = 'trash-level';

client.on('connect', () => {
    console.log('\nš¢ Publisher is connected. \n'.green);

    setInterval(() => {

        var trashSensorData = [
            {
                "n": "fullnessSensor",
                "u": "percent",
                "t": Date.now(),
                "v": helpers.getRandomNum(0, 100)
            },
            {
                "n": "temperatureSensor",
                "u": "celsius",
                "t": Date.now(),
                "v": helpers.getRandomNum(-30, 40)
            },
            {
                "n": "humiditySensor",
                "u": "percent",
                "t": Date.now(),
                "v": helpers.getRandomNum(0, 100)
            }
        ]

        var arrayAsString = JSON.stringify(trashSensorData);

        client.publish(trashTopic, arrayAsString) 
        console.log('āāā Trash sensor sent:', arrayAsString.blue, '\n')
    }, 3000);


    /* 
    * Fire detector for fire department
    */
    setInterval(() => {

        var fireSensorData = 
            [{
                "n": "fireSensor",
                "u": "Bool",
                "t": Date.now(),
                "bv": helpers.generateIsBurning()
            }]
        
        var arrayTostring = JSON.stringify(fireSensorData);

        client.publish(fireTopic, arrayTostring) 
        console.log('āāā Fire sensor sent:', arrayTostring.blue, '\n')
    }, 3500);

});