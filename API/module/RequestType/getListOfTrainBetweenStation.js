const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');

module.exports.getListofTrainBetweenStation = function(request,passToHandler){
    // https://api.railwayapi.com/v2/between/source/
    // <stn code>/dest/<stn code>/date/<dd-mm-yyyy>/apikey/<apikey>/
    let parameters =request.body.queryResult.parameters;
    let source_stn = parameters.SOURCE_STN;
    let dest_stn = parameters.DEST_STN;
    let date = parameters.DATE;
    let url = getDataFromConstantFile.API_HOST + '/v2/between/source/' +source_stn + '/dest/'
    + dest_stn + '/date/' +date + '/apikey/' +getDataFromConstantFile.API_KEY_1 + '/';

    fromRailWayAPI.callTheRailwayApi(url,function(getResponseFromAPI){

        let getJsonData = JSON.parse(getResponseFromAPI);
        let trainList = getJsonData.trains;
      //  console.log(getJsonData);
        let outPutToEndUser= '';

        for(i=0;i<trainList.length;i++){
            tarinName= trainList[i].name;
            console.log(tarinName);
        }
        
    });
}