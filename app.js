/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
  request = require('request'),

_ = require('lodash');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      latitude:req.query.latitude,
      longitude:req.query.longitude
     };

      var callURL = "https://b20f47d1-efb7-4791-b842-be4d1d7eb055:K8VPv7Sogz@twcservice.mybluemix.net/api/weather/v1/geocode/"+response.latitude+"/"+response.longitude+"/forecast/hourly/48hour.json?units=m&language=en-US"

      request.get(callURL, {
        json: true
      },
      function (error, response, body) {
       console.log(body)
      });
})


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
