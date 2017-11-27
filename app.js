var express = require('express')
var path = require('path');

var app = express()

// Load Controllers
const SiteController = require("./controllers/SiteController.js") //require not requires and need ""

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

//set static path. place to put static resources like css and jquery
app.use(express.static(path.join(__dirname, "public")))


// Routes
app.get("/", SiteController.Index)

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
