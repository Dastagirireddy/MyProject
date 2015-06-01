var mongoose = require('mongoose');
var mongodbURL = 'mongodb://localhost/Analytics';
var mongodbOptions = {};

// MongoDB connection
mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {

    if(err){ 

        console.log('Connection refused to ' + mongodbURL);
        console.log(err);
    }else{

        console.log('Connection successful to: ' + mongodbURL);
    }
});

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var User = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	web: { type: String, required: true, unique: true },
	phone: { type: String, required: true }
});

var Session = new Schema({
    userid: { type: ObjectId, required: true },
    session_token: { type: String, required: true }
})

var userModel = mongoose.model('User', User);
var sessionModel = mongoose.model('Session', Session);
exports.userModel = userModel;
exports.sessionModel = sessionModel;