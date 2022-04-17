const express  = require('express');
const session  = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

require("dotenv").config();

const app = express();

//Passport config
require('./config/passport')(passport);

// Mongo connection and server start
const PORT = process.env.PORT || 5000;

mongoose.connect(`${process.env.MongoURI}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, console.log(`Server started at port ${PORT}`));
    })
    .catch(err => console.log(err))
;

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express-session
app.use(session({
    secret: `${process.env.secret}`,
    resave: true,
    saveUninitialized: true
}));

//Passport.js
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', require('./routes/indexRoutes'));
app.use('/teams', require('./routes/teamRoutes'));