const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

let ProductModel = require('../models/product.model')

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage });

// Create product
router.post('/create-product', upload.single('productImage'), async (req, res) => {
  const { name, description, price, stock, isFeatured, category } = req.body;
  const imagePath = req.file.path;

  try {
    const product = new ProductModel({
      name,
      description,
      price,
      stock,
      isFeatured,
      category,
      image: imagePath
    });
    await product.save();
    res.json({ message: 'Product created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.route('/products').get((req, res, next) => {
  ProductModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.route('/products/:id').get((req, res, next) => {
  ProductModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

async function getProducts() {
  const products = await ProductModel.find();
  return products;
}

router.get('/category/:id/products', async (req, res) => {
  console.log(req.params)
  const categoryId = req.params.id;
  try {
    const products = await ProductModel.find({ category: categoryId });
    res.json(products);
    console.log(products)
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log('test')
  }
});



router.route('/edit-product/:id').get((req, res, next) => {
  ProductModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update
router.route('/update-product/:id').put((req, res, next) => {
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
router.route('/delete-product/:id').delete((req, res, next) => {
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

module.exports = router
