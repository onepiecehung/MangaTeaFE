const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');

const PermissionSchema = new Schema({
    name: { type: String, required: true, unique: true },
    code: { type: Number, required: true, unique: true },
    detail: { type: String, required: true, unique: true },
}, {
    timestamps: true,
})
PermissionSchema.plugin(autoIncrement.plugin, {
    model: 'Permission',
    startAt: 1
});
module.exports = mongoose.model('Permission', PermissionSchema);