const mongoose    = require("mongoose");
const { Schema }  = mongoose;

const categorySchema = new Schema({
    category_name:{
        type:String,
        required:[true,"Please add a category_name"]
    },
    product_id:{ 
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
});

module.exports = mongoose.model("Category", categorySchema);

