
///////////**********API REQUEST  HANDLER FILE *************//////
const fromRailWayAPI = require('../RailwayApiCall/calRailwayApi');

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




module.exports.proceedTheRequests=
function (request,passtoHandler){
    console.log("Calling proceedTheRequest");
    intent =request.body.queryResult.intent.displayName;
    console.log("Intent Detected :"+intent);

   
    if(intent==getDataFromConstantFile.DEFAULT_FALLBACK_INTENT){


    }
    if(intent==getDataFromConstantFile.DEFAULT_INTENT){
        sendDefaultResponse(request,passtoHandler);
    }
    if(intent==getDataFromConstantFile.PNR_STATUS_INTENT){
        getPnrStatus(request,passtoHandler);
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

    var results={
          "payload": {
             "google": {
                     "expectUserResponse": true,
                     "richResponse": {
                       "items": [
                       
                          {
                            "simpleResponse": {
                              'textToSpeech': 'Here is the suggestions for you',
                              'diaplayText': 'hello hi this is smaple text, hindn dhkjxdbkbkbb  dhbhbjdb jbcjbdj'
                            }
                          },
                          {
                            "optionInfo": {
                                "key": "live status",
                                "synonyms": [
                                    'live sataus'
                                ]
                            },
                            "title": "Train No:13148, Uttarbango Exp",
                            "description": "Actual Arrival Time: 3:20 pm, is running late by 2 hours",
                        }, 
                        {
                            "optionInfo": {
                                "key": "live statu",
                                "synonyms": [
                                    'live satau'
                                ]
                            },
                            "title": "Train No:13148, Uttarbango Exp",
                            "description": "Actual Arrival Time: 3:20 pm, is running late by 2 hours",
                        },
                        ],
                       "suggestions": [
                         {
                           "title": "PNR Staus"
                         },
                         {
                           "title": "Live Train Running Status"
                         },
                         {
                           "title": "Current Seat Availibility"
                         },
                         {
                           "title": "Train Schedule"
                         },
                         {
                             "title":"Find Train Name"
                         }
        
                       ]
                       
                     }
                   }
                 }
        }

        passtoHandler(results);
         

}



