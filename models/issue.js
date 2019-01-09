var mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Issue = new Schema({
    type: {
        type: String
    },
    properties: {
        type: Object
    },
    geometry: {
        type: Object
    }
});

module.exports = mongoose.model('farms', Issue);