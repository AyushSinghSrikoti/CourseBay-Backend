const mongoose = require('mongoose');
// const multer = require('multer');
const path = require('path');

// const AVATAR_PATH = path.join('/uploads/users/avatar');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    avatar:{
        type: String
    },
    creator:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})


// let storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null , path.join(__dirname , '..' , AVATAR_PATH));
//     },
//     filename: function(req,file,cb){
//         cb(null ,  file.fieldname+'-'+Date.now());
//     }
// });

// userSchema.methods.uploadedAvatar = multer({storage:storage}).single('avatar');
// userSchema.statics.avatarPath = AVATAR_PATH;

const user = mongoose.model('User' , userSchema);

module.exports = user;