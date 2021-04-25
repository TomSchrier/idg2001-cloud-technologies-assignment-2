// MQTT broker
const mosca = require('mosca');
const settings = { port: 8080 };
const broker = new mosca.Server(settings);

//Other
const colors = require('colors');
const helpers = require('./helpers');
const parser = require('xml2json');

//Mongoose
const mongoose = require("mongoose");
const FireModel = require('./models/fire_sensor_schema');
const TrashModel = require('./models/trash_sensor_schema');

mongoose.connect("mongodb+srv://admin:admin@cluster0.j7zur.mongodb.net/messagesdb?retryWrites=true&w=majority", {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

const database = mongoose.connection;

database.on('error', console.error.bind(console, "connection error:"));

database.once('open', function () {
	console.log('🟢 Database connection cuccessful.'.green);
});

broker.on('ready', () => {
	console.log('🟢 Broker is ready.'.green);
});

broker.on('published', (packet) => {
	var message = packet.payload;
	var json = parser.toJson(message);
	var JSONObject = JSON.parse(json);

	//If JSONObject.data is true, it is data from a Trash sensor, if it is false, it is data from a fire sensor
	if (JSONObject.trashData) {

		var TrashDataToSave = new TrashModel({
			fullnessSensor: {
				name: JSONObject.trashData.trashSensor[0].n,
				unit: JSONObject.trashData.trashSensor[0].u,
				time: JSONObject.trashData.trashSensor[0].t,
				value: JSONObject.trashData.trashSensor[0].v
			},
			temperatureSensor: {
				name: JSONObject.trashData.trashSensor[1].n,
				unit: JSONObject.trashData.trashSensor[1].u,
				time: JSONObject.trashData.trashSensor[1].t,
				value: JSONObject.trashData.trashSensor[1].v
			},
			humiditySensor: {
				name: JSONObject.trashData.trashSensor[2].n,
				unit: JSONObject.trashData.trashSensor[2].u,
				time: JSONObject.trashData.trashSensor[2].t,
				value: JSONObject.trashData.trashSensor[2].v
			}
		});

		TrashDataToSave.save(function (err, doc) {
			if (err) return console.error(err);
			console.log(`Data from Trash Sensor saved succussfully! (${helpers.readableDate(JSONObject.trashData.trashSensor[0].t)}) \n`.green);
		});

	}

	if (!JSONObject.trashData) {
		if (JSONObject.fireSensorData.bv == 'true') {
			//Only save data from the Fire Sensor of its boolean value is true
			var FireDataToSave = new FireModel({
				name: JSONObject.fireSensorData.n,
				unit: JSONObject.fireSensorData.u,
				time: JSONObject.fireSensorData.t,
				value: JSONObject.fireSensorData.bv
			});

			FireDataToSave.save(function (err, doc) {
				if (err) return console.error(err);
				console.log(`Data from Fire Sensor saved succussfully! ${helpers.readableDate(JSONObject.fireSensorData.t)}) \n`.green);
			});
		}
	}
});