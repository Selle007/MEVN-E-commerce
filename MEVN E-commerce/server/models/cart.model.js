const mongoose = require('mongoose');
const Schema = mongoose.Schema

let cartSchema = new Schema(
    {
        userId: {
            type: String, // store the Firebase user ID as a string
            required: true
          },
          items: [{
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Products',
              required: true
            },
            quantity: {
              type: Number,
              required: true,
              default: 1
            },
            price: {
              type: Number,
              required: false
            }
          }],
          created_at: {
            type: Date,
            default: Date.now()
          }
    },
    {
      collection: 'carts',
    },
  )
  
  module.exports = mongoose.model('Cart', cartSchema)