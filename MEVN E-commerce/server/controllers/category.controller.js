const express = require('express');
const categoryRoute = express.Router();

//model
let CategoryModel = require('../models/category.model')

categoryRoute.route('/create-category').post((req, res, next) => {
  CategoryModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

categoryRoute.route('/categories').get((req, res, next) => {
  CategoryModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

categoryRoute.route('/edit-category/:id').get((req, res, next) => {
  CategoryModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update
categoryRoute.route('/update-category/:id').put((req, res, next) => {
  CategoryModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        console.log('Category successfully updated!')
      }
    },
  )
})

// Delete
categoryRoute.route('/delete-category/:id').delete((req, res, next) => {
  CategoryModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = categoryRoute
