const express = require('express');
const router = express.Router();

//model
let CategoryModel = require('../models/category.model')

router.route('/create-category').post((req, res, next) => {
  CategoryModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.route('/categories').get((req, res, next) => {
  CategoryModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.route('/edit-category/:id').get((req, res, next) => {
  CategoryModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update
router.route('/update-category/:id').put((req, res, next) => {
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
router.route('/delete-category/:id').delete((req, res, next) => {
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

module.exports = router
