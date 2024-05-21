const express = require('express');
const usersController = require('../controllers/users_controller');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
// const upload = multer({ dest: path.join(__dirname, '../uploads/users/avatar') });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../frontend/public/images'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

const router = express.Router();

// router.use(passport.session());

router.post('/profile' , passport.checkAuthentication , usersController.profile);

router.post('/sign-up' , usersController.signUp);
router.post('/sign-in' , passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.signIn);

router.post('/username',passport.checkAuthentication,usersController.username);

router.post('/sign-out' ,usersController.destroySession);

router.post('/auth/google' , passport.authenticate('google' , {scope: ['profile' , 'email']}));

router.get('/auth/google/callback' , passport.authenticate('google' , {failureRedirect: '/users/sign-in'}) , usersController.createSession);

router.post('/update-profile' , upload.single('avatar') , usersController.updateProfile);

router.get('/getAvatar' , usersController.sendFile);

router.post('/creator' , usersController.otpCreator);

router.post('/makeCreator' , usersController.makeCreator);

router.post('/fetchUploadedCourses' , usersController.fetchUploadedCourses);

module.exports = router;