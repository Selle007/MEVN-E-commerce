const express = require('express');
const router = express.Router();

//model
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

// POST /api/orders
// Create a new order
router.post('/orders/:userId', async (req, res) => {
    const cart = await Cart.findOne({}).populate('items.productId');
  
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }
  
    const userId = req.params.userId;
    console.log(req.body)
    const { name, surname, city, address, country, phone, email, zipCode } = req.body;
  
    const items = cart.items.map(item => ({
      productId: item.productId._id,
      name: item.productId.name,
      quantity: item.quantity,
      price: item.productId.price,
      total: item.quantity * item.productId.price
    }));
  
    const order = new Order({
      userId,
      shippingDetails: {
        name,
        surname,
        city,
        address,
        country,
        phone,
        email,
        zipCode
      },
      items,
      status: 'Processing'
    });
  
    await order.save();
  
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });
  
    res.status(201).json({ message: 'Order created successfully', order });
  });
  

// GET /api/orders
// Get all orders
router.route('/orders').get(async (req, res) => {
    const orders = await Order.find().sort({ created_at: -1 });
    res.status(200).json(orders);
  });
  

// GET /api/orders/:id
// Get an order by ID
router.route('/orders/:id').get(async (req, res) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
  
    res.status(200).json(order);
  });
  
// PUT /api/orders/:id
// Update an order status
router.route('/orders/:id').put(async (req, res) => {
    const { status } = req.body;
  
    if (!status || !['Processing','Shipped', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
  
    const order = await Order.findByIdAndUpdate(req.params.id, { $set: { status } }, { new: true });
  
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
  
    res.status(200).json({ message: 'Order updated successfully', order });
  });
  
  router.route('/orders/user/:userId').get((req, res) => { 
    const userId = req.params.userId;
    Order.find({ userId: userId })
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  

module.exports = router
