var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var projectsDataFile = require('./data/projects-data.json');

var app = express();

app.use(express.static(__dirname + '/resources'));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

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

app.get('/', (req, res) =>
{
    res.render('index');
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
    res.render('index');
  }
});
});

app.listen(3000, function()
{
        console.log('Listening on port 3000');
});