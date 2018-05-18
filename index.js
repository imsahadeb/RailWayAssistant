const express =require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const request_data= require('request');
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
    let train = request.body.queryResult.parameters['train_no'];

    let find_train_url='https://api.railwayapi.com/v2/name-number/train/'+train+'/apikey/'+API_KEY2+'/'
    request_data(find_train_url,(req,response,body)=>{
        console.log(find_train_url);
        let info= JSON.parse(body);
        let train_name=info.train['name'];
        console.log(train_name);
        res.json({
            'fulfillmentText':"Name of the  train is: " + train_name
        });

    });
   


});

app.listen(process.env.PORT || 80);