var mongoose = require("mongoose");
var Order = require("../models/Order");
var Company = require("../models/Company");
var Account = require("../models/Account");
var Driver = require("../models/Driver")
var User = require("../models/User")
var Truck = require("../models/Truck")
var Address = require("../models/Address")
var moment = require("moment");
var Dateformat = require("dateformat");
var request  = require('request')

var publishController = {};

publishController.index = function(req, res) {
   console.log('--')
    //车型

    Truck.find({}).then(trucks=> {
        //地址
        Address.find({}).then(adds => {
            res.render('publish', {
                trucks: trucks,
                adds: adds,
                username: req.session.passport.user
            })
        })
    })

};


publishController.addr_detail = function(req,res){
    var id = req.body.id
    console.log(req.body.id)
    Address.findById(id).then(add=>{
        res.send({
            ok:1,
            add:add
        })
    })
}

publishController.getlongandlan= function(req,res){
    console.log(req.body.add)
    var url = 'https://apis.map.qq.com/ws/geocoder/v1/?key=TSFBZ-YAN3U-S2BVJ-4AP4W-XWEQF-GYFRI&address='+req.body.add
    console.log(url)
    request(encodeURI(url),function (err,resp,data) {
        //console.log(err)
        //console.log(resp)
        console.log(data)
        console.log(data.status)

        res.send(data)

    })
}


publishController.getdistance = function(req,res){

}

module.exports = publishController;
