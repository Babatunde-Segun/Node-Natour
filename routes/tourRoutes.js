const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

// router.param('id', tourController.checkID)
// no comment

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);


  // Post /tour/w1223534/reviews
// GEt /tour/w1223534/reviews
// Get /tour/w1223534/reviews/395853

router.route('/:tourId/reviews').post(authController.protect, authController.restrictTo('user'), reviewController.createReview)

module.exports = router;
