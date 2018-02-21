import { response } from '../../../Library/Caches/typescript/2.6/node_modules/@types/spdy';

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

     } = require('./src/controllers/userController');

// const logout = require('express-passport-logout');

const port = 3000;
const app = express();
app.use((req, res, next)=>{
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
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000)
    },
}));

//SAVED FOR BUILD
// app.use(express.static(`${__dirname}/build`));

getAllDudes = function(currentPokemon, offset) {
    let dudes = currentPokemon
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=60&offset=${offset}`).then( response => {
        response.data.results.map(item => {
            pokemon.push(item)
        })
        next = response.data.next
        let sentData = {pokemon: dudes, next}
        if(next === null){
            console.log('hit the end')
            req.session.cookie.pokemon = req.body.creatures
            return sentData
        }
        else return sentData
    })
}

app.post('/api/getPokemon/', (req,res,next) => {
    console.log('initial session', req.session)
    if(!req.session.cookie.pokemon){
        let dudes = req.body.creatures
        let sentData = {}
        let offset = 0
        getAllDudes(dudes, offset).then(response => {
            dudes = response.pokemon
            offset += 60
            if(response.next !== null){
                getAllDudes(dudes, offset)
            }
            else res.send(response.pokemon)
        })
        
    }
    else {
        console.log('Got from session')
        let sentData = {pokemon: req.session.cookie.pokemon, next: null}
        res.send(sentData)
        
    }
})



//LISTENING
app.listen (port, ()=> {
    console.log(`Listening on port: ${port}`);
})