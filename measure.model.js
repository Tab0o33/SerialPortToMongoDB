const mongoose = require('mongoose');

const measureSchema = mongoose.Schema({
    measureDate: { type: Date, require: true },
    temperature: { type: Number, require: true },
    pressure: { type: Number, require: true },
    humidity: { type: Number, require: true },
    luminosity: { type: String, require: true },
    movement: { type: Number, require: true },
    cardId: { type: Number, require: true },
});

module.exports = mongoose.model('Measure', measureSchema);