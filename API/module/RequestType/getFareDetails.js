const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');

module.exports.getFareDetails = function(request,passToHandler){
    let parameters =request.body.queryResult.parameters;
    let source_stn_code = parameters.SOURCE_STN_CODE;
    let dest_stn_code = parameters.DEST_STN_CODE;
    let train_number = parameters.TRAIN_NUMBER;
    let date=new Date();
    date = moment(date,'YYYY-DD-MM').format('DD-MM-YYYY');

    let url =getDataFromConstantFile.API_HOST + '/v2/fare/train/'+train_number+'/source/'
    +source_stn_code+'/dest/' + dest_stn_code +'/age/20/pref/'+seat_class
    +'/quota/GN/date/'+date + '/apikey/'+getDataFromConstantFile.API_KEY_1+ '/';

    fromRailWayAPI.callTheRailwayApi(url,(getResponseFromAPI)=>{
        let getJsonData = JSON.parse(getResponseFromAPI);
        let outPutToEndUser = {
           // 'fulfillmentText':
        }
        passtoHandler(outPutToEndUser);
    });

}