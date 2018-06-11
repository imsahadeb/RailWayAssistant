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
        var getJsonData = JSON.parse(getResponseFromAPI);
        var responseCode=getJsonData.response_code;
        var outPutToEndUser=getDataFromConstantFile.ResponseFormat;
        var results='';
        if(responseCode!=200){  
                results='Unable to get results from Server. Please try again later.'    
        }

        else{
           // let getJsonData = JSON.parse(getResponseFromAPI);
          //  trainName=;
            trainName=changeCase.titleCase(getJsonData.train.name);
            trainNumber=getJsonData.train.number;
            pnrNumber=getJsonData.pnr;
            pnrCurrentStatus=getJsonData.passengers[0].current_status;
            pnrBookingStatus=getJsonData.passengers[0].booking_status;
           // noOfPerson=
            dateOfJourney=getJsonData.doj;
            boardinPoint=getJsonData.boarding_point.name;
            toStation=getJsonData.to_station.name;
            fromStation=getJsonData.from_station.name;
            chart=getJsonData.chart_prepared;
            if(chart==true){
                chart="Chart Prepared"
            }
            else if(chart==false){
                chart="Chart Not Prepared"
            }
            totalPassemger= getJsonData.total_passengers;
    
            
            results="TRAIN: "+trainNumber+","+trainName+", PNR Number: "+pnrNumber
                            +", Resarvation From: "+fromStation+" to Resarvation upto: "+toStation
                            +", Boarding Staton: "+boardinPoint+ " ,DOJ: "+dateOfJourney
                            +", Number of Person: "+totalPassemger
                            +", Booking Status: "+pnrBookingStatus+", Current Status: "+pnrCurrentStatus
                            +", Chart Status: "+chart
                            +'\n\n'
        }
        outPutToEndUser.payload.google.richResponse.items[0].simpleResponse.textToSpeech=results;
        outPutToEndUser.fulfillmentText=results;
        outPutToEndUser.payload.facebook.text=results;
        outPutToEndUser.payload.facebook.quick_replies[0].payload='Send SMS';
        outPutToEndUser.payload.facebook.quick_replies[0].title='Send SMS';
        outPutToEndUser.payload.google.richResponse.suggestions[0].title="Send sms";
        outPutToEndUser.payload.google.richResponse.suggestions[1].title="Check Another PNR";


        passtoHandler(outPutToEndUser);
    })
      

}