const express = require('express')
const { json } = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const axios = require('axios')
// const massive = require('massive');
// const passport = require('passport');
// require('dotenv').config();
// const Auth0Strategy = require("passport-auth0");
// const path = require('path');


// const { connectionString } = require('../config').massive;
// const { domain, clientID, clientSecret } = require('../config').auth0

const { 
    // create, 
    //     getInfo, 
    //     newJob, 
    //     getPosts, 
    //     editPost, 
    //     deletePost, 
    //     editJob, 
    //     openJobs, 
    //     acceptJob, 
    //     acceptedJobs, 
    //     posterInfo, 
    //     newComment, 
    //     getComments, 
    //     jobComplete, 
    //     postReview, 
    //     removeRunner
     } = require('./src/controllers/userController');

// const logout = require('express-passport-logout');

const port = 3000;
const app = express();
app.use((req, res, next)=>{
    console.log(req.path)
    next()
})

//MASSIVE
// massive(process.env.CONNECTION_STRING)
// .then(db => app.set('db', db))
// .catch(console.log);


app.use(json());
app.use(cors());

app.use(session({
    secret: 'MoveToConfigPlz123',
    resave: false,
    saveUninitialized: false
}));

//SAVED FOR BUILD
// app.use(express.static(`${__dirname}/build`));

// app.use( passport.initialize() )
// app.use( passport.session() )

// passport.use( 
//     new Auth0Strategy(
//   {
//     domain: process.env.DOMAIN,
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "/api/login"
//   },
//   function(accessToken, refreshToken, extraParams, profile, done) {
    
//     app.get('db').getUserByAuthId([profile.id]).then(response => {
//         // console.log(response)

//         if(!response[0]) {
//             console.log(profile.id)
//             app.get('db').createUserByAuthId([profile.id])
//             .then(created => {
//                 return done(null, created[0])
//             })
//         } else {
        
//             return done(null, response[0])
            
//         }
//     })


//     // return done(null, profile);
//   }
// ));

// passport.serializeUser(function(user, done) {
//     done(null, user)
// })



// passport.deserializeUser(function(obj, done) {
//     done(null, obj)
// })

// app.get('/api/login', passport.authenticate('auth0', {successRedirect: '/testPage'}))



// app.get('/api/types/', (req, res, next) => {
    
        
// })




//LISTENING
app.listen (port, ()=> {
    console.log(`Listening on port: ${port}`);
})