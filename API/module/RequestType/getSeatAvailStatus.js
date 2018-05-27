const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');

// https://api.railwayapi.com/v2/check-seat/train/<train number>/source/
// <stn code>/dest/<dest code>/date/<dd-mm-yyyy>/pref/<class code>/quota/<quota code>/apikey/<apikey>/


module.exports.getSeatAvailStatus = function(request,passToHandler){
    let parameters =request.body.queryResult.parameters;
    let TRAIN_NO=parameters.TRAIN_NO;
    let SOURCE_STN = parameters.SOURCE_STN;
    let DEST_STN= parameters.DEST_STN;
    let date = parameters.DATE;
    DATE = moment(date,'YYYY-MM-DD').format('DD-MM-YYYY');
    let SEAT_CLASS = parameters.SEAT_CLASS;

    let URL = getDataFromConstantFile.API_HOST +'/v2/check-seat/train/'+TRAIN_NO+'/source/'
    +SOURCE_STN+'/dest/'+DEST_STN+'/date/'+DATE+'/pref/'+SEAT_CLASS+'/quota/gn/apikey/'
    +getDataFromConstantFile.API_KEY_1+'/';
    
    fromRailWayAPI.callTheRailwayApi(URL,(getResponsefromApi)=>{
        let getJsonData = JSON.parse(getResponsefromApi);
        trainName = getJsonData.train.name;
        trainNumber = getJsonData.train.number;
        journeyClass =getJsonData.journey_class.name;
        fromStation = getJsonData.from_station.name;
        toStation = getJsonData.to_station.name;
        console.log(toStation);
        jourenyDate= getJsonData.availability[0].date;
        currentStatus = getJsonData.availability[0].status;

        
        let results = "In Train Number :"+trainNumber+', '+trainName
                      +'Journey from '+fromStation+ ' to ' + toStation
                      +' on class '+ journeyClass+ ' as on the date of '
                      + jourenyDate + ' current seat status: '+currentStatus;
   
                     console.log(results);
                     outPutToEndUser={
                         'fulfillmentText':results
                     }
                      passToHandler(outPutToEndUser);
   
          });
}