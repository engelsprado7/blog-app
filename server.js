const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User'); // Create this model
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

//Since we are running different port for client side and server side code
//Such as localhost 3000 for client side and localhost 5000 for the server
//Cors can help us to avoid the cors policy
app.use(
    cors({
        origin: 'https://blog-app-client-nxlr.onrender.com',
        credentials: true,
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Replace the following with your MongoDB Atlas connection string
const uri = "mongodb+srv://engels:Rc2ptGmleaXtjeZN@cluster0.mgjqskg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Passport configuration
//session configuration
app.set('trust proxy', 1) // trust first proxy
app.use(
    session({
        secret: 'Our secret.',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        }
    })
);


//initialize passport.js with session
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require('./passport/index')(passport);


// Routes
app.use('/api', require('./routes/api')); // Create this route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
