const mongoose   = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    role_name:{
        type:String,
        required:true
    },
    regionId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Region',
        required: true
    },
    storeId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }
});

module.exports = mongoose.model('Role',roleSchema);


