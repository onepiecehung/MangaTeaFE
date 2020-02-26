var mongoose = require("mongoose")
var autoIncrement = require("mongoose-plugin-autoinc")
var Schema = mongoose.Schema;

var GenreSchema = new Schema({
    // index: {
    //     type: Number,
    //     unique: true,
    //     required: true,
    //     // default: Date.now()
    // },
    name: {
        type: String,
        default: "Unknown name"
    },
    detail: {
        type: String,
        default: "Unknown detail"
    }
})
GenreSchema.plugin(autoIncrement.plugin, {
    model: 'GenreSchema',
    field: '_id'
});

module.exports = mongoose.model('Genre', GenreSchema);