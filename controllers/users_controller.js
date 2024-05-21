const User = require('../models/user');
const path = require('path');
const fs = require('fs').promises;
const nodemailer = require("../config/nodemailer");
require('dotenv').config();
const Course = require('../models/course');

module.exports.signUp = function (req, res) {
  const body = req.body;
  console.log(body);

  console.log('sign up controller function');

  User.findOne({ email: req.body.email })
    .then((userWithEmail) => {
      if (userWithEmail) {
        return res.json({ message: "Email already in use" });
      } else {
        User.findOne({ username: req.body.username })
          .then((userWithUsername) => {
            if (userWithUsername) {
              return res.json({ message: "Username already in use" });
            } else {
              User.create(req.body)
                .then((newUser) => {
                  console.log('newuser', newUser);
                  return res.json({ message: "Account created" });
                })
                .catch((err) => {
                  return res.json({ message: "Error in creating user" });
                });
            }
          })
          .catch((err) => {
            res.json({ message: "Error in checking username uniqueness" });
          });
      }
    })
    .catch((err) => {
      res.json({ message: "Error in checking email uniqueness" });
    });
};
  
  module.exports.signIn = function (req, res) {
    console.log("sign in controller function");
    console.log(req.body);
    User.findOne({ email: req.body.email })
      .then((existingUser) => {
        if (!existingUser) {
          return res.json({ message: "Create an account to sign in" });
        } else {
          console.log(existingUser, "existinguser");
          const name = existingUser.username;
          console.log(name);
          return res.json({ name });
        }
      })
      .catch((err) => {
        console.log("error in sign in", err);
        return res.json({ message: "error" });
      });
  };
  

module.exports.profile = function(req, res){
    console.log('tatti');
}

module.exports.username = function(req,res){
    if(!req.user){
        return res.send("no user");
    }
}


module.exports.destroySession = function(req, res){
    // console.log("destroy session" , req)
    req.logout(function(err) {
      if (err) {
        console.log('Error in destroying the session', err);
      }
    });
  }


  module.exports.createSession = function(req,res){
    // req.flash('success' , 'Logged in successfully');
    return res.redirect('https://coursebay-xi.vercel.app/courses');
}  


module.exports.updateProfile = async function(req, res) {
  try {
    console.log("update function calledddddd" , req.body);
    // console.log(req.body)
    const { username} = req.body;
    console.log(req.file);
    // const file = req.file.filename;
    // console.log(file);
    const fileURI = req.file.filename
    console.log(fileURI);

    const user = await User.findById(req.user._id);
    user.username = username;

    if(user.avatar){
      const previousAvatarPath = `./images/${user.avatar}`;
      await fs.unlinkSync(previousAvatarPath);
    }

    if (req.file) {
      user.avatar = fileURI;
    }

    req.logout(function(err) {
      if (err) {
        console.log('Error in destroying the session', err);
      }
    });

    await user.save();

  } catch (err) {
    console.error('Error updating profile:', err);
  }
};

module.exports.sendFile = async function (req, res) {
  try {
    if (!req.user || !req.user._id) {
      console.log("No user or user ID found");
      return res.status(400).send({ status: "error", message: "No user or user ID found" });
    }

    console.log(req.user._id, "userid");
    const user = await User.findById(req.user._id);
    const data = user.avatar;

    if (user) {
      console.log("user found");
      return res.status(200).send({ status: "ok", data: data });
    } else {
      console.log("no user found");
      return res.status(404).send({ status: "error", message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: "error", message: "Internal server error" });
  }
};

module.exports.otpCreator = async function(req,res){
  console.log(req.body , "otp bodyyyyyyyyyy bolte");
  try{
    let htmlString = await nodemailer.renderTemplate({ otp: req.body.code }, '../views/mailers/otp.ejs');
    nodemailer.transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: req.body.email,
      subject: "Verification Code",
      html: htmlString
    }, (err, info) => {
      if (err) {
        console.log('Error in sending mail:', err);
        return;
      }

      // console.log('Message sent:', info);
      return res.status(200).send({status: "ok"});
    });
  }catch(err){
    console.log('Error in rendering template:', err);
    return res.status(500);
  }
}

module.exports.makeCreator = async function (req, res) {
  try {
    console.log(req.user, "MAKE CREATOR RESPONSE HAI YE");
    
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.creator = true;
    await user.save();

    // return res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.log("Error in make creator function", err);
    return res.status(500).json({ error: 'Server error' });
  }
};


module.exports.fetchUploadedCourses = async function(req,res){
  // console.log(req.body);

  try {
    const userId = req.body.userId;
    const courses = await Course.find({ userId:userId });
    res.status(200).json(courses);
} catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}