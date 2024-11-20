const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { getAllUsers, getUser, createUser, deleteUser, updateUser } =
  userController;

router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

router.route('/').get(getAllUsers).post(createUser);

module.exports = router;
