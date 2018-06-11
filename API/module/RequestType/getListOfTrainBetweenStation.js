const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');

module.exports.getListofTrainBetweenStation = function(request,passToHandler){
    // https://api.railwayapi.com/v2/between/source/
    // <stn code>/dest/<stn code>/date/<dd-mm-yyyy>/apikey/<apikey>/
    let parameters =request.body.queryResult.parameters;
    let SOURCE_STN = parameters.SOURCE_STN;
    let DEST_STN = parameters.DEST_STN;
    let DATE = parameters.DATE;
    if(DATE=='undefined'|| DATE==''){
        let date = new Date();
        console.log('date: '+date);
        var d = moment(date,'YYYY-DD-MM').format('DD-MM-YYYY');
        DATE = d;
        console.log('DATE: '+DATE);

    }
    let URL = getDataFromConstantFile.API_HOST + '/v2/between/source/' +SOURCE_STN + '/dest/'
    + DEST_STN + '/date/' + DATE + '/apikey/' +getDataFromConstantFile.API_KEY_1 + '/';

    fromRailWayAPI.callTheRailwayApi(URL,(getResponseFromAPI)=>{
        var getJsonData = JSON.parse(getResponseFromAPI);
        console.log('Result: '+getJsonData);
        var responseCode=getJsonData.response_code;
        console.log('Status Code: ' +responseCode);
        var outPutToEndUser=getDataFromConstantFile.ResponseFormat;
        var results='';
        if(responseCode!=200){  
                results='Unable to get results from Server. Please try again later.'    
        }

        else{
        //var getJsonData = JSON.parse(getResponseFromAPI);
        console.log('else :'+getJsonData);
        var trainList = getJsonData.trains;
        console.log('TRains: '+trainList[0].name);
        for(i=0;i<trainList.length;i++){
            tarinName= trainList[i].name;
            trainNumber = trainList[i].number;
            sourceDeptTime = trainList[i].src_departure_time;
            destArrivalTime = trainList[i].dest_arrival_time;
            travelTime = trainList[i].travel_time;
            sourceStation=trainList[i].from_station.name;
            sourceCode=trainList[i].from_station.code;
            destStation= trainList[i].to_station.name;
            destCode = trainList[i].to_station.code;
            
            
            
              results+='Train Number: '+trainNumber+', '+changeCase.titleCase(tarinName) 
                + ' departure time from ' +sourceStation+'('+sourceCode+') is '+sourceDeptTime
                + ' and it takes total '+travelTime +' to reach the destination staion '+ destStation+'('
                +destCode+') at '+destArrivalTime
        }
    }
     // outPutToEndUser.payload.google.expectUserResponse=false;
      outPutToEndUser.payload.google.richResponse.items[0].simpleResponse.textToSpeech=results;
      outPutToEndUser.fulfillmentText=results;

        passToHandler(outPutToEndUser);
    });
}


// var results={
//     "payload": {
//       "google": {
//         "expectUserResponse": true,
//         "richResponse": {
//           "items": [
//             {
//               "simpleResponse": {
//                 "textToSpeech": "this is a simple response"
//               }
//             }
//           ]
//         }
//       }
//     }
//   }