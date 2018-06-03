const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');
// https://api.railwayapi.com/v2/arrivals/station/
// <stn code>/hours/<window period in hours>/apikey/<apikey>/

module.exports.getPassingTrain = function(request,passToHandler){
    console.log("calling getPassingTrain()");
    let parameters =request.body.queryResult.parameters;
    let outPutContextParameters=request.body.queryResult.outputContexts[0].parameters;
    let STATION_CODE = parameters.STATION_CODE;
    if(STATION_CODE=='undefined'){
        STATION_CODE=outPutContextParameters.STATION_CODE
    }
    console.log("station: "+ STATION_CODE);
    let TIME_WINDOW = parameters.TIME_WINDOW.amount;
    if(TIME_WINDOW=='undefined'){
        TIME_WINDOW=outPutContextParameters.TIME_WINDOW.amount;
    }
    let URL = getDataFromConstantFile.API_HOST + '/v2/arrivals/'
    +'station/'+ STATION_CODE + '/hours/'+TIME_WINDOW+'/apikey/'
    +getDataFromConstantFile.API_KEY_1 + '/';

    console.log("URL :" +URL);
    fromRailWayAPI.callTheRailwayApi(URL,(getResponseFromAPI)=>{
        var getJsonData = JSON.parse(getResponseFromAPI);
        var responseCode=getJsonData.response_code;
        var outPutToEndUser='';
        var results='';
        if(responseCode!=200){  
                results='Unable to get results from Server. Please try again later.'    
        }
        else{
       // let getJsonData = JSON.parse(getResponseFromAPI);
        let trainList = getJsonData.trains;
        //  console.log(getJsonData);
          var outPutToEndUser= '';
         
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
                    '';
         }
        }
        outPutToEndUser={
            'fulfillmentText':results
          }
       passToHandler(outPutToEndUser);
    });
}