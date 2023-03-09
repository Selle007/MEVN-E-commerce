const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  userEmail: {
    type: String,
    required: true,

  },
  role: {
    type: String,
    required: true,
    default: 'User',
    enum: ['User', 'Admin']
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
