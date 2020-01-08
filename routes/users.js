const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

//controller
const {
  addUserController,
  getUsersController,
  getUserController,
  loginController,
  logOutController
} = require('../controllers/userController');

//midleware
const {auth} = require('../middleware/auth');
const {admin} = require('../middleware/admin');

//get all route
router.get('/',[auth,admin], getUsersController);

//get single user route
router.get('/me',auth, getUserController);


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

//logout user route
router.post('/logout',auth, logOutController);

module.exports = router;
