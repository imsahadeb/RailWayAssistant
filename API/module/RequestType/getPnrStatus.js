const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');


module.exports.getPnrStatus = function getPnrStatus(request,passtoHandler){
    let parameters =request.body.queryResult.parameters;
    let PNR_NO =parameters.PNR_NO;
    let URL = getDataFromConstantFile.API_HOST + '/v2//pnr_status/pnr/' + PNR + '/apikey/'
     + getDataFromConstantFile.API_KEY_1 + '/';
     fromRailWayAPI.callTheRailwayApi(URL,(getResponseFromAPI)=>{
        let getJsonData = JSON.parse(getResponseFromAPI);
        passtoHandler(getJsonData);
     })

}