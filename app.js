
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//create mongo database
mongoose.connect('mongodb://localhost/omegathreestudios');

//set up documents
var Application = mongoose.model('Application', {
	name: String,
	bio: String,
	skills: Array,
	experience: Number,
	why: String
})


//renders the index page
app.get('/', function(req, res){
	res.render('index')
});

app.get('/applicant', function(req, res){
	
})

// displays a list of applicants
app.get('/applicants', function(req, res){
	Application.find({}, function(err, data){
		console.log(data)
		res.render('applicants', {'applicantPool' : data})
	})
	
});

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it

	var newApp = new Application({
		name: req.body.name,
		bio: req.body.bio,
		skills: (req.body.skills).split(','),
		experience: req.body.years,
		why: req.body.why
	});
	newApp.save(function (err){
		if(err){
			res.send(err)
		}
		else{
			Application.find({}, function(err, appData){
				res.send(
					{success : 'Success!', applicants: appData}
				)
			})
		}
	})

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
