const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');
// https://api.railwayapi.com/v2/arrivals/station/
// <stn code>/hours/<window period in hours>/apikey/<apikey>/

module.exports.getPassingTrain = function(request,passToHandler){
    console.log("calling getPassingTrain()");
    let parameters =request.body.queryResult.parameters;
    let STATION_CODE = parameters.STATION_CODE;
    console.log("station: "+ STATION_CODE);
    let TIME_WINDOW = parameters.TIME_WINDOW;
    let URL = getDataFromConstantFile.API_HOST + '/v2/arrivals/'
    +'station/'+ STATION_CODE + '/hours/'+TIME_WINDOW+'/apikey/'
    +getDataFromConstantFile.API_KEY_1 + '/';

    console.log("URL :" +URL);
    fromRailWayAPI.callTheRailwayApi(URL,(getResponseFromAPI)=>{
        let getJsonData = JSON.parse(getResponseFromAPI);
        let trainList = getJsonData.trains;
        //  console.log(getJsonData);
          let outPutToEndUser= '';
          let result='';
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
              result+=' Train Number: ' +trainNumbr+', '+ tarinName

                    +' Schedule Arival Time ' +schArrTime+', ' + currently +
                    '';
         }
         console.log(result);
          outPutToEndUser={
            'fulfillmentText':result
          }
          
       passToHandler(outPutToEndUser);
    });
}