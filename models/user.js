const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator(value) {
        return !value.toLowerCase().includes('password');
      },
      message: 'password must not contain password'
    }
  },
  isAdmin:{
    type: Boolean,
    default:false
  }

});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ id: this._id, isAdmin:this.isAdmin }, 'secretKey', { expiresIn: '4h' });
  return token;
};

userSchema.pre('save', async function(next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  if (this.isModified('password')) {
    this.password = hashedPassword;
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
