const express =require('express');
const axios = require('axios');
const changeCase = require('change-case');
const bodyParser = require('body-parser');
const request_data= require('request');
var replace = require("str-replace");
const moment = require('moment');
const acceptRequestFromUsr = require('./API/RequestHandler/proceedUserRequest');

var intent='undefined';

const app = express();

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use(bodyParser.json());
//get post request from user through dialogflow
app.post('/api',(request,res)=>{
    acceptRequestFromUsr.proceedTheRequests(request,(getResults)=>{
        res.set('Content-Type', 'application/json');
        res.status(200).send(getResults);  //start sending the results we receive back to user through dialogflow
        res.end();// closing the connection after sending the all data
    })
  }).listen(process.env.PORT || 80);
  var date = new Date();
  var d = moment(date,'YYYY-DD-MM').format('DD-MM-YYYY');
  console.log('Date: '+d);
  console.log('Server: running');
  console.log('On Port: '+process.env.PORT);
  