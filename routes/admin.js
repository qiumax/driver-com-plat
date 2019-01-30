var express = require('express');
var router = express.Router();
var companyController = require("../controllers/CompanyController.js");
var passport = require('passport');

router.post('/login', passport.authenticate('local', {
    failureRedirect:'/admin/login',
    failureFlash:true
}), function (req, res) {
    console.log('login success');
    req.session.passport.role = 1;
    console.log('session:');
    console.log(req.session);

    res.redirect('/api/index');
})

router.get('/logout',function (req,res) {
    console.log(req.session)
    req.session.destroy(function(err) {
        if(err){
            return;
        }
        console.log(req.session)
        res.redirect('/admin/login')
    });
})

router.get('/login', function (req, res) {
    var msg = req.flash('error');
    res.render('login', {msg: msg});
})

module.exports = router;
