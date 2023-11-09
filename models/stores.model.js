const mongoose   = require('mongoose');
const { Schema } = mongoose;

const storeSchema = new Schema({
    store_name: {
        type: String,
        required: true
    },
    regionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region',
        required: true
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

module.exports = mongoose.model('Store',storeSchema);


