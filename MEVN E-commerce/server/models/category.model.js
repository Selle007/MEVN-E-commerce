const mongoose = require('mongoose')
const Schema = mongoose.Schema

let categorySchema = new Schema(
  {
    name: {
      type: String, required: true 
    },
  },
  {
    collection: 'categories',
  },
)

module.exports = mongoose.model('Category', categorySchema)
