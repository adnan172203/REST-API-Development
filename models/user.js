const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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
      message:"password must not contain password"
    }
  }
});

userSchema.pre('save', async function(next){
  const hashedPassword = await bcrypt.hash(this.password,10)
  if(this.isModified('password')){
    this.password = hashedPassword;
  }
  next();
  
});

const User = mongoose.model('User', userSchema);

module.exports = User