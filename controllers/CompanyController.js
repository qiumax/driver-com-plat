var mongoose = require("mongoose");
var Company = require("../models/Company");

var companyController = {};

companyController.index = function(req, res) {
    var username = req.session.passport.user
    Company.findOne({
        username: username
    }).then(company=>{
        res.render('company_index', {
            username:req.session.passport.user,
            company: company
        });
    })
};

companyController.get_reset_pwd = function(req, res) {
    res.render('company_reset_pwd', {msg: msg, error: error});
};

companyController.reset_pwd = function(req, res) {
    var old_pwd = req.body.old_pwd
    var pwd = req.body.pwd
    
    req.user.authenticate(old_pwd, function (noIdea, isPwdCorrect, err) {
        if(!isPwdCorrect) {
            req.flash('error', '旧密码不正确')
            res.redirect('/api/company/reset_pwd')
        }
        else if(pwd.length>0) {
            req.user.setPassword(pwd, function (err) {
                if (err) {
                    console.log(err);
                    req.flash('error', '密码修改失败')
                    res.redirect('/api/company/reset_pwd')
                } else {
                    req.user.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                        req.flash('msg', '密码修改成功')
                        res.redirect('/api/company/reset_pwd')
                    });
                }
            });
        }
    })
};

module.exports = companyController;
