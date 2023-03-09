const express = require('express');
const router = express.Router();
const UserModel = require('../models/userRole.model');



router.route('/add-role-to-user').post((req, res, next) => {
  UserModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


router.get('/user-role/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const userRole = await UserModel.findOne({ userId });
    if (userRole) {
      res.status(200).json({
        role: userRole.role,
      });
    } else {
      res.status(404).json({
        message: 'User role not found',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.route('/user-roles').get((req, res, next) => {
  UserModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.put('/update-user-role/:userId', async (req, res) => {
  const { userId } = req.params;
  const { newRole } = req.body;

  try {
    const user = await UserModel.findById(userId);
    user.role = user.role === "User" ? "Admin" : "User";
    await user.save();

    res.status(200).json({
      message: 'User role updated successfully!',
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
