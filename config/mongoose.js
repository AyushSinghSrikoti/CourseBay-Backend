const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('error' , console.error.bind(console , "error connecting to mongodb"));

db.once('open' , function(){
    console.log('connected to db');
    module.exports = db;
})