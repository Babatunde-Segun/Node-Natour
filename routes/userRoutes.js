const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


const router = express.Router();

const { getAllUsers, getUser, deleteUser, updateUser } =
  userController;
//
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.patch('/resetPassword/:token', authController.resetPassword);
router.post('/forgetPassword', authController.forgetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);

router.get('/me', authController.protect, userController.getMe, userController.getUser);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

router.route('/').get(getAllUsers);



module.exports = router;
