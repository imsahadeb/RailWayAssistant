const express =require('express');
const axios = require('axios');
const changeCase = require('change-case');
const bodyParser = require('body-parser');
const request_data= require('request');
var replace = require("str-replace");
const moment = require('moment');

 

const app = express();
const API_KEY1= "q86si59pft";
const API_KEY2 = "ye1rpmx0tk";
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());

app.post('/api',(request,res)=>{
    var parameters= request.body.queryResult.parameters;
    var train_no = parameters['train_no'];
    var find_position_by_no=parameters['find_position_by_no'];
    var date=parameters['date'];
    //var moment_date=moment(date,'YYYY-MM-DD');
    //var train_date = moment_date.format('DD-MM-YYYY');
    var train_date=moment(date,'YYYY-MM-DD').format('DD-MM-YYYY');
    console.log(train_date);

    if(find_position_by_no&&date){
        let find_train_url='https://api.railwayapi.com/v2/live/train/'+find_position_by_no+'/date/'+train_date+'/apikey/'+API_KEY2+'/'
        request_data(find_train_url,(req,response,body)=>{
        console.log(find_train_url);
        let info= JSON.parse(body);
        let train_name=info.train['name'];
        let position = info['position'];
        res.status(200).json({
            'fulfillmentText':"The Train Number " + info.train['number'] + ','
            + changeCase.titleCase(info.train['name'])
            + ' and the '+changeCase.titleCase(position)
        });
        res.end();

    });
    }

   if(train_no){
    let find_train_url='https://api.railwayapi.com/v2/name-number/train/'+train_no+'/apikey/'+API_KEY2+'/'
    request_data(find_train_url,(req,response,body)=>{
        console.log(find_train_url);
        let info= JSON.parse(body);
        let train_name=changeCase.titleCase(info.train['name']);  
        res.status(200).json({
            'fulfillmentText':"The name of the Train Number " +info.train['number']+ ' is '
             +train_name
        });
        res.end();

    });
   }
    
//    function butifyTrainName(trainName){
//        trainName=changeCase.titleCase(trainName);
//        if()
//    }
   


});

app.listen(process.env.PORT || 80);