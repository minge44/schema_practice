const mongoose = require('mongoose');

const baseballSchema = mongoose.Schema({
     firstName: {type: String},
     lastName: {type: String}
})
const Player = mongoose.model('Player', baseballSchema)
module.exports = Player;
