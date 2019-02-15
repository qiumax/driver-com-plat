var express = require('express');
var router = express.Router();
var financeController = require("../controllers/FinanceController.js");


router.get('/add', function (req,res) {
    res.render('finance_add',{username:req.session.passport.user});
});

router.post('/add',financeController.add)


module.exports = router;
