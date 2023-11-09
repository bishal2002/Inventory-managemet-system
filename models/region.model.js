const mongoose     = require('mongoose');
const { Schema }   = mongoose;
const regionSchema = new Schema({
    region_name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Region',regionSchema);