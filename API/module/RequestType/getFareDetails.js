const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');

module.exports.getFareDetails = function(request,passToHandler){
    let parameters =request.body.queryResult.parameters;
    let SOURCE_STN_CODE = parameters.SOURCE_STN_CODE;
    let DEST_STN_CODE = parameters.DEST_STN_CODE;
    let TRAIN_NUMBER = parameters.TRAIN_NUMBER;
    let SEAT_CLASS = parameters.SEAT_CLASS;
    let DATE=new Date();
    DATE = moment(DATE,'YYYY-DD-MM').format('DD-MM-YYYY');

    let url =getDataFromConstantFile.API_HOST + '/v2/fare/train/'+TRAIN_NUMBER+'/source/'
    +source_stn_code+'/dest/' + DEST_STN_CODE +'/age/20/pref/'+SEAT_CLASS
    +'/quota/GN/date/'+DATE + '/apikey/'+getDataFromConstantFile.API_KEY_1+ '/';

    fromRailWayAPI.callTheRailwayApi(url,(getResponseFromAPI,err)=>{
        if(err){
            let outPutToEndUser={
                fulfillmentText="Unable to get result from Server. "+ err
            }
           
          //  passToHandler(outPutToEndUser);
        }

        else{
            let getJsonData = JSON.parse(getResponseFromAPI);
            let outPutToEndUser = {
               // 'fulfillmentText':
            }
           
        }
        passtoHandler(outPutToEndUser);
    });

}