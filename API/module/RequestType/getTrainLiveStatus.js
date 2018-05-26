const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');

module.exports.getLiveTrainStatus= function getLiveTrainStatus(request,passtoHandler){
    let parameters = request.body.queryResult.parameters;
    let TRAIN_NO = parameters['train_no'];
    let TRAIN_DATE ='25-05-2018';
    let url = getDataFromConstantFile.API_HOST + '/v2/live/train/'+TRAIN_NO+'/date/'
    +TRAIN_DATE+'/apikey/'+getDataFromConstantFile.API_KEY_1 +'/';
    console.log("Requested Url For Live Train: "+url);
    fromRailWayAPI.callTheRailwayApi(url,(getResponseFromAPI)=>{
        let getJsonData =JSON.parse(getResponseFromAPI);
        let outPutToEndUser = {
            'fulfillmentText' : 'The train number ' +TRAIN_NO+ ', '
            + changeCase.titleCase(getJsonData.train.name) 
            + ' and the ' + changeCase.titleCase(getJsonData.position)
        }

        passtoHandler(outPutToEndUser);
    })
}