const SiteController = {};

SiteController.Index = function(req, resp){

  //resp.render('site/index',{welcomeMessage: "Welcome to the Home Page"})

  resp.render('index.ejs',{
  	questionOneText : "What olympic sport would you compete in?",
  	questionTwoText : "Where do you live?"
  })

}


module.exports = SiteController;


