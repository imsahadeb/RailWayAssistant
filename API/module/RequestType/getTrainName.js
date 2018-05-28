const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');


module.exports.getTrainName = function(request,passToHandler){

  //  https://api.railwayapi.com/v2/name-number/train/<name or number>/apikey/<apikey>/
    let parameters =request.body.queryResult.parameters;
    let TRAIN_NO = parameters.TRAIN_NO;
    console.log("TRAIN NO: "+TRAIN_NO);
    let URL = getDataFromConstantFile.API_HOST +'/v2/name-number/train/'+TRAIN_NO
              +'/apikey/'+getDataFromConstantFile.API_KEY_1+'/';
    
    fromRailWayAPI.callTheRailwayApi(URL,(getResponseFromApi)=>{
        let getJsonData = JSON.parse(getResponseFromApi);
        let trainName = getJsonData.train.name;
        let trainNumber = getJsonData.train.number;
         let results={
             'fulfillmentText':'Train Name: ' +trainName+', '+'Tran Number: '+trainNumber
         }

         passToHandler(results);
    })
}