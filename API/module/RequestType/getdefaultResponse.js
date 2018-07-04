const changeCase = require('change-case');
const random = require('random-number');
const moment = require('moment');
//const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');
const getResposeData = require('../../../constraints/responses');

module.exports.getDefaultResponse = function getDefaultResponse(request,passtoHandler){
    let getResponseArray=getResposeData.DefaultResponse;
    let randomOptions=getDataFromConstantFile.randomOptions;
    randomOptions.min=0;
    randomOptions.max=getResponseArray.length-1;
    console.log('Random value:' +randomOptions);
    let results = getResponseArray[random(randomOptions)];
    let outPutToEndUser=getDataFromConstantFile.ResponseFormat;
        outPutToEndUser.payload.google.richResponse.items[0].simpleResponse.textToSpeech=results;
        outPutToEndUser.fulfillmentText=results;
        outPutToEndUser.payload.facebook.text=results;
    passtoHandler(outPutToEndUser);
}