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
        type: String, required: true 
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

module.exports = mongoose.model('Product', productSchema)