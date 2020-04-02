const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');

const AppellationSchema = new Schema({
    name: { type: String, required: true, unique: true },
    code: { type: Number, required: true, unique: true },
    detail: { type: String, required: true, unique: true },
}, {
    timestamps: true,
})
AppellationSchema.plugin(autoIncrement.plugin, {
    model: 'Appellation',
    startAt: 1
});
module.exports = mongoose.model('Appellation', AppellationSchema);