const mongoose = require("mongoose")
const autoIncrement = require("mongoose-plugin-autoinc")
const Schema = mongoose.Schema;
// const UserModel = require("./user.model")

const GenreSchema = new Schema({
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
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
}, {
    timestamps: true
})
GenreSchema.plugin(autoIncrement.plugin, {
    model: 'GenreSchema',
    startAt: 1
});

module.exports = mongoose.model('Genre', GenreSchema);