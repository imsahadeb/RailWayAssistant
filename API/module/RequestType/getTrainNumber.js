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
    
    fromRailWayAPI.callTheRailwayApi(URL,(getResponseFromAPI)=>{
        var getJsonData = JSON.parse(getResponseFromAPI);
        var responseCode=getJsonData.response_code;
        var outPutToEndUser='';
        if(responseCode!=200){
            outPutToEndUser={
                fulfillmentText:'unable to get results from Server. Please try again later.'
            }
           // passToHandler(outPutToEndUser);
        }

        else{
            let getJsonData = JSON.parse(getResponseFromApi);
            let trainName = getJsonData.train.name;
            let trainNumber = getJsonData.train.number;
              outPutToEndUser={
                 'fulfillmentText':'Train Name: ' +trainName+', '+'Tran Number: '+trainNumber
             }
    
           

        }
        passToHandler(outPutToEndUser);
    })
    
}