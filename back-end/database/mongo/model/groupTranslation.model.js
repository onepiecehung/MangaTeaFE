const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
// const UserModel = require("./user.model")
// const RatingModel = require("./rating.model")
// const CountryModel = require("./country.model")
// const StatusModel = require("./status.model")
// const PermissionModel = require("./permission.model")
// const MangaModel = require("./manga.model")

const GroupTranslationSchema = new Schema({
    name: { type: String, required: true },
    userOwerID: {
        type: mongoose.Schema.Types.Number,
        ref: "Users",
        required: true
    },
    userMemberID: [{
        type: mongoose.Schema.type.Number,
        ref: "Users",
        required: true
    }],
    mangaID: [{
        type: mongoose.Schema.Types.Number,
        ref: "Manga"
    }],
    rate: [{
        type: mongoose.Schema.Types.Number,
        ref: "Rating"
    }],
    langauge: [{
        type: mongoose.Schema.Types.Number,
        ref: "Country"
    }],
    cover: { type: String },
    avatar: { type: String },
    web: { type: String },
    about: { type: String, default: "About your group" },
    status: {
        type: mongoose.Schema.Types.Number,
        ref: "Status"
    },
    permission: {
        type: mongoose.Schema.Types.Number,
        ref: "Permission"

    }
}, {
    timestamps: true,
})
GroupTranslationSchema.plugin(autoIncrement.plugin, {
    model: 'GroupTranslation',
    startAt: 1
});
module.exports = mongoose.model('GroupTranslation', GroupTranslationSchema);