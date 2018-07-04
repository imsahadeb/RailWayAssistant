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
    SEND_PNR_ON_MOBILE_INTENT:'Check_Pnr_Status_Send_SMS',
    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    ////////////////////////////////*****API INORMATION*****\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    API_HOST:'https://api.railwayapi.com',
    API_KEY_2:"fjaxzkx1wg",
    API_KEY_1:'fjaxzkx1wg',
    API_KEY_3:'',
    TWILIO_ACOUNT_SID:'AC541548859ee1372e7ea451b1812c97b8',
    TWILIO_AOUTH_CODE:'hidef13a46b9d6cb62e24ee0fdda2d4fdd7f',
    //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    ////////////////////////////******PARSING PARAMETERS***********///////////////////

    randomOptions:{
      min: '',
      max:'', 
      integer: true
    },

    ResponseFormat:{
      "fulfillmentText":"",
        "payload": {
          "facebook":{
            "text": "",
            "quick_replies":[
              {
                "content_type":"text",
                "title":"PNR Status",
                "payload":"PNR Status",
              
              },
              {
                "content_type":"text",
                "title":"Live Station",
                "payload":"Live Station",

              },
              {
                "content_type":"text",
                "title":"Check Ticket",
                "payload":"Check ticket",
              },
              {
                "content_type":"text",
                "title":"Train Schedule",
                "payload":"Train Schedule",
              }
            ]
          },
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
