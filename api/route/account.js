var db = require('../config/mongo-schema.js'); // Loading Database schema module
var jwt = require('jwt-simple');
// Exporting the register module
exports.register = function(req, res){

	var data = {},
		username = req.body.username,
		email = req.body.email,
		password = req.body.password,
		web = req.body.web,
		phone = req.body.phone;

	console.log("I got the register request");
	var User = new db.userModel();
	User.username = username;
	User.email = email;
	User.password = password;
	User.web = web;
	User.phone = phone;
	User.save(function(error, success){

		if(success){

			console.log("I am success");
			console.log(success);
			data.status = 200;
			res.json(data);
		}
		else{

			console.log("I am failure");
			console.log(error);
			data.status = 401;
			res.json(data);
		}
	});
};

// Exporting recovery module
exports.recovery = function(req, res){

	var data = {},
		email = req.body.email,
		password1 = req.body.oldPassword;
		password2 = req.body.newPassword;

	console.log(email+"  "+password1);
	db.userModel.findOne({email: email, password: password1}, function(error, user){

		console.log(user);
		if(user){

			user.password = password2;
			user.save(function(err, success){

				if(success){
					console.log(" I am in success user");
					data.status = 200;
					res.json(data);	
				}
				else{
					data.status = 401;
					res.json(data);
				}
			});
		}
		else{

			console.log(" I am in failure user");
			console.log(error);
			data.status = 401;
			res.json(data);
		}
	});		
};

// Exporting login module
exports.login = function(req, res){

	var data = {},
		email = req.body.email,
		password = req.body.password;

	console.log("I got the request");
	
	/*
	* Checking against the data base values
	* If the data exists create Session Value
	* Return the reponse with status code and token and some info to the client
	* Else return the status code with 403 (Unauthorized user)
	*/
	db.userModel.findOne({email: email, password: password}, function(error, success){

		if (success){

			console.log("Login success");
			success.password = undefined;
			// Creating session value for login user
			req.session_state.user = success._id;
			console.log(req.session_state.user);
			var token = jwt.encode(req.session_state.user, '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXM');
			console.log("-------------------------------");
			console.log(token);
			db.sessionModel.findOne({session_token: token}, function(err, session){

				if(err || session === null){
					
					var Session = new db.sessionModel();
					Session.userid = success._id;
					Session.session_token = token;
					Session.save(function(error, mySession){

						if(mySession){

							console.log(mySession);
						}
						else{

							console.log("Error occured while writing session_token data");
						}
					});
				}
				else{

					console.log(session);
					console.log("Data already found");
				}
			});
			data.status = 200; // Response 'ok'
			data.token = email;
			res.json(data);
		}
		else{

			console.log("Login failure");
			data.status = 403; // Unauthorized user
			res.json(data);
		}		
	});
};

// Exporting logout module
exports.logout = function(req, res){

	//console.log(req.headers);
	var data = {};
	if(typeof req.session_state.user !== undefined || req.headers.authorization){

		req.session_state.reset();
		delete req.headers.authorization;
		data.status = 200;
	}
	else{

		data.status = 403;
	}
	res.json(data);
};

// Exporting getUserDetails module
exports.getUserDetails = function(req, res){

	var data = {};
	if(typeof req.session_state.user === 'object'){

		//console.log("Request headers info:::"+req.headers.cookie);
		data.status = 200;
		data.username = req.session_state.user.username;
		res.json(data);
	}
	else{

		data.status = 403;
		res.json(data);
	}
};