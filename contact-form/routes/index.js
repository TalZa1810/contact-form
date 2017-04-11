var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url= 'mongodb://localhost:27017/users';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors  });
    req.session.errors = null;
    req.session.success = null;
});

/* list of validators: https://github.com/chriso/validator.js#validators */
router.post('/submit', function(req, res, next){
  //check validity of the form
  req.check('email', 'Invalid email address').isEmail(); //the name should be a similar to the name (property) of the form field
  //making sure the password has minimum of 4 letters and that it is equals to the password confirmation field
  req.check('password', 'Password is invalid').isLength({min:4}).equals(req.body.confirmPassword);

  var errors = req.validationErrors();
  if(errors){
    req.session.errors = errors;
      req.session.success = false;
  }
  else{
      req.session.success = true;
  }

  res.redirect('/');
});



router.get('/get-data', function (req, res, next) {

});

router.post('/insert', function (req, res, next){
  var user = {
    email: req.body.email;
    password: req.body.password;
    confirmPassword: req.body.confirmPassword;
  };
//SHOULD CONTINUE HERE

});

module.exports = router;
