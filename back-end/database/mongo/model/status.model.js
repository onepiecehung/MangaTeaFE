const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');

const StatusSchema = new Schema({
    name: { type: String, required: true, unique: true },
    code: { type: Number, required: true, unique: true },
    detail: { type: String, required: true, unique: true },
}, {
    timestamps: true,
})
StatusSchema.plugin(autoIncrement.plugin, {
    model: 'Status',
    startAt: 1
});
module.exports = mongoose.model('Status', StatusSchema);