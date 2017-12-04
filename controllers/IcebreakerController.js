const IcebreakersController = {};
const Question = require("../models/questions.js")
const Icebreaker = require("../models/icebreaker.js")
const IcebreakerResponse = require("../models/icebreakerResponse.js")

IcebreakersController.New = async function(req, resp){
  const questionID = req.query.questionID
  const question = await Question.Find(questionID)
  resp.render('icebreakers/new',{
  	question: question
  })
}

IcebreakersController.Create = async function(req, resp){
  const questionID = req.query.questionID
  const question = await Question.Find(questionID)
  //resp.send(JSON.stringify(req.body))
  
  //want this to work 
  const icebreaker = new Icebreaker()
  icebreaker.questionID = questionID
  await icebreaker.insert() //icebreaker is in the db, dont forget to load model and migrate

  console.log(icebreaker)
  //batch create lab
  const emails = req.body.iceBreakerEmails //where us the data
  await IcebreakerResponse.BatchCreateForIcebreaker(icebreaker, emails)



  // question.content = req.body.questionContent
  // await question.insert()s
  
  resp.redirect("/")  
//  resp.redirect("/icebreaker?secret=${icebreaker.secret}")  
}

module.exports = IcebreakersController;

//howto process a form. actiona nd method form tag, route and controler to handel, data from req body, instantiate corresponding modle