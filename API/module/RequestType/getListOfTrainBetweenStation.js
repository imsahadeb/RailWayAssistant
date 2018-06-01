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

    fromRailWayAPI.callTheRailwayApi(URL,function(getResponseFromAPI,err){
        var outPutToEndUser='';
        if(err){
             outPutToEndUser={
                fulfillmentText:"Unable to get result from Server. "+err
            }
           
            
        }

        else{

        var getJsonData = JSON.parse(getResponseFromAPI);
        var trainList = getJsonData.trains;
      //  console.log(getJsonData);
        //var outPutToEndUser= '';

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
            
            
            outPutToEndUser={
                fulfillmentText:'Train Number: '+trainNumber+', '+changeCase.titleCase(tarinName) 
                + ' departure time from ' +sourceStatin+'('+sourceCode+') is '+sourceDeptTime
                + ' and it takes total '+travelTime +' to reach the destination staion '+ destStation+'('
                +destCode+') at '+destArrivalTime
            }
        }
        }

        passToHandler(outPutToEndUser);
    });
}