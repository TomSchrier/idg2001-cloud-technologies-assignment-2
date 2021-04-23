const mongoose = require("mongoose"); //import mongoose

const TrashSchema = new mongoose.Schema({
	fullnessSensor: {
		name: { type: String },
		unit: { type: String },
		time: { type: String, max: Date.now() },
		value: { type: Number }
	},
	temperatureSensor: {
		name: { type: String },
		unit: { type: String },
		time: { type: String, max: Date.now() },
		value: { type: Number, min: -30, max: 40 }
	},
	humiditySensor: {
		name: { type: String },
		unit: { type: String },
		time: { type: String, max: Date.now() },
		value: { type: Number, min: 0, max: 100 }
	}
});

const TrashModel = mongoose.model("TrashModel", TrashSchema, "trash_sensor_data");

module.exports = TrashModel;