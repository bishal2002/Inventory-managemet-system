const mongoose    = require("mongoose");
const { Schema }  = mongoose;

const productSchema = new Schema(
    {       
        store_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required:true
        },
        item_name: {
        type: String,
        required: [true, "Please add a item_name"],
        trim: true,
    },
        item_id: {
        type: String,
        required: true,
        default: "item_id",
        trim: true,
    },
        brand: {             
        type: String,
        required: [true, "Please add a brand"],
        trim: true,
    },
        quantity: {
        type: Number,
        required: [true, "Please add a quantity"],
        trim: true,
    },
        price: {
        type: String,
        required: [true, "Please add a price"],
        trim: true,
    },
        description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true,
    },
        image: {                    
        type: String,
        default: {},
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Product", productSchema);

