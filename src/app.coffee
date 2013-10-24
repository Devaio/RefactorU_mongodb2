

# Module dependencies.
 
express = require 'express'
http = require 'http'
path = require 'path'
routes = require './../routes'
user = require './../routes/user'
mongoose = require 'mongoose'
app = express()

# all environments
app.set 'port', process.env.PORT || 3000
app.set 'views', __dirname + '/../views'
app.set 'view engine', 'jade'
app.use express.favicon()
app.use express.logger('dev')
app.use express.bodyParser()
app.use express.methodOverride()
app.use app.router
app.use express.static(path.join(__dirname, '/../public'))

# development only
if 'development' == app.get('env')
	app.use express.errorHandler()

#create mongo database
mongoose.connect 'mongodb://localhost/omegathreestudios'

#set up documents
Application = mongoose.model 'Application', {
	name: String,
	bio: String,
	skills: Array,
	experience: Number,
	why: String
}	


#renders the index page
app.get '/', (req, res) ->
	res.render('index')

app.get '/applicant', (req, res) ->
	console.log "reqbody",req.query.buttonId
	data = req.query

	Application.findByIdAndRemove data.buttonId, (err, id) ->
		console.log "id", id 
		if err
			console.log 'err', err
		else
			console.log 'success'
		

# displays a list of applicants
app.get '/applicants', (req, res) ->
	Application.find {}, (err, data) ->
		if err
			console.log 'err'
		else
			res.render 'applicants', {'applicantPool' : data}

# creates and applicant
app.post '/applicant', (req, res) ->
	# Here is where you need to get the data
	# from the post body and store it

	newApp = new Application {
		name: req.body.name,
		bio: req.body.bio,
		skills: (req.body.skills).split(','),
		experience: req.body.years,
		why: req.body.why
	}
	newApp.save (err) ->
		if err
			res.send err
		else
			Application.find {}, (err, appData) ->
				res.send {success : 'Success!', applicants: appData}

app.get '/:userid', (req, res) ->
	Application.findById req.param('userid'), (err, data) ->
		console.log 'req', req.param 'userid'
		if err
			console.log 'error', err
		else
			console.log 'app', data
			res.render 'userid', {userid : req.param('_id'), 'applicantPool' : data}

http.createServer(app).listen app.get('port'), () ->
	console.log 'Express server listening on port ' + app.get 'port'
