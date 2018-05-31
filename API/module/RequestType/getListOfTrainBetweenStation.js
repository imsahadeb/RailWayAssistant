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
    let URL = getDataFromConstantFile.API_HOST + '/v2/between/source/' +SOURCE_STN + '/dest/'
    + DEST_STN + '/date/' + DATE + '/apikey/' +getDataFromConstantFile.API_KEY_1 + '/';

    fromRailWayAPI.callTheRailwayApi(URL,function(getResponseFromAPI,err){
        if(err){
            let outPutToEndUser={
                fulfillmentText="Unable to get result from Server. "+ err
            }
           
            
        }

        else{

        let getJsonData = JSON.parse(getResponseFromAPI);
        let trainList = getJsonData.trains;
      //  console.log(getJsonData);
        let outPutToEndUser= '';

        for(i=0;i<trainList.length;i++){
            tarinName= trainList[i].name;
            console.log(tarinName);
        }
        }

        passToHandler(outPutToEndUser);
    });
}