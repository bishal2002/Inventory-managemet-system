const mongoose   = require('mongoose');
const { Schema } = mongoose;

const salesHistorySchema = new Schema({ // TODO: Order Status ['Pending', 'Fulfilled/Completed', 'Cancelled']
    store_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required:true
    },
    productId: {
    type: String,
    required: [true, "Please add a product_id"],
    }, 
    item_name: {
    type: String,
    required: [true, "Please add item-name"],
    },
    category: {
    type: String,
    required: [true, "Please add category name"],
    },
    quantity: {
    type: Number,
    required: [true, "Please add quantity"],
    },
    date: {
    type: Date,
    default: Date.now
    },
    totalPrice: {
    type: String,
    required: [true, "Please add total-price"],
    }
});

module.exports = mongoose.model('OrderHistory', salesHistorySchema);
