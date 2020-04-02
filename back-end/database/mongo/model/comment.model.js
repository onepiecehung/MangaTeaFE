const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
const UserModel = require("./user.model")
const ChapterModel = require("./chapter.model")
const MangaModel = require("./manga.model")
const GroupTranslationModel = require("./groupTranslation.model")

const CommentSchema = new Schema({
    chapterID: {
        type: mongoose.Schema.Types.Number,
        ref: ChapterModel
    },
    mangaID: {
        type: mongoose.Schema.Types.Number,
        ref: MangaModel
    },
    groupTranslationID: {
        type: mongoose.Schema.Types.Number,
        ref: GroupTranslationModel
    },
    userID: {
        type: mongoose.Schema.Types.Number,
        ref: UserModel
    },
    commentContent: {
        type: String,
        required: true,
        max: [10000, "Max comment 10000 words"]
    },
    reply: [{
        type: mongoose.Schema.Types.Number,
        ref: 'Comment'
    }]
}, {
    timestamps: true,
})
CommentSchema.plugin(autoIncrement.plugin, {
    model: 'Comment',
    startAt: 1
});
module.exports = mongoose.model('Comment', CommentSchema);