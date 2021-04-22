// MQTT broker
var mosca = require('mosca');
var settings = { port: 8080 };
var broker = new mosca.Server(settings);

var colors = require('colors');
const xml2js = require('xml2js');

var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@cluster0.j7zur.mongodb.net/messagesdb?retryWrites=true&w=majority", {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
	console.log("Connection Successful!");
});

var fireSchema = mongoose.Schema({
	name: { type: String, required: true, trim: true },
	unit: { type: String, required: true },
	time: { type: String, required: true, max: Date.now() },
	value: { type: Boolean, required: true }
});

var FireModel = mongoose.model("FireModel", fireSchema, "fire_sensor_data");

var trashSchema = mongoose.Schema({
	fullnessSensor: {
		name: { type: String },
		unit: { type: String },
		time: { type: String, max: Date.now() },
		value: { type: Number }
	},
	temperatureSensor: {
		name: { type: String },
		unit: { type: String },
		time: { type: String , max: Date.now()},
		value: { type: Number, min: -30, max: 40}
	},
	humiditySensor: {
		name: { type: String },
		unit: { type: String },
		time: { type: String, max: Date.now() },
		value: { type: Number, min: 0, max: 100 }
	}
});

var TrashModel = mongoose.model("TrashModel", trashSchema, "trash_sensor_data");


broker.on('ready', () => {
	console.log('🟢 Broker is ready.'.green);
});

broker.on("published", (packet) => {
	var message = packet.payload.toString();

	var messageAsObj = JSON.parse(message)

	//If it is a fire sensor and its value is true -> save it in the database, otherwise, dont save it
	if (messageAsObj[0].n === "fireSensor" && messageAsObj[0].bv) {
		var FireDataToSave = new FireModel({
			name: messageAsObj[0].n,
			unit: messageAsObj[0].u,
			time: messageAsObj[0].t,
			value: messageAsObj[0].bv
		});

		FireDataToSave.save(function (err, doc) {
			if (err) return console.error(err);
			console.log("Data from Fire Sensor saved succussfully!".green);
		});
		
	//If it isnt a fire sensor, its a trash sensor -> save all the information to the database
	} else if (messageAsObj[0].n !== "fireSensor") {
		var TrashDataToSave = new TrashModel({
			fullnessSensor: {
				name: messageAsObj[0].n,
				unit: messageAsObj[0].u,
				time: messageAsObj[0].t,
				value: messageAsObj[0].v
			},
			temperatureSensor: {
				name: messageAsObj[1].n,
				unit: messageAsObj[1].u,
				time: messageAsObj[1].t,
				value: messageAsObj[1].v
			},
			humiditySensor: {
				name: messageAsObj[2].n,
				unit: messageAsObj[2].u,
				time: messageAsObj[2].t,
				value: messageAsObj[2].v
			}
		});

		TrashDataToSave.save(function (err, doc) {
			if (err) return console.error(err);
			console.log("Data from Trash Sensor saved succussfully!".green);
		});
	}
});