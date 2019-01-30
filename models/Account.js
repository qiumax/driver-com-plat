var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var AccountSchema = new Schema({
	company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company'
	},
	username: String,
	phone: String,
	name: String,
    employee_id: String,
    dep: String,
    position: String,
	state: Boolean,
	deleted: Boolean
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

//plugin可接受option参数
AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', AccountSchema, 'accounts');