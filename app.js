var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var projectsDataFile = require('./data/projects-data.json');
var flash = require('connect-flash');

var greetings = require("./javascript");

var app = express();

app.use(express.static(__dirname + '/resources'));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/*
app.use(flash());
app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('error');
    next();
}); */

//var projectsDataFile = require("projects-data.json");

app.set('view engine', 'ejs');
app.set('projectsData', projectsDataFile);

//creating transporter object
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kaunasrealestate@gmail.com',
    pass: 'kazlaskazlas'
  }
});

function resetInquiryForm2()
{
    document.getElementById("inquiry_form").reset();
}

app.get('/', (req, res) =>
{
    res.render('index');
});

app.get('/projects/ticTacToe', (req, res) =>
{
    res.render('Projects/ticTacToe');
});

app.get('/projects', (req, res) =>
{
  var data = req.app.get('projectsData');
  var titles = [];
  var descriptions = [];
  var languages = [];
  var gitHubLinks = [];
  var images1 = [];
  var images2 = [];
  var images3 = [];
  var images4 = [];
  var images5 = [];

  data.projects.forEach(function(item) {
    titles = titles.concat(item.title);
    descriptions = descriptions.concat(item.description);
    languages = languages.concat(item.language);
    gitHubLinks = gitHubLinks.concat(item.gitHub);
    images1 = images1.concat(item.image1);
    images2 = images2.concat(item.image2);
    images3 = images3.concat(item.image3);
    images4 = images4.concat(item.image4);
    images5 = images5.concat(item.image5);

  });

    res.render('projects', {
      projectTitle: titles,
      projectDescription: descriptions,
      projectLanguage: languages,
      projectGitHubLinks: gitHubLinks,
      projectImages1: images1,
      projectImages2: images2,
      projectImages3: images3,
      projectImages4: images4,
      projectImages5: images5
    });
});

app.post('/sendEmail', (req, res, next) =>
{
  var subject = req.body.subject
  var text = req.body.message
  var email = req.body.email
  var mailOptions = {
  from: 'kaunasrealestate@gmail.com',
  to: 'edgarasvilija@gmail.com',
  subject: subject,
  text: text + 'email: ' + email
};
transporter.sendMail(mailOptions, function(error){
  if (error) {
    console.log(error);
  } else {
   
    res.redirect('/');
    
  }
});
});
/*
app.listen(3000, function()
{
        console.log('Listening on port 3000');
}); */
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});