var mongoose = require("mongoose")
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');

var CountrySchema = new Schema({
    name: { type: String },
    domain: { type: String },
    language: { type: String },
    capital: { type: String },
    nativeName: { type: String },
    alpha2Code: { type: String },
    alpha3Code: { type: String },
    callingCodes: { type: String },
    region: { type: String },
    subregion: { type: String },
    cioc: { type: String },
    flag: { type: String },
    flagBase64: { type: String }
}, {
    timestamps: true,
})
CountrySchema.plugin(autoIncrement.plugin, {
    model: 'Country',
    startAt: 1
});
module.exports = mongoose.model('Country', CountrySchema);