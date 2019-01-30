var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DriverSchema = new Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    location: {
        type: { type: String },
        coordinates: []
    },
    approved_at: Number,
    state: Number, // 0:下线, 1:上线
    in_service: Boolean
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Driver', DriverSchema, 'drivers');