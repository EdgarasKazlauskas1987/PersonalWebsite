var express = require('express');
var path = require('path');

var app = express();

//app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/resources'));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>
{
    res.render('index');
});

app.get('/projects', (req, res) =>
{
    res.render('projects');
});

app.listen(3000, function()
{
        console.log('Listening on port 3000');
});