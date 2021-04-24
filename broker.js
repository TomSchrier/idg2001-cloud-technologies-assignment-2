// MQTT broker
const mosca = require('mosca');
const settings = { port: 8080 };
const broker = new mosca.Server(settings);

//Other
const colors = require('colors');
const xml2js = require('xml2js');

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
			console.log('Data from Fire Sensor saved succussfully!'.green);
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
				time: messageAsObj[0].t,
				value: messageAsObj[1].v
			},
			humiditySensor: {
				name: messageAsObj[2].n,
				unit: messageAsObj[2].u,
				time: messageAsObj[0].t,
				value: messageAsObj[2].v
			}
		});

		 /* TrashDataToSave.save(function (err, doc) {
			if (err) return console.error(err);
			console.log("Data from Trash Sensor saved succussfully!".green);
		});  */
	}
});