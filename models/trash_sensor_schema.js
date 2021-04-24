const mongoose = require("mongoose"); //import mongoose

const TrashSchema = new mongoose.Schema({
	fullnessSensor: {
		name: { type: String, required: true, trim: true },
		unit: { type: String, required: true, trim: true, default: 'percent' },
		time: { type: Date, required: true, trim: true, default: Date.now() },
		value: { type: Number, required: true, min: 0, max: 100 }
	},
	temperatureSensor: {
		name: { type: String, required: true, trim: true },
		unit: { type: String, required: true, trim: true, enum: ['celsius', 'fahrenheit', 'kelvin'], default: 'celsius' },
		time: { type: Date, required: true, trim: true, default: Date.now() },
		value: { type: Number, min: -30, max: 40 }
	},
	humiditySensor: {
		name: { type: String, required: true, trim: true },
		unit: { type: String, required: true, trim: true, default: 'percent' },
		time: { type: Date, required: true, trim: true, default: Date.now() },
		value: { type: Number, required: true, min: 0, max: 100 }
	}
});

const TrashModel = mongoose.model("TrashModel", TrashSchema, "trash_sensor_data");

module.exports = TrashModel;