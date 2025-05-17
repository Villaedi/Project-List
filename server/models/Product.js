const mongoose = require('mongoose');

//Define the structure of a product

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    quantity:{
        type: String,
        required: true,
    },
    addeBy: {
        type: String,
        default: 'Villaedi',
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});
// Export the model
module.exports = mongoose.model('Product', ProductSchema);