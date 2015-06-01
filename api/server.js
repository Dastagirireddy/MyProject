var express = require('express'), // Loading Express server 
	app = express(), // Instantiating express  
	routes = {}, // I am defining the routes object
	bodyParser = require('body-parser'), // Loading body parser module
	http = require('http').Server(app),
	client = require('socket.io')(http),
	clientSessions = require("client-sessions");

routes.account = require('./route/account.js'); // Loading account module

var db = require('./config/mongo-schema.js'); // Loading Mongo Schema modules

app.use(express.static('../app/')); // To load the static files like html, css, and images,etc,...
app.use(bodyParser.json()); // To collect the requested data from the url, and ajax post methods
app.use(clientSessions({

	secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXM' // Secret Key
}));
// Intializing server on port 3000
http.listen(3000, function(){
	console.log("Server running on 3000 port..!!!");
}); 


// User registration request
app.post('/register', routes.account.register);

// User account recovery request
app.post('/recovery', routes.account.recovery);

// Login request
app.post('/login', routes.account.login);

// Logout request
app.get('/logout', routes.account.logout);

// Get user details request
app.get('/getUserDetails', routes.account.getUserDetails);

// Sockets code 
client.on('connection', function(socket){

	console.log("A has connected");
	//console.log(socket.request.headers.cookie);
	var opts = { 
      cookieName: 'user',
      secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXM'
    };

	var session_state;
	var session_data = {
		client_session: undefined,
		socket_session: undefined
	};
	//console.log(session_state);
	//console.log(socket.request.headers);
	try{

		session_state = socket.request.headers.cookie.split(';');
		
		for(var i=0;i<session_state.length;i++){

			var data = session_state[i].substr(0, session_state[i].indexOf('='));
			//console.log(data);
			data = data.trim();
			//console.log("My SockeTDATA"+ data);
			if(data === 'session_state'){

				client_session = session_state[i].substr(session_state[i].indexOf('=')+1);
				session_data.client_session = client_session;
				//console.log(session_data.client_session);
			}
			else if(data === 'socket_session'){
				
				socket_session = session_state[i].substr(session_state[i].indexOf('=')+1);
				session_data.socket_session = socket_session;
				//console.log(session_data.socket_session);
			}
		}		
	}
	catch(e){
		console.log("No split found");
	}

	if(session_data.client_session){

	    var decoded = clientSessions.util.decode(opts, session_data.client_session);
	    console.log("*******************************");
	    console.log(decoded);
	    console.log("********************************");		

		db.sessionModel.findOne({session_token: session_data.client_session}, function(error, success){

			if(success){

				socket.id = success._id;
				console.log("IF:"+socket.id);
			}
		});
		//socket.id = session_data.client_session;
	}
	else if(session_data.socket_session){

		socket.id = session_data.socket_session;
		console.log("Else IF:"+socket.id);
	}
	else {

		var rand_num = Math.floor(Math.random() * 1000000);
		socket.request.headers.cookie = socket.request.headers.cookie + '; socket_session='+ rand_num;
		console.log(socket.request.headers.cookie);
		socket.id = rand_num;
		console.log("Else:"+socket.id);
	}
	socket.on('message', function(data){
		console.log(data);
		socket.emit("onmessage", socket.id);
	});
});

