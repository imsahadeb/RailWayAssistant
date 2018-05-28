
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
                    "textToSpeech": "Choose a item"
                  }
                }
              ]
            },
            "systemIntent": {
              "intent": "actions.intent.OPTION",
              "data": {
                "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                "listSelect": {
                  "title": "Train List",
                  "items": [
                    {
                      "title": "Train No: 13148, Uttarbango Express",
                      "description": "Actual Arrival Time: 3:15 pm, is late by 30 min",  
                      "optionInfo": {
                        "key": "first title key"
                      }
                      
                     
                    },
                    {
                      "optionInfo": {
                        "key": "second"
                      },
                      "description": "Actual Arrival Time: 5:15pm, is on Right Time",
                      
                      "title": "Train No: 12345, Saraighat Express"
                    }
                  ]
                }
              }
            }
          }
        }
      }


      var ob={
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "Train List"
                  }
                },
                {
                  "tableCard": {
                    "rows": [
                      {
                        "cells": [
                          {
                            "text": "row 1 item 1"
                          },
                          {
                            "text": "row 1 item 2"
                          },
                          {
                            "text": "row 1 item 3"
                          }
                        ],
                        "dividerAfter": true
                      },
                      {
                        "cells": [
                          {
                            "text": "row 2 item 1"
                          },
                          {
                            "text": "row 2 item 2"
                          },
                          {
                            "text": "row 2 item 3"
                          }
                        ],
                        "dividerAfter": true
                      }
                    ],
                    "columnProperties": [
                      {
                        "header": "header 1"
                      },
                      {
                        "header": "header 2"
                      },
                      {
                        "header": "header 3"
                      }
                    ]
                  }
                }
              ]
            },
            "userStorage": "{\"data\":{}}"
          }
        }
      }

      var tableCard={
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "Simple Response"
                  }
                },
                {
                  "tableCard": {
                    "title": "Table Title",
                    "subtitle": "Table Subtitle",
                    "image": {
                      "url": "https://avatars0.githubusercontent.com/u/23533486",
                      "accessibilityText": "Actions on Google"
                    },
                    "rows": [
                      {
                        "cells": [
                          {
                            "text": "row 1 item 1"
                          },
                          {
                            "text": "row 1 item 2"
                          },
                          {
                            "text": "row 1 item 3"
                          }
                        ],
                        "dividerAfter": false
                      },
                      {
                        "cells": [
                          {
                            "text": "row 2 item 1"
                          },
                          {
                            "text": "row 2 item 2"
                          },
                          {
                            "text": "row 2 item 3"
                          }
                        ],
                        "dividerAfter": true
                      },
                      {
                        "cells": [
                          {
                            "text": "row 2 item 1"
                          },
                          {
                            "text": "row 2 item 2"
                          },
                          {
                            "text": "row 2 item 3"
                          }
                        ]
                      }
                    ],
                    "columnProperties": [
                      {
                        "header": "header 1",
                        "horizontalAlignment": "CENTER"
                      },
                      {
                        "header": "header 2",
                        "horizontalAlignment": "LEADING"
                      },
                      {
                        "header": "header 3",
                        "horizontalAlignment": "TRAILING"
                      }
                    ],
                    "buttons": [
                      {
                        "title": "Button Title",
                        "openUrlAction": {
                          "url": "https://github.com/actions-on-google"
                        }
                      }
                    ]
                  }
                }
              ]
            },
            "userStorage": "{\"data\":{}}"
          }
        }
      }
      passtoHandler(tableCard);
    }
      