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


// Protect all routes after this middleware
router.use(authController.protect);

router.patch(
  '/updateMyPassword',
  
  authController.updatePassword,
);

router.get('/me',  userController.getMe, userController.getUser);
router.patch('/updateMe',  userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

router.route('/').get(getAllUsers);



module.exports = router;
