var Account = require("../models/Account");
var ComUser = require("../models/ComUser");
var UnionPay = require("../models/UnionPay");
var Config = require("../config/Config").unionpay
var mongoose = require("mongoose")
var dateformat = require("dateformat")
var request = require('request');

var financeController = {};

financeController.add = function (req,res) {
	var money = req.body.money

	console.log(money)
    var traderno = 'order'+UnionPay.format()
    var timeStamp = UnionPay.format()

	var params = {
        out_trade_no:traderno,
        timeStamp:timeStamp,
        fee:money *100
	}


	UnionPay.createOrder(params,function (data,formdata) {
		var url = formdata.action_url
		delete formdata.action_url
		console.log('success')
		console.log(formdata.length)
        res.render('finance_pay',{
				action_url:url,
            	params:formdata
			}
		)
    })


}
module.exports = financeController;
