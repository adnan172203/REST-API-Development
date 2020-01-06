const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//models
const User = require('../models/user');

//get user
module.exports.getUsersController = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

//get single  user

module.exports.getUserController = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id, '-password');
    if (!user) return res.status(404).send('user not exist');
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

//add user
module.exports.addUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).send(errors.array());
  }
  const user = new User(req.body);
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) return res.status(400).send('user email exist');
    await user.save();
    res.send(user);
  } catch (err) {
    res.status().send(err);
  }
};

//login user
module.exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check user email
    const user = await User.findOne({ email });
    if (!user) return res.send(400).status('unable to login');

    //check user password
    const isMatched = bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(400).send('unable to login');

    //Successfully log in user
   const token = user.generateAuthToken();
   
   //send as header
  //res.header('x-auth-token', token);

  res.cookie('auth', token, {
    httpOnly: true,
    sameSite: true,
    signed: true,
    maxAge: 4 * 60 * 60 * 1000
  });

    res.send('Success');
  } catch (err) {
    res.status(500).send(err);
  }
};
