const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');


module.exports.getPnrStatus = function getPnrStatus(request,passtoHandler){
    let parameters =request.body.queryResult.parameters;
    let PNR_NO =parameters.PNR_NO;
    let URL = getDataFromConstantFile.API_HOST + '/v2/pnr-status/pnr/' + PNR_NO + '/apikey/'
     + getDataFromConstantFile.API_KEY_1 + '/';
     fromRailWayAPI.callTheRailwayApi(URL,(getResponseFromAPI)=>{
        let getJsonData = JSON.parse(getResponseFromAPI);
        trainName=getJsonData.train.name;
        trainNumber=getJsonData.train.number;
        pnrNumber=getJsonData.pnr;
        pnrCurrentStatus=getJsonData.passengers[0].current_status;
        pnrBookingStatus=getJsonData.passengers[0].booking_status;
       // noOfPerson=
        dateOfJourney=getJsonData.doj;
        boardinPoint=getJsonData.boarding_point.name;
        toStation=getJsonData.to_station.name;
        fromStation=getJsonData.from_station.name;

        outPutToEndUser={
        fulfillmentText:"TRAIN: "+trainNumber+","+trainNumber+" PNR Number: "+pnrNumber
                        +" Resarvation From: "+fromStation+" to Resarvation upto: "+toStation
                        +", Boarding Staton: "+boardinPoint+ " ,DOJ: "+dateOfJourney
                        +", Booking Status: "+pnrBookingStatus+", Current Status: "+pnrCurrentStatus
    }

        passtoHandler(outPutToEndUser);
     })

}