var mongoose = require("mongoose")
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
const UserModel = require("./user.model")
const ChapterModel = require("./chapter.model")
const MangaModel = require("./manga.model")

var MemberSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.Number,
        ref: UserModel,
        required: true,
        unique: true
    },
    chapterUpload: [{
        id_chapter: {
            type: mongoose.Schema.Types.Number,
            ref: ChapterModel
        }
    }],
    mangaSaved: [{
        id_manga: {
            type: mongoose.Schema.Types.Number,
            ref: MangaModel
        },
        timeSavedAt: {
            type: Date,
            default: Date.now()
        }
    }],
    historyRead: [{
        id_chapter: {
            type: mongoose.Schema.Types.Number,
            ref: MangaModel
        },
        timeReadAt: {
            type: Date,
            default: Date.now()
        }
    }],
    about: {
        type: String,
        default: "Unknown"
    },
    linkSocail: [{
        type: String,
        default: "Unknown"
    }]
}, {
    timestamps: true,

})
MemberSchema.plugin(autoIncrement.plugin, {
    model: 'Member',
    startAt: 10
});
module.exports = mongoose.model('Member', MemberSchema);