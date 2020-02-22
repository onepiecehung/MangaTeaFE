var mongoose = require("mongoose")
var autoIncrement = require("mongoose-plugin-autoinc")
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chapterUpload: [{
        id_chapter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chapter'
        }
    }],
    mangaSaved: [{
        id_manga: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Manga'
        }
    }],
    historyRead: [{
        id_chapter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Manga'
        }
    }],
    about: {
        type: String,
        default: "Unknown"
    },
    linkSocail: [{
        type: String,
        default: "Unknown"
    }],
    point: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Member', MemberSchema);