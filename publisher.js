const mqtt = require('mqtt');
const colors = require('colors');
var parser = require('xml2json');
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

        var trashSensor = [
            {
                "n": "fullnessSensor",
                "u": "percent",
                "t": Date.now(),
                "v": getRandomNum(0, 100)
            },
            {
                "n": "temperatureSensor",
                "u": "celsius",
                "t": Date.now(),
                "v": getRandomNum(-30, 40)
            },
            {
                "n": "humiditySensor",
                "u": "percent",
                "t": Date.now(),
                "v": getRandomNum(0, 100)
            }
        ]

        var xmlTrashSensor = parser.toXml({ trashData: { trashSensor } });

        client.publish(trashTopic, xmlTrashSensor)
        console.log('––– Trash sensor sent:', (xmlTrashSensor).blue + '\n')
    }, 7000);


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

        var xmlFireSensor = parser.toXml({ fireSensorData });

        client.publish(fireTopic, xmlFireSensor)
        console.log('––– Fire sensor sent:', (xmlFireSensor).blue + '\n')
    }, 3000);

});