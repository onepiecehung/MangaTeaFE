var mongoose = require("mongoose")
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
const UserModel = require("./user.model")

var MemberSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true
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
        },
        timeSaved: {
            type: Date,
            default: Date.now()
        }
    }],
    historyRead: [{
        id_chapter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Manga'
        },
        timeRead: {
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
})
MemberSchema.plugin(autoIncrement.plugin, {
    model: 'Member',
    startAt: 10
});
module.exports = mongoose.model('Member', MemberSchema);