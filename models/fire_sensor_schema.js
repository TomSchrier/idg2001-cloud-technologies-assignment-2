const mongoose = require("mongoose"); //import mongoose

const FireSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    unit: { type: String, required: true, default: 'percent' },
    time: { type: Date, required: true, default: Date.now() },
    value: { type: Boolean, required: true }
});

const FireModel = mongoose.model("FireModel", FireSchema, "fire_sensor_data");

module.exports = FireModel;