var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var User = mongoose.model('User');

var url= 'mongodb://localhost:27017/users';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',{ title: 'Form Validation', success: req.session.success, errors: req.session.errors });
    req.session.errors = null;
    req.session.success = null;
});

/* GET thankyou page. */
router.get('/thankyou', function(req, res, next) {

res.send("OK");
});


/* list of validators: https://github.com/chriso/validator.js#validators */

 router.post('/submit', function(req, res, next){
     //check validity of the form
     req.check('email', 'Invalid email address').isEmail(); //the name should be a similar to the name (property) of the form field
     // making sure the password has minimum of 4 letters and that it is equals to the password confirmation field
     req.check('password', 'Password is invalid').isLength({min:4}).equals(req.body.confirmPassword);

    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.success = false;
    }
    else{
        req.session.success = true;
    }

    res.redirect('/thankyou');
 });



router.post('/insert', function (req, res, next){

    var newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    newUser.save(function(err, user){
        if (err){
            console.error("Error has occured");
            res.status(500).send("Error on saving to DB");
        } else {
            console.log('Everything was alright! Hooray!');
            res.render('thankyou', {user: user});
        }
    })





});

module.exports = router;