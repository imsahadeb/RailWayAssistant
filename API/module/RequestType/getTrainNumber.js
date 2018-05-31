const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');


module.exports.getTrainNumber = function(request,passToHandler){
    let parameters =request.body.queryResult.parameters;
    let TRAIN_NAME = parameters.TRAIN_NAME;
    console.log("TRAIN NO: "+TRAIN_NAME);
    let URL = getDataFromConstantFile.API_HOST +'/v2/name-number/train/'+TRAIN_NAME
              +'/apikey/'+getDataFromConstantFile.API_KEY_1+'/';
    
    fromRailWayAPI.callTheRailwayApi(URL,(getResponseFromApi,err)=>{
        if(err){
            outPutToEndUser={
                fulfillmentText:'unable to get results from server.' + err
            }
            passToHandler(outPutToEndUser);
        }

        else{
            let getJsonData = JSON.parse(getResponseFromApi);
            let trainName = getJsonData.train.name;
            let trainNumber = getJsonData.train.number;
             let results={
                 'fulfillmentText':'Train Name: ' +trainName+', '+'Tran Number: '+trainNumber
             }
    
             passToHandler(results);

        }
      
    })
    
}