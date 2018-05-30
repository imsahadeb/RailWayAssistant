import { PassThrough } from 'stream';

///////////**********API REQUEST  HANDLER FILE *************//////
const fromRailWayAPI = require('../RailwayApiCall/calRailwayApi');
const replace =require('str-replace');

/////////******* IMPORTINGALL PARTICULAR REQUESTHANDLING FILES  ******\\\\\\\\\\\\

const getDataFromConstantFile = require('../../constraints/constant');
const fromLiveTrain = require('../module/RequestType/getTrainLiveStatus');
const fromPNR = require('../module/RequestType/getPnrStatus');
const fromTrainName = require('../module/RequestType/getTrainName');
const fromStationCode = require('../module/RequestType/getStationCode');
const fromTrainNumber = require('../module/RequestType/getTrainNumber');
const fromFareDetails = require('../module/RequestType/getFareDetails');
const fromPassingTrain = require('../module/RequestType/getPassingTrain');
const fromAvailSeat = require('../module/RequestType/getSeatAvailStatus');
const fromTBS = require('../module/RequestType/getListOfTrainBetweenStation');
const fromTrainSchedule = require('../module/RequestType/getTrainSchedule');
//const fromRailWayAPI = require('../RailwayApiCall/calRailwayApi');



module.exports.proceedTheRequests=
function (request,passtoHandler){
    console.log("Calling proceedTheRequest");
    intent =request.body.queryResult.intent.displayName;
    console.log("Intent Detected :"+intent);

   
    if(intent==getDataFromConstantFile.DEFAULT_FALLBACK_INTENT){
     // sendDefaultResponse(request,passtoHandler);
    }
    if(intent==getDataFromConstantFile.DEFAULT_INTENT){
        sendDefaultResponse(request,passtoHandler);
    }
    if(intent==getDataFromConstantFile.PNR_STATUS_INTENT){
        fromPNR.getPnrStatus(request,passtoHandler);
    }
    if(intent==getDataFromConstantFile.LIVE_TRAIN_STATUS_INTENT){
        fromLiveTrain.getLiveTrainStatus(request,passtoHandler);
    }
    if(intent==getDataFromConstantFile.SEAT_AVAIL_INTENT){
        fromAvailSeat.getSeatAvailStatus(request,passtoHandler);
    }
    if(intent==getDataFromConstantFile.FIND_STN_CODE_INTENT){
        fromStationCode.getStationCode(request,passtoHandler);
    }
    if(intent==getDataFromConstantFile.GET_TRAIN_SCHEDULE_INTENT){
        fromTrainSchedule.getTrainSchedule(request,passtoHandler);
    }

    if(intent==getDataFromConstantFile.FIND_TRAIN_NUMBER_INTENT){
        fromTrainNumber.getTrainNumber(request,passtoHandler);
    }
    if(intent==getDataFromConstantFile.FIND_TRAIN_BTWN_STN_INTENT){
        fromTBS.getListofTrainBetweenStation(request,passtoHandler);
    }
    if(intent==getDataFromConstantFile.TRAIN_PASSING_THROUGH_STN_INTENT){
        fromPassingTrain.getPassingTrain(request,passtoHandler);
    }
    if(intent==getDataFromConstantFile.GET_FARE_DETAILS_INTENT){
        fromFareDetails.getFareDetails(request,passtoHandler);
    }
    if(intent==getDataFromConstantFile.FIND_TRAIN_NAME_INTENT){
        fromTrainName.getTrainName(request,passtoHandler);
    }
}



function sendDefaultResponse(request,passtoHandler){
  var ob={
    'speech': "",
    'messages': [
    {
    'type': 0,
    'speech': 'my first response'
    },
    {
    'type': 0,
    'speech': 'my second response'
    }
    ],
    'source': 'sourcename'
    }

    passtoHandler(ob);
  }













// function sendDefaultResponse(request,passtoHandler){
//     URL ='https://api.railwayapi.com/v2/arrivals/station/ncb/hours/2/apikey/ye1rpmx0tk/';
//     fromRailWayAPI.callTheRailwayApi(URL,(getResPonseFromApi)=>{
//         getJsonData = JSON.parse(getResPonseFromApi);
//         //console.log(getJsonData);
//         total = getJsonData.total;
//         outPut ='';
//         for(i=0;i<total;i++){
//             trainName=getJsonData.trains[i].name;
//             trainNumber= getJsonData.trains[i].number;
//             arrivalTime=getJsonData.trains[i].scharr;
//             deptTime = getJsonData.trains[i].schdep;
//             currentStatus = getJsonData.trains[i].delayarr;
//             // outPut +="  'cells':[{'text':'" +trainName+"("+trainNumber+")'},"
//             //           +"{ 'text':'"+arrivalTime+"'},"
//             //           +"{ 'text': '"+deptTime+"'},"
//             //           +"{ 'text': '"+currentStatus+"'}],'dividerAfter':true}, "
             

//             outPut+={
//                   'cells':"[{"+'text'+":'"+trainName+"'("+trainNumber+")'},"
//                      +"{"+'text'+":'"+arrivalTime+"'},"
//                      +"{"+'text'+":'"+deptTime+"'},"
//                      +"{"+'text'+":'"+currentStatus+"'}],"+'dividerAfter'+"true},"
        
//             }
//             console.log(outPut.cells);
           

           

//         }
//      // let fiterd = JSON.parse(outPut);

//     var results={
//         "payload": {
//           "google": {
//             "expectUserResponse": true,
//             "richResponse": {
//               "items": [
//                 {
//                   "simpleResponse": {
//                     "textToSpeech": "Simple Response"
//                   }
//                 },
//                 {
//                   "tableCard": {
//                     "title": "Table Title",
//                     "subtitle": "Table Subtitle",
//                     "image": {
//                       "url": "https://avatars0.githubusercontent.com/u/23533486",
//                       "accessibilityText": "Actions on Google"
//                     },
//                     "rows": [
//                         outPut
//                     ],
//                     "columnProperties": [
//                       {
//                         "header": "Train Name(No)",
//                         "horizontalAlignment": "LEADING"
//                       },
//                       {
//                         "header": "Arr Time",
//                         "horizontalAlignment": "CENTER"
//                       },
//                       {
//                         "header": "Dep. Time",
//                         "horizontalAlignment": "CENTER"
//                       },
//                       {
//                           "header":"Current State",
//                           "horizontalAlignment":"TRAILING"
//                       }
//                     ],
//                     "buttons": [
//                       {
//                         "title": "Button Title",
//                         "openUrlAction": {
//                           "url": "https://github.com/actions-on-google"
//                         }
//                       }
//                     ]
//                   }
//                 }
//               ]
//             },
//             "userStorage": "{\"data\":{}}"
//           }
//         }
//       }
//       passtoHandler(results);
//     })
     
// }