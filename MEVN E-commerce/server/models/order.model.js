const mongoose = require('mongoose');
const Schema = mongoose.Schema


const orderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    shippingDetails: {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        }
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        required: true,
        enum: ['Processing', 'Shipped', 'Completed']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
    },
        {
            collection: 'orders',
        },
    )
module.exports = mongoose.model('Order', orderSchema);
