var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/resources'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');

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
    res.render('projects');
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