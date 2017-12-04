const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')

const app = express()



// Load Controllers
const SiteController = require("./controllers/SiteController.js") //require not requires and need ""
const IcebreakersController = require("./controllers/IcebreakerController.js")

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set static path. place to put static resources like css and jquery
app.use(express.static(path.join(__dirname, "/public")))

//Load Models
const Question = require("./models/questions.js")
const Icebreaker = require("./models/icebreaker.js")
const IcebreakerResponse = require("./models/icebreakerResponse.js")

//Run Migration
async function migrate(){
	await Question.CreateTable();
	await Icebreaker.CreateTable();
	await IcebreakerResponse.CreateTable();
}
migrate();


// Routes
app.get("/", SiteController.Index)
app.get("/questions/new", SiteController.New)
app.post("/", SiteController.Create)
app.get("/icebreakers/new", IcebreakersController.New)
app.post("/icebreakers", IcebreakersController.Create)

/*SiteController.Index = function(req, resp){

	resp.render('index',{   //resp.send('Hello world!')
		title: 'custom',
		users: users
	}) 
}*/

app.listen(3000, function (){
	console.log("server started on port 3000...");
})

module.exports = app


//consider reorganizing: requires, middleware, models, migrations, controlers, routes, exports