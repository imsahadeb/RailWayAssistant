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
    var intent = request.body.queryResult.intent.displayName;

   console.log('Intent Triggered: '+intent);
   if(intent=='undefined'){
         res.status(200).json({
        'fulfillmentText': 'Problem with intent detection....'
    })
    
   }

   if(intent=='Default Welcome Intent'){
       res.json({
            "payload": {
              "facebook" : {
                "attachment" : {
                    "type" : "template",
                    "payload" : {
                        "template_type" : "generic",
                        "elements" : [ 
                            {
                                "title" : ".Sahadeb",
                                "image_url" : "https://i2.wp.com/mpplindia.com/wp-content/uploads/2015/12/indian-railway-logo.png?resize=300%2C300"
                            }
                        ]
                    }
                }
            },
              "google": {
                "expectUserResponse": true,
                "richResponse": {
                  "items": [
                    {
                      "simpleResponse": {
                        "textToSpeech": "Here is the suggestions for you"
                      }
                    },
                    {
                      "simpleResponse": {
                        "textToSpeech": "You can click on any suggestions for forther assistant."
                      }
                    },
                    {
                        "basicCard": {
                            "title": "Math & prime numbers",
                            "formattedText": "42 is an even composite number. It\n    is composed of three distinct prime numbers multiplied together. It\n    has a total of eight divisors. 42 is an abundant number, because the\n    sum of its proper divisors 54 is greater than itself. To count from\n    1 to 42 would take you about twenty-one…",
                            "image": {
                                "url": "https://example.google.com/42.png",
                                "accessibilityText": "Image alternate text"
                            },
                            "buttons": [
                                {
                                    "title": "Read more",
                                    "openUrlAction": {
                                        "url": "https://example.google.com/mathandprimes"
                                    }
                                }
                            ],
                            "imageDisplayOptions": "CROPPED"
                        }
                    }



                  ],
                  "suggestions": [
                    {
                      "title": "PNR Staus"
                    },
                    {
                      "title": "Live Train Running Status"
                    },
                    {
                      "title": "Current Seat Availibility"
                    },
                    {
                      "title": "Train Schedule"
                    },
                    {
                        "title":"Find Train Name"
                    }

                  ]
                  
                }
              }
            }
          
       })
   }
    
    if(intent=='check available seat'){
        var train_no = parameters['train_no'].trim();
        var date=parameters['date'];
        var train_date=moment(date,'YYYY-MM-DD').format('DD-MM-YYYY').trim();
        var source=parameters['source_stn'].trim();
        var dest=parameters['dest_stn'].trim();
        var seat_class=parameters['seat_class'].trim();
         let url = 'https://api.railwayapi.com/v2/check-seat/train/'+train_no+'/source/'+source+'/dest/'
         +dest+'/date/'+train_date+'/pref/'+seat_class+'/quota/gn/apikey/'+API_KEY1+'/';
         console.log(url);
         request_data(url,(req,response,body)=>{
            let info=JSON.parse(body);
            res.status(200).json({
               
                    "payload": {
                      "google": {
                        "expectUserResponse": true,
                        "richResponse": {
                          "items": [
                            {
                              "simpleResponse": {

                                "textToSpeech": 'Train Name : '+info.train['name'] 
                                 + ' Source Station: ' +info.from_station['name']
                                 + '  Destination Satation : ' +info.to_station['name']
                                 + '  Journey Class : ' +info.journey_class['name']
                                 + '  Journey Date : ' + info['availability'][0]['date']
                                 + '  Current Seat Status : ' +info['availability'][0]['status']

                              }
                            }
                          ]
                        },
                        "systemIntent": {
                          "intent": "actions.intent.OPTION",
                          "data": {
                            "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                            "listSelect": {
                              "title": "Hello",
                              "items": [
                                {
                                  "optionInfo": {
                                    "key": "first title key"
                                  },
                                  "description": "first description",
                                  "title": "first title",
                                  "image": {
                                    "url": "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
                                    "accessibilityText": "first alt"
                                  },
                               
                                },
                                {
                                  "optionInfo": {
                                    "key": "second"
                                  },
                                  "description": "second description",
                                  "image": {
                                    "url": "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw",
                                    "accessibilityText": "second alt"
                                  },
                                  "title": "second title"
                                }
                              ]
                            }
                          }
                        }
                      }
                    }
                  
            });
            res.end();
         });
        
    }

    if(intent=='current position'){
        var date=parameters['date'];
        var train_date=moment(date,'YYYY-MM-DD').format('DD-MM-YYYY').trim();
        let find_position_by_no=parameters['find_position_by_no'].trim();

       // console.log(find_position_by_no);
      //  console.log(find_position_by_no.trim());
        let find_train_url='https://api.railwayapi.com/v2/live/train/'+find_position_by_no+'/date/'
        +train_date+'/apikey/'+API_KEY1+'/'
        console.log('URL: '+find_train_url);
        request_data(find_train_url,(req,response,body)=>{
        console.log('calling.....');
        let info= JSON.parse(body);
        console.log(info);
        let train_name=info.train['name'];
        let position = info['position'];
        res.json({
            'fulfillmentText':"The Train Number " + info.train['number'] + ','
            + changeCase.titleCase(info.train['name'])
            + ' and the '+changeCase.titleCase(position)
        });
        res.end();

    });
    }

   if(intent=='find train name'){
    var train_no = parameters['train_no'].trim();
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
//    else{
//     res.status(200).json({
//         'fulfillmentText': 'Error'
//     })
//    }
    


});

app.listen(process.env.PORT || 80);