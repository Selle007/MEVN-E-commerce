const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema(
  {
    name: {
      type: String, required: true 
    },
    description: {
        type: String, required: true 
    },
    price: {
        type: Number, required: true 
    },
    stock: {
      type: Number, required: true 
    },
    image: {
        type: String
    },
    isFeatured:{
        type: Boolean
    },
    category:{ 
        type: mongoose.Types.ObjectId, 
        ref: "Categories"
    },
      
  },
  {
    collection: 'products',
  },
)

module.exports = mongoose.model('Products', productSchema)
