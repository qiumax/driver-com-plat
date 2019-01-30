var express = require('express');
var router = express.Router();
var companyController = require("../controllers/CompanyController.js");
var passport = require('passport');

router.get('/index', companyController.index)

router.get('/reset_pwd', companyController.get_reset_pwd)

router.post('/reset_pwd', companyController.reset_pwd)

module.exports = router;
