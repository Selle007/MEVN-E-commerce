const express = require('express');
const router = express.Router();

//model
let CartModel = require('../models/cart.model')

// Get cart items for a user
router.route('/cart/:userId').get((req, res) => {
  const userId = req.params.userId;

  CartModel.findOne({ userId })
    .then((cart) => {
      if (cart) {
        const cartItems = cart.items;
        res.status(200).send(cartItems);
      } else {
        console.log("No cart items found for user.");
        res.status(200).send([]);
      }
    })
    .catch((error) => {
      console.error("Error getting cart items: ", error);
      res.status(500).send(error);
    });
});

// Add item to cart for a user
router.route('/cart/:userId').post((req, res) => {
  const userId = req.params.userId;
  const productId = req.body.productId;
  const quantity = req.body.quantity || 1;

  CartModel.findOne({ userId }, (err, cart) => {
    if (err) {
      console.error('Error finding cart for user: ', err);
      res.status(500).send(err);
    } else {
      if (cart) {
        const item = cart.items.find((item) => String(item.productId) === String(productId));
        if (item) {
          item.quantity++;
        } else {
          cart.items.push({ productId: productId, quantity: 1 });
        }


        cart.save((err) => {
          if (err) {
            console.error('Error adding item to cart: ', err);
            res.status(500).send(err);
          } else {
            console.log('Item added to cart successfully!');
            res.status(200).send('Item added to cart successfully!');
          }
        });
      } else {
        // User doesn't have a cart yet, create a new cart with the item
        const newCart = new CartModel({
          userId,
          items: [{ productId, quantity }]
        });

        newCart.save((err) => {
          if (err) {
            console.error('Error adding item to cart: ', err);
            res.status(500).send(err);
          } else {
            console.log('Item added to cart successfully!');
            res.status(200).send('Item added to cart successfully!');
          }
        });
      }
    }
  });
});



router.put('/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const updatedCart = req.body;

  CartModel.findOneAndUpdate({ userId }, updatedCart, { new: true, upsert: true })
    .then((cart) => {
      console.log('Cart updated successfully!', cart);
      res.status(200).send(cart);
    })
    .catch((error) => {
      console.error('Error updating cart: ', error);
      res.status(500).send(error);
    });
});




// Delete item from cart for a user
router.route('/cart/:userId/').delete((req, res) => {
  console.log(req.body);
  const productId = req.body.productId;
  const userId = req.params.userId;

  CartModel.findOne({ userId }, (err, cart) => {
    if (err) {
      console.error("Error finding cart: ", err);
      res.status(500).send(err);
    } else {
      if (!cart) {
        console.error("Cart not found for user ", userId);
        res.status(404).send("Cart not found for user " + userId);
      } else {

        CartModel.findOneAndUpdate(
          { userId },
          { $pull: { items: { productId } } },
          (err, updatedCart) => {
            if (err) {
              console.error("Error deleting item from cart: ", err);
              res.status(500).send(err);
            } else {
              console.log("Item deleted from cart successfully!");
              res.status(200).send("Item deleted from cart successfully!");
            }
          }
        );
      }
    }
  }
  );
});



module.exports = router;
