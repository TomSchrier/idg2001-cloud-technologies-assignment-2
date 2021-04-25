const mqtt = require('mqtt');
const colors = require('colors');
const json2xml = require('json2xml');
const client = mqtt.connect('mqtt://localhost:8080');
const EXI4JSON = require('exificient.js');

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

        console.log(trashSensorData);

        // encode JSON object to EXI
        var EXI = EXI4JSON.exify(trashSensorData);
        console.log("EXI under\n")
        console.log(EXI);

        // decode EXIforJSON
        var jsonObjOut = EXI4JSON.parse(EXI);
        console.log("JSON decodet fra EXI under\n")
        console.log(jsonObjOut);

        client.publish(trashTopic, EXI)
        console.log('––– Trash sensor sent:', EXI, '\n')
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
                "bv": generateIsBurning()
            }]


        var arrayTostring = JSON.stringify(fireSensorData);

        /*var jsonObj = JSON.parse(arrayTostring); // Convert JSON string into Object

        console.log(jsonObj)
        var message = json2xml(jsonObj); // Convert to JSON to XML

        console.log(message) */

        client.publish(fireTopic, arrayTostring.toString())
        console.log('––– Fire sensor sent:', arrayTostring.blue, '\n')
    }, 10000000);

});