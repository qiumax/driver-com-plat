var Account = require("../models/Account");
var ComUser = require("../models/ComUser");
var Config = require("../config/Config")
var mongoose = require("mongoose")
var dateformat = require("dateformat")

var accountController = {};

accountController.all = function(req, res) {
    var page = req.query.page || 1
    var page_size = req.query.page_size || Config.page_size
    
    var company_id = req.user._id
    
    Account.count({company: company_id, deleted: false}, function(err, count) {
        if(err) throw err
    
        Account.find({company: company_id, deleted: false}).sort({created_at:-1}).skip((page-1)*page_size).limit(page_size).then(accounts=>{
            console.log(accounts);
            
            accounts.forEach(account=>{
                account.create_time = dateformat(account.created_at, 'yyyy/mm/dd HH:MM')
            })
            
            res.render('account_all', {
                accounts: accounts,
                username:req.session.passport.user,
                page: page,
                page_total: Math.floor(count/page_size)+1
            })
        })
    })
};

accountController.search = function(req, res) {
    var company_id = req.user._id
    
    var pattern = req.body.query
    var reg = {$regex: pattern, $options:"i"}
    
    Account.find({
        company: company_id,
        deleted: false,
        $or: [
            {phone: reg},
            {name: reg},
            {employee_id: reg},
            {dep: reg},
            {position: reg},
        ]
    }).then(accounts=>{
        console.log(accounts);
        accounts.forEach(account=>{
            account.create_time = dateformat(account.created_at, 'yyyy/mm/dd hh:MM')
        })
        res.render('account_all', {
            username:req.session.passport.user,
            accounts: accounts
        })
    })
}

accountController.edit = function(req, res) {
    var company_id = req.user._id
    var id = req.query.id;
    
    Account.findOne({_id: id, company: company_id}).then(account=>{
        console.log(account);
        res.render('account_edit', {
            account: account,
            username:req.session.passport.user,
            msg: req.flash('msg'),
            error: req.flash('error')
        })
    })
}

accountController.check_phone = function (req, res) {
    var company_id = req.user._id
    
    Account.findOne({company: company_id, phone: req.body.phone}).then(account=>{
        if(account){
        	//
	        res.send({ok: 2});
        }
        else {

	        ComUser.findOne({phone:req.body.phone}).then(comuser=>{
		        if(comuser)
		        {
			        res.send({ok:1})
		        }
		        else
		        {
			        res.send({ok:3})
		        }
	        })
        }
    })
}

accountController.add = function(req, res) {
    var company_id = req.user._id
    var body = req.body

	//新增子账号
	Account.register(new Account({
		username:body.phone,
		company: company_id,
		phone: body.phone,
		name: body.name,
		employee_id: body.employee_id,
		dep: body.dep,
		position: body.position,
		state: true,
		deleted: false}
	),req.body.password,function (err,account) {
		if(!err){
			account.save(function (err) {
				res.redirect('/api/account/all')
			})
		}
	})
    // var account = new Account({
    //     company: company_id,
    //     phone: body.phone,
    //     name: body.name,
    //     employee_id: body.employee_id,
    //     dep: body.dep,
    //     position: body.position,
    //     state: true,
    //     deleted: false
    // })
    
    // account.save(function (err) {
    //     if(err) throw err
    //     res.redirect('/api/account/all')
    // })
}

accountController.update = function(req, res) {
    var company_id = req.user._id
    var body = req.body
    var id = body.id;

	console.log(req.body);
	var pwd = req.body.password
	if(pwd){
		Account.findOne({
			username: body.phone
		}).then(account=>{
			account.setPassword(pwd, function () {
				account.save(function( err ){
					if(err) throw err
					console.log('----')
				})
			})
		})
	}


    Account.findOne({_id: id, company:company_id}).then(account=>{
        if(!account) return
        
        account.name = body.name
        account.employee_id = body.employee_id
        account.dep = body.dep
        account.position = body.position
        account.state = body.state
        
        account.save(function (err) {
            if(err) throw err
            req.flash('msg', '更新成功')
            res.redirect('/api/account/edit?id=' + id)
        })
    })
}

accountController.delete = function(req, res) {
    var company_id = req.user._id
    Account.findOneAndUpdate({_id: req.body.id, company: company_id}, {deleted: true}, {new:true}).then((account, err)=>{
        if(err) throw err
        if(account.deleted) {
            res.send({ok:1})
        }
    })
}

module.exports = accountController;
