const express = require('express');
const productRoute = express.Router();

//model
let ProductModel = require('../models/product.model')

productRoute.route('/create-product').post((req, res, next) => {
  ProductModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

productRoute.route('/products').get((req, res, next) => {
  ProductModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

productRoute.route('/edit-product/:id').get((req, res, next) => {
  ProductModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update
productRoute.route('/update-product/:id').put((req, res, next) => {
  ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        console.log('Product successfully updated!')
      }
    },
  )
})

// Delete
productRoute.route('/delete-product/:id').delete((req, res, next) => {
  ProductModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = productRoute
