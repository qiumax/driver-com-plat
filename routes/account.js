var express = require('express');
var router = express.Router();
var accountController = require("../controllers/AccountController.js");

router.get('/all', accountController.all)

router.post('/search', accountController.search);

router.get('/add', function (req,res) {
    res.render('account_add',{username:req.session.passport.user});
});

router.get('/edit', accountController.edit);

router.post('/check_phone', accountController.check_phone);

router.post('/add', accountController.add);

router.post('/update', accountController.update);

router.post('/delete', accountController.delete);

module.exports = router;
