const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
const UserModel = require("./user.model")
const AuthorAndArtistModel = require("./author.model")
const GroupTranslateModel = require("./groupTranslation.model")
const GenreModel = require("./genre.model")
const RatingModel = require("./rating.model")
const StatusModel = require("./status.model")
const ChapterModel = require("./chapter.model")
const PermissionModel = require("./permission.model")

const MangaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.Number,
        ref: AuthorAndArtistModel
    },
    artist: {
        type: mongoose.Schema.Types.Number,
        ref: AuthorAndArtistModel
    },
    groupTranslationID: [{
        type: mongoose.Schema.Types.Number,
        ref: GroupTranslateModel
    }],
    createByUserID: {
        type: mongoose.Schema.Types.Number,
        ref: UserModel
    },
    userFollowedID: [{
        type: mongoose.Schema.Types.Number,
        ref: UserModel
    }],
    cover: {
        type: String
    },
    genre: {
        type: mongoose.Schema.Types.String,
        ref: GenreModel
    },
    rate: {
        type: mongoose.Schema.Types.String,
        ref: RatingModel
    },
    status: {
        type: mongoose.Schema.Types.Number,
        ref: StatusModel
    },
    permission: {
        type: mongoose.Schema.Types.Number,
        ref: PermissionModel
    },
    descripttion: { type: String, default: "Manga descripttion" },
    source: [{
        type: String
    }],
    chapter: [{
        type: mongoose.Schema.Types.Number,
        ref: ChapterModel
    }],
    lastReadAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true,
})
MangaSchema.plugin(autoIncrement.plugin, {
    model: 'Manga',
    startAt: 1
});
module.exports = mongoose.model('Manga', MangaSchema);