const IcebreakerResponseController = {};
const Question = require("../models/questions.js")
const Icebreaker = require("../models/icebreaker.js")
const IcebreakerResponse = require("../models/icebreakerResponse.js")

IcebreakerResponseController.Edit = async function(req, resp){

  const icebreakerResponse = await IcebreakerResponse.FindBySecret(req.query.secret)
  const question = await Question.Find(icebreakerResponse.questionID)
  const icebreaker = await Icebreaker.Find(icebreakerResponse.icebreakerID)
  // const question = await Question.Find(questionID)
  // const icebreakerResponses = await IcebreakerResponse.FindAllByIcebreakerID(icebreaker.id)
  // const questionID = req.query.questionID
  // const question = await Question.Find(questionID)
  // resp.render('icebreakers/new',{
  // 	question: question
  // })
  resp.render("responses/edit", {
    icebreakerResponse, //this is shorthand syntax
    question,
    icebreaker
  })
}

IcebreakerResponseController.Update = async function(req, resp){
  const icebreakerResponse = await IcebreakerResponse.FindBySecret(req.query.secret)
  icebreakerResponse.updateResponseContent(req.body.responseContent)
  const icebreaker = await Icebreaker.Find(icebreakerResponse.icebreakerID)

  resp.redirect(`/responses?secret=${icebreaker.secret}`)
  //resp.send(JSON.stringify(icebreakerResponse))
}

IcebreakerResponseController.Show = async function(req, resp){
  const icebreaker = await Icebreaker.FindBySecret(req.query.secret)
  const icebreakerResponses = await IcebreakerResponse.FindAllByIcebreakerID(icebreaker.id)
  const question = await Question.Find(icebreaker.questionID) 
  // const icebreakerURL = req.protocol + '://' + req.get('host') + req.originalUrl
  // const siteURL = req.protocol + '://' + req.get('host')

  resp.render("responses/show",{
    icebreaker: icebreaker,
    icebreakerResponses: icebreakerResponses,
    question: question
  })
}


module.exports = IcebreakerResponseController;

//howto process a form. actiona nd method form tag, route and controler to handel, data from req body, instantiate corresponding modle