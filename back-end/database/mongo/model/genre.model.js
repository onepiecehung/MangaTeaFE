var mongoose = require("mongoose")
var autoIncrement = require("mongoose-plugin-autoinc")
var Schema = mongoose.Schema;

var GenreSchema = new Schema({
    name: {
        type: String,
        default: "Unknown name",
        require: true
    },
    detail: {
        type: String,
        default: "Unknown detail",
        require: true,
    },
    createAt:{
        type: Date,
        default: Date.now()
    },
    updateAt:{
        type: Date,
        default: Date.now()
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})
GenreSchema.plugin(autoIncrement.plugin, {
    model: 'GenreSchema',
    field: '_id'
});

module.exports = mongoose.model('Genre', GenreSchema);