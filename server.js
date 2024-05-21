require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const session = require('express-session');
const passport = require('passport');
const db = require('./config/mongoose');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const dbUrl = process.env.DATABASE_URL;
const cors = require('cors');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE", 
    credentials: true,
  }));

app.use(session({
    name: 'Course Bay',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*24*31)
    },
    store: new MongoStore(
        {
            mongoUrl: dbUrl,
            autoRemove: 'disabled',
        },
        function(err){
            console.log(err || 'connect-mongo db setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/' , require('./routes/index'));
app.use('/uploads' , express.static(__dirname+'/uploads'));

const port = process.env.PORT || 8000;

app.listen(port , function(err){
    if(err){
        console.log("app.listen error.." , err);
    }
    console.log(`Server is running at ${port}`);
});