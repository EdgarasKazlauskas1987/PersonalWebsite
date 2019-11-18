var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var projectsDataFile = require('./data/projects-data.json');
var flash = require('connect-flash');

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

app.get('/projects/balticMarinas', (req, res) =>
{
    res.render('Projects/balticMarinas');
});

app.get('/projects/chronicalKidneyDiseaseAI', (req, res) =>
{
    res.render('Projects/chronicalKidneyDiseaseAI');
});

app.get('/projects/jobTrack', (req, res) =>
{
    res.render('Projects/jobTrack');
});

app.get('/projects/personalWebsite', (req, res) =>
{
    res.render('Projects/personalWebsite');
});

app.get('/projects/realEstate', (req, res) =>
{
    res.render('Projects/realEstate');
});

app.get('/projects/spaceShooter', (req, res) =>
{
    res.render('Projects/spaceShooter');
});

app.get('/projects/ticTacToe', (req, res) =>
{
    res.render('Projects/ticTacToe');
});

app.get('/projects/unitConverter', (req, res) =>
{
    res.render('Projects/unitConverter');
});

app.get('/projects', (req, res) =>
{
  var data = req.app.get('projectsData');
  var titles = [];
  var descriptions = [];
  var languages = [];
  var gitHubLinks = [];

  data.projects.forEach(function(item) {
    titles = titles.concat(item.title);
    descriptions = descriptions.concat(item.description);
    languages = languages.concat(item.language);
    gitHubLinks = gitHubLinks.concat(item.gitHub);
  });

    res.render('projects', {
      projectTitle: titles,
      projectDescription: descriptions,
      projectLanguage: languages,
      projectGitHubLinks: gitHubLinks
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

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
