const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
const CountryModel = require("./country.model")
const RoleModel = require("./role.model")
const MangaModel = require("./manga.model")

const Author_ArtistSchema = new Schema({
    name: { type: String, required: true, unique: true },
    manga: [{
        type: mongoose.Schema.Types.Number,
        ref: MangaModel
    }],
    role: {
        type: mongoose.Schema.Types.String,
        ref: RoleModel
    },
    country: [{
        type: mongoose.Schema.Types.Number,
        ref: CountryModel
    }],
    sex: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    about: {
        type: String,
        default: "Write some about author/artist"
    },
    brithday: {
        type: Date
    },
    socail: {
        type: String
    }
}, {
    timestamps: true,
})
Author_ArtistSchema.plugin(autoIncrement.plugin, {
    model: 'Author_Artist',
    startAt: 1
});
module.exports = mongoose.model('Author_Artist', Author_ArtistSchema);