module.exports = {

    // |||||||||||||||||||||||||||||FOR INTENT HANDLING||||||||||||||||||||||||||||||||
    
    DEFAULT_INTENT:'Default Welcome Intent',
    DEFAULT_FALLBACK_INTENT:'Default Falback Intent',
    PNR_STATUS_INTENT:'Check_Pnr_Status',
    LIVE_TRAIN_STATUS_INTENT : 'current position',
    SEAT_AVAIL_INTENT :'check available seat',
    FIND_TRAIN_NAME_INTENT : 'find train name',
    //FIND_TRAIN_CODE_INTENT:'find train code',
    FIND_TRAIN_BTWN_STN_INTENT:'find train btwn two station',
    TRAIN_PASSING_THROUGH_STN_INTENT :'live station',
    TRAIN_PASSING_THROUGH_STN_INTENT_ANY:'Live_Station_Code_Any_Get_Hours',                             
    FIND_STN_CODE_INTENT:'find station code',
    FIND_TRAIN_NUMBER_INTENT:'find train number',
    GET_TRAIN_SCHEDULE_INTENT:'get train schedule',
    GET_FARE_DETAILS_INTENT:'get train fare',
    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    ////////////////////////////////*****API INORMATION*****\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    API_HOST:'https://api.railwayapi.com',
    API_KEY_2:"q86si59pft",
    API_KEY_1:'0og4a2g5ij',
    API_KEY_3:'',
    //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    ////////////////////////////******PARSING PARAMETERS***********///////////////////


    ResponseFormat:{
      "fulfillmentText":"",
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": ''
                  }
                }
              ],
              "suggestions": [
                {
                  "title": "PNR Status"
                },
                {
                  "title": "Live Station"
                },
                {
                  "title": "Live Train Status"
                },
                {
                  "title":"Check Ticket"
                }
              ]
            }
          }
        }
      }



}