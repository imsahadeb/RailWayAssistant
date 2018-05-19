const express =require('express');
const axios = require('axios');
const changeCase = require('change-case');
const bodyParser = require('body-parser');
const request_data= require('request');
var replace = require("str-replace");
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

    var train_no = request.body.queryResult.parameters['train_no'];
    var find_position_by_no=request.body.queryResult.parameters['find_position_by_no'];

    if(find_position_by_no){
        let find_train_url='https://api.railwayapi.com/v2/live/train/'+find_position_by_no+'/date/'+date+'/apikey/'+API_KEY2+'/'
        request_data(find_train_url,(req,response,body)=>{
        console.log(find_train_url);
        let info= JSON.parse(body);
        let train_name=info.train['name'];
        let position = info['position'];
        
        
        console.log(train_name);
        res.status(200).json({
            'fulfillmentText':"The Train Number " + info.train['number'] + ','
            + replace("Exp").from(changeCase.titleCase(info.train['name'])).with("Express")
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
        let train_name=info.train['name'];
        console.log(train_name);
        res.status(200).json({
            // 'fulfillmentText':"The name of the Train Number " +info.train['number']+ ' is '
            //  +replace.all("Exp","Express").from(changeCase.titleCase(info.train['name'])).with("Express")

            
                "fulfillmentText": "This is a text response",
                "fulfillmentMessages": [
                  {
                    "card": {
                      "title": "card title",
                      "subtitle": "card text",
                      "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
                      "buttons": [
                        {
                          "text": "button text",
                          "postback": "https://assistant.google.com/"
                        }
                      ]
                    }
                  }
                ]
                

        });
        res.end();

    });
   }
    
   


});

app.listen(process.env.PORT || 80);