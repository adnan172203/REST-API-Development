const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

//controller
const {
  addUserController,
  getUsersController,
  getUserController,
  loginController
} = require('../controllers/userController');

//get all route
router.get('/', getUsersController);

//get single user route
router.get('/:userId', getUserController);


//add new user route
router.post(
  '/',
  [
    check('firstName', 'firstname is required').notEmpty(),
    check('lastName', 'lastname is required').notEmpty(),
    check('email', 'email is required').notEmpty(),
    check('email', 'email must be valid').isEmail(),
    check('password', 'password is required').notEmpty(),
    check('password', 'password must be 6 character').isLength({ min: 6 }),
    check('confirmPassword', 'confirm Password is required').notEmpty(),
    check('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password don't match");
        } else {
          return true;
        }
      })
      .notEmpty()
  ],
  addUserController
);

//login user route
router.post('/login', loginController);

module.exports = router;
