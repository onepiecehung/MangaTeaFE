var mongoose = require("mongoose")
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const UserModel = require("./user.model")

var MemberSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel
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
    }]
})
MemberSchema.plugin(autoIncrement.plugin, {
    model: 'Users',
    startAt: 10
});
module.exports = mongoose.model('Member', MemberSchema);