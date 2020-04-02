const mongoose = require("mongoose")
const autoIncrement = require("mongoose-plugin-autoinc")
const Schema = mongoose.Schema;
const UserModel = require("./user.model")
const GroupTranslationModel = require("./groupTranslation.model")
const StatusModel = require("./status.model")
const PermissionModel = require("./permission.model")
const MangaModel = require("./manga.model")
const LangaugeModel = require("./country.model")


const ChapterSchema = new Schema({
    name: {
        type: String,
        default: "Unknown name",
        required: true
    },
    uploadBy: {
        type: mongoose.Schema.Types.Number,
        ref: UserModel,
    },
    groupTranslation: {
        type: mongoose.Schema.Types.String,
        ref: GroupTranslationModel
    },
    langauge: {
        type: mongoose.Schema.Types.Number,
        ref: LangaugeModel
    },
    photo: [{
        type: String
    }],
    view: {
        type: Number,
        default: 0
    },
    mangaID: {
        type: mongoose.Schema.Types.Number,
        ref: MangaModel
    },
    status: {
        type: mongoose.Schema.Types.String,
        ref: StatusModel
    },
    permission: {
        type: mongoose.Schema.Types.Number,
        ref: PermissionModel
    },
    lastReadAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
})
ChapterSchema.plugin(autoIncrement.plugin, {
    model: 'ChapterSchema',
    startAt: 1
});

module.exports = mongoose.model('Chapter', ChapterSchema);