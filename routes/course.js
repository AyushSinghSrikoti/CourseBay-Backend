const express = require('express');
const courseController = require('../controllers/course_controller');
const multer = require('multer');
const path = require('path');
const passport = require('passport');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../frontend/public/course'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

const router = express.Router();

router.post('/upload-course' , upload.single('courseImage') , courseController.upload);
router.post('/get-course-data' , courseController.getData);
// router.post('/:courseId' , courseController.singleCourse);
// router.post(':courseId/reviews' , courseController.review);

router.post('/postReview' , courseController.postReview);
router.post('/fetchReviews' , courseController.fetchReview);

module.exports = router;