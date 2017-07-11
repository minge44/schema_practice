const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const bodyParser = require('body-parser');
const router= express.Router();
const parseurl = require('parseurl');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Player = require('./models/players.js');
mongoose.connect('mongodb://localhost:27017/baseball');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache')
app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const user = new User({firstName: 'Evan', lastName: 'Longoria'})

app.get('/', function(req, res) {
  Player.find().then(function(player) {

    res.render('index', {players:player})
  })
});

app.post('/', function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const player = new Player({firstName: firstName, lastName: lastName});
player.save()
.then(function () {
  console.log("a new player has been added to the database")
})
// .catch(function () {
//   console.log("no new players added")
// })
res.redirect('/');

})
// user.save().then(function(){
//   console.log("user has been inserted")
// }).catch(function(){
//   console.log("something bad has happened")
// })

// User.create({firstName :"Jake", lastName :"Arieta"})
//   .then(function(){
//
//   }).catch(function(){
//
//   })
// console.log(user);

app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
