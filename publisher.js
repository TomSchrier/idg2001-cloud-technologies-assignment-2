const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:8080');
const colors = require('colors');
const fireTopic = 'fire';
const helpers = require('./helpers');
const trashTopic = 'trash-level';
const EXI4JSON = require('exificient.js');

client.on('connect', () => {
    console.log('\n🟢 Publisher is connected. \n'.green);

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

        var EXI = EXI4JSON.exify(trashSensorData);
        console.log("EXI:\n")
        console.log(EXI);

        // decode EXIforJSON
        var jsonObjOut = EXI4JSON.parse(EXI);
        console.log("JSON Decoded from EXI:\n")
        console.log(jsonObjOut);

        client.publish(trashTopic, arrayAsString) 
        console.log('––– Trash sensor sent:', arrayAsString.blue, '\n')
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

        var EXI = EXI4JSON.exify(fireSensorData);
        console.log("EXI:\n")
        console.log(EXI);

        // decode EXIforJSON
        var jsonObjOut = EXI4JSON.parse(EXI);
        console.log("JSON Decoded from EXI:\n")
        console.log(jsonObjOut);

        client.publish(fireTopic, arrayTostring) 
        console.log('––– Fire sensor sent:', arrayTostring.blue, '\n')
    }, 3500);

});