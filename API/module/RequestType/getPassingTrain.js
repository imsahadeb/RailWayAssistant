const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');
// https://api.railwayapi.com/v2/arrivals/station/
// <stn code>/hours/<window period in hours>/apikey/<apikey>/

module.exports.getPassingTrain = function(request,passToHandler){
    console.log("calling getPassingTrain()");
    let parameters =request.body.queryResult.parameters;
    var outPutContextParameters=request.body.queryResult.outputContexts[0].parameters;
    console.log(outPutContextParameters);
    var STATION_CODE = outPutContextParameters.STATION_CODE;
    // if(STATION_CODE=='undefined'){
    //     STATION_CODE=outPutContextParameters.STATION_CODE
    // }
    console.log("station: "+ STATION_CODE);
    var TIME_WINDOW = parameters.TIME_WINDOW.amount;
    // if(TIME_WINDOW=='undefined'){
    //     TIME_WINDOW=outPutContextParameters.TIME_WINDOW.amount;
    // }
    let URL = getDataFromConstantFile.API_HOST + '/v2/arrivals/'
    +'station/'+ STATION_CODE + '/hours/'+TIME_WINDOW+'/apikey/'
    +getDataFromConstantFile.API_KEY_1 + '/';

    console.log("URL :" +URL);
    fromRailWayAPI.callTheRailwayApi(URL,(getResponseFromAPI)=>{
        var getJsonData = JSON.parse(getResponseFromAPI);
        var responseCode=getJsonData.response_code;
        var outPutToEndUser=getDataFromConstantFile.ResponseFormat;
        var results='';
        if(responseCode!=200){  
                results='Unable to get results from Server. Please try again later.'    
        }
        else{
        let trainList = getJsonData.trains;
          for(i=0;i<trainList.length;i++){
              tarinName= trainList[i].name;
              trainNumbr= trainList[i].number;
              schArrTime = trainList[i].scharr;
              currently = trainList[i].delayarr;
              if(currently !='RIGHT TIME'){
                  currently="is late by " + currently + " minutes";
              }
              if(currently=='RIGHT TIME'){
                  currently = 'and it on Right Time';
              }
              results+=' Train Number: ' +trainNumbr+', '+ tarinName
                        +' Schedule Arival Time ' +schArrTime+', ' + currently +
                        '\n\n';
         }
        }
       // outPutToEndUser.payload.google.expectUserResponse=false;
        outPutToEndUser.payload.google.richResponse.items[0].simpleResponse.textToSpeech=results;
        outPutToEndUser.fulfillmentMessages[0].text.text=results;
        passToHandler(outPutToEndUser);
    });
}