const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');

module.exports.getLiveTrainStatus= function getLiveTrainStatus(request,passtoHandler){
    let parameters = request.body.queryResult.parameters;
    let TRAIN_NO = parameters['TRAIN_NO'];
    let TRAIN_DATE =moment(parameters.DATE,'YYYY-MM-DD').format('DD-MM-YYYY');
    console.log("TRAIN_DATE: " +TRAIN_DATE);
    let url = getDataFromConstantFile.API_HOST + '/v2/live/train/'+TRAIN_NO+'/date/'
    +TRAIN_DATE+'/apikey/'+getDataFromConstantFile.API_KEY_1 +'/';
    console.log("Requested Url For Live Train: "+url);
    fromRailWayAPI.callTheRailwayApi(url,(getResponseFromAPI)=>{
        var getJsonData = JSON.parse(getResponseFromAPI);
        var responseCode=getJsonData.response_code;
       // var outPutToEndUser='';
        var outPutToEndUser=getDataFromConstantFile.ResponseFormat;
        var results='';
        if(responseCode!=200){  
                results='Unable to get results from Server. Please try again later.'    
        }

        else{
      //  let getJsonData =JSON.parse(getResponseFromAPI);
         results ='The train number ' +TRAIN_NO+ ', '
            + changeCase.titleCase(getJsonData.train.name) 
            + ' and the ' + changeCase.titleCase(getJsonData.position)
        }
        outPutToEndUser.payload.google.richResponse.items[0].simpleResponse.textToSpeech=results;
        outPutToEndUser.fulfillmentText=results;
        passtoHandler(outPutToEndUser);
    })
}