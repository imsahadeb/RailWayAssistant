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
    var intent = request.body.queryResult.intent.diplayName;

   
    
    // if(intent='check available seat'){
    //     var train_no = parameters['train_no'];
    //     var date=parameters['date'];
    //     var train_date=moment(date,'YYYY-MM-DD').format('DD-MM-YYYY');
    //     var source=parameters['source_stn'];
    //     var dest=parameters['dest_stn'];
    //     var seat_class=parameters['seat_class']
    //      let url = 'https://api.railwayapi.com/v2/check-seat/train/'+train_no+'/source/'+source+'/dest/'
    //      +dest+'/date/'+train_date+'/pref/'+seat_class+'/quota/gn/apikey/'+API_KEY1+'/';
    //      console.log(url);
    //      request_data(url,(req,response,body)=>{
    //         let info=JSON.parse(body);
    //         res.status(200).json({
    //             'fulfillmentText':
    //             'Train Name : '+info.train['name'] 
    //              + ' Source Station: ' +info.from_station['name']
    //              + '  Destination Satation : ' +info.to_station['name']
    //              + '  Journey Class : ' +info.journey_class['name']
    //              + '  Journey Date : ' + info['availability'][0]['date']
    //              + '  Current Seat Status : ' +info['availability'][0]['status']
    //         });
    //         res.end();
    //      });
        
    // }

    if(intent='current position'){
        var date=parameters['date'];
        var train_date=moment(date,'YYYY-MM-DD').format('DD-MM-YYYY');
        let find_position_by_no=parameters['find_position_by_no'];

        let find_train_url='https://api.railwayapi.com/v2/live/train/'+find_position_by_no+'/date/'
        +train_date+'/apikey/'+API_KEY1+'/'
        request_data(find_train_url,(req,response,body)=>{
        
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

   if(intent='find train name'){
    var train_no = parameters['train_no'];
    let find_train_url='https://api.railwayapi.com/v2/name-number/train/'+train_no+'/apikey/'+API_KEY1+'/'
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
    


});

app.listen(process.env.PORT || 80);