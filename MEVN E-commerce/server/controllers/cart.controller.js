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
router.route('/cart/:userId/').post((req, res) => {
  console.log(req.body);
  const productId = req.body.productId;
  const userId = req.params.userId;

  CartModel.findOne({ userId }, (err, cart) => {
    if (err) {
      console.error("Error finding cart: ", err);
      res.status(500).send(err);
    } else if (cart) {
      // If the cart already exists for the user, add the item to the items array
      const item = { productId: productId, quantity: 1 };
      cart.items.push(item);
      cart.save((err, updatedCart) => {
        if (err) {
          console.error("Error updating cart: ", err);
          res.status(500).send(err);
        } else {
          console.log("Item added to cart successfully!");
          res.status(200).send("Item added to cart successfully!");
        }
      });
    } else {
      // If the cart doesn't exist for the user, create a new cart document
      const newCart = new CartModel({
        userId: userId,
        items: [{ productId: productId, quantity: 1 }]
      });
      newCart.save((err, savedCart) => {
        if (err) {
          console.error("Error creating cart: ", err);
          res.status(500).send(err);
        } else {
          console.log("Cart created successfully!");
          res.status(200).send("Cart created successfully!");
        }
      });
    }
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
            { $pull: { items: {productId } } },
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
