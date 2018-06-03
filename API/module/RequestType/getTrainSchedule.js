const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');


module.exports.getTrainSchedule = function(request,passToHandler){
    let parameters =request.body.queryResult.parameters;
    let TRAIN_NO = parameters.TRAIN_NO;

    
    let URL = getDataFromConstantFile.API_HOST + '/v2/route/train/'
    + TRAIN_NO + '/apikey/'+getDataFromConstantFile.API_KEY_1 + '/';

    fromRailWayAPI.callTheRailwayApi(URL,(getResponseFromAPI)=>{
        var getJsonData = JSON.parse(getResponseFromAPI);
        var responseCode=getJsonData.response_code;
        console.log('Response Code: '+responseCode);
       // var outPutToEndUser='';
      var outPutToEndUser={
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": ''
                  }
                }
              ]
            }
          }
        }
      }

          
          
        var results='';
        if(responseCode!=200){  
                results='Unable to get results from Server. Please try again later.'    
        }

        else{
       
            tarinName=getJsonData.train.name;
            trainNo = getJsonData.train.number;
            route= getJsonData.route
           
            for(i=0;i<route.length;i++){
                stationName = route[i].station.name;
                arrTime = route[i].scharr;
                depTime = route[i].schdep;
                haltTime = route[i].halt;
                distFromSource = route[i].distance;
    
                results+="Station: " +stationName + " Distance :"+distFromSource+"\n\n" 
                       +"Arrival Time :" +arrTime + " Departure time: " +depTime+"\n\n"
                       +'\n\n'
                       +'\n\n'
            }
        }
        console.log('Results: '+results);
        outPutToEndUser.payload.google.expectUserResponse=false;
        outPutToEndUser.payload.google.richResponse.items[0].simpleResponse.textToSpeech=results;
        
        console.log('outPutToEndUser: '+outPutToEndUser);
        passToHandler(outPutToEndUser);
    })

    
}

