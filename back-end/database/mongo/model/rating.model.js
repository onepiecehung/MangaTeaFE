const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
// const UserModel = require("./user.model")
// const MangaModel = require("./manga.model")
// const GroupTranslationModel = require("./groupTranslation.model")

const RatingSchema = new Schema({
    mangaID: {
        type: mongoose.Schema.Types.Number,
        ref: "Manga"
    },
    groupTranslationID: {
        type: mongoose.Schema.Types.Number,
        ref: "GroupTranslation"
    },
    userID: {
        type: mongoose.Schema.Types.Number,
        ref: "Users",
        required: [true, 'Rating model need user id']
    },
    rateNumber: {
        type: Number,
        required: [true, 'Need point rating'],
        max: [10, 'Rating from 1 to 10'],
        min: [1, 'Rating from 1 to 10'],
    },
    rateContent: {
        type: String
    }
}, {
    timestamps: true,
})
RatingSchema.plugin(autoIncrement.plugin, {
    model: 'Rating',
    startAt: 1
});
module.exports = mongoose.model('Rating', RatingSchema);