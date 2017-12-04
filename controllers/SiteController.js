const SiteController = {};
const Question = require("../models/questions.js")

SiteController.Index = async function(req, resp){
  //resp.render('site/index',{welcomeMessage: "Welcome to the Home Page"})
  const questions = await Question.All()
  // console.log(questions)
  resp.render('index.ejs',{
  	questions: questions
  	//, questionOneText : "What olympic sport would you compete in?",
  	// questionTwoText : "Where do you live?"
  })
}

SiteController.New = function(req, resp){
  resp.render('questions/new')
}

SiteController.Create = async function(req, resp){
  const question = new Question();
  question.content = req.body.questionContent
  await question.insert()

  //console.log(req.body)
  
  resp.redirect("/")  
  //resp.send(`Question Created ${question.id}`)
  //resp.render('questions/new')
}

module.exports = SiteController;


