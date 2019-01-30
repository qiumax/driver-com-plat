var express = require('express');
var router = express.Router();
var publishController = require("../controllers/PublishController.js");

router.get('/index', publishController.index);

router.post('/addr_detail',publishController.addr_detail)

router.post('/getlongandlan',publishController.getlongandlan)

module.exports = router;
