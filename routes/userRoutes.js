const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

const { getAllUsers, getUser, createUser, deleteUser, updateUser } =
  userController;
//
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

router.route('/').get(getAllUsers).post(createUser);

module.exports = router;
