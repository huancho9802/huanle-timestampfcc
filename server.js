// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// API endpoint
app.get("/api/timestamp/:date_string?", function(req, res) {
  const dateString = req.params.date_string;
  const utcRegExp = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$');
  const unixRegExp = new RegExp('^[0-9]+$');
  if (!dateString) {
    const date = new Date();
    res.send({"unix": date.getTime(), "utc": date.toUTCString()});
  } else if (utcRegExp.test(dateString)) {
    const date = new Date(dateString);
    res.json({"unix": date.getTime(), "utc": date.toUTCString()});
  } else if (unixRegExp.test(dateString)) {
    const date = new Date(parseInt(dateString));
    res.json({"unix": date.getTime(), "utc": date.toUTCString()});
  } else {
    res.json({"error": "Invalid Date"});
  }
});