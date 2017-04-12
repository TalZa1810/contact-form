/**
 * Created by talza on 12/04/2017.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

var User = mongoose.model('User',userSchema );