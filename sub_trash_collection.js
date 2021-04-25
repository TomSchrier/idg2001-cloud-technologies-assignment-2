const mqtt = require('mqtt');
const xml2js = require('xml2js');
const colors = require('colors');
const helpers = require('./helpers');
const parser = require('xml2json');

var client = mqtt.connect('mqtt://localhost:8080');
var trashTopic = 'trash-level';

client.on('connect', () => {
    console.log('🟢 Trash subscriber is connected. \n'.green);
    client.subscribe(trashTopic)
});

client.on('message', (topic, message) => {
    message = message.toString()
    var json = parser.toJson(message);
    var JSONObject = JSON.parse(json);

    trashLevel = JSONObject.trashData.trashSensor[0].v;
    temperature = JSONObject.trashData.trashSensor[1].v;
    humidity = JSONObject.trashData.trashSensor[2].v;


    if (trashLevel > 50 && temperature > 20 && humidity > 50) {
        console.log(`🥵💦 Hot, sweaty trash is ready to be picked up. (${helpers.readableDate(JSONObject.trashData.trashSensor[0].t)})`.red);

    } else if (trashLevel >= 80) {
        console.log(`Trash is full. It can be collected. (${helpers.readableDate(JSONObject.trashData.trashSensor[0].t)})`.red);

    } else if (trashLevel > 50 && trashLevel < 79){
        console.log(`The trash can is soon full. (Fullness level: ${trashLevel}%).`.yellow);

    } else {
        console.log(`The trash can is not full. (Fullness level: ${trashLevel}%).`.green);
    }
});

