const changeCase = require('change-case');
const moment = require('moment');
const random = require('random-number');

const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');
const getResposeData = require('../../../constraints/responses');


module.exports.getPnrStatus = function getPnrStatus(request,passtoHandler){
    var results='';
    let parameters =request.body.queryResult.parameters;
    let PNR =parameters.PNR_NO;
    PNR = PNR.toString();
    PNR_NO=PNR.replace(/ /g,'');
    if(PNR_NO.length!=10){
        console.log('PNR: pnr is not 10 digit');
        if(PNR_NO.length<10){
            let getResponseArray=getResposeData.smallPNR;
            let options=getDataFromConstantFile.randomOptions;
            options.min=0;
            options.max=getResponseArray.length-1;
          //  let randomNumber=random()
            results=getResponseArray[random(options)];
            
            console.log('PNR: pnr is less then 10');
            //results='PNR number is too short. Your PNR number should be atleast 10 digit.'
        }
        else{
            console.log('PNR: pnr is greater then 10');
            let getResponseArray=getResposeData.bigPNR;
            let options=getDataFromConstantFile.randomOptions;
            options.min=0;
            options.max=getResponseArray.length-1;
          //  let randomNumber=random()
            results=getResponseArray[random(options)];
            //results='PNR number is too big. Your PNR number should be atmost 10 digit, not more then that.'
        }
        console.log('Results: '+results);
        console.log('Results Final: '+results);
        var outPutToEndUser=getDataFromConstantFile.ResponseFormat;
        outPutToEndUser.payload.google.richResponse.items[0].simpleResponse.textToSpeech=results;
        outPutToEndUser.fulfillmentText=results;
        outPutToEndUser.payload.facebook.text=results;
        outPutToEndUser.payload.facebook.quick_replies[0].payload='Retry';
        outPutToEndUser.payload.facebook.quick_replies[0].title='Retry';
        outPutToEndUser.payload.google.richResponse.suggestions[0].title="Retry";
        //outPutToEndUser.payload.google.richResponse.suggestions[1].title="Check Another PNR";


        passtoHandler(outPutToEndUser);
        
    }
  

    else
    {

        let URL = getDataFromConstantFile.API_HOST + '/v2/pnr-status/pnr/' + PNR_NO + '/apikey/'
        + getDataFromConstantFile.API_KEY_1 + '/';
        fromRailWayAPI.callTheRailwayApi(URL,(getResponseFromAPI)=>{
        var getJsonData = JSON.parse(getResponseFromAPI);
        var responseCode=getJsonData.response_code;
        var outPutToEndUser=getDataFromConstantFile.ResponseFormat;
       
       
        if(responseCode!=200){  
            if(responseCode==405){
                let InvalidPnrResponse =getResposeData.InvalidPNR;
                let options=getDataFromConstantFile.randomOptions;
                options.min=0;
                options.max=InvalidPnrResponse.length-1;
                let randomNumber =random(options);
                results=InvalidPnrResponse[randomNumber];
            }
            else{
                results='Unable to get results from Server. Please try again later.'  
            }
                 
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
        console.log('Results Final: '+results);
        outPutToEndUser.payload.google.richResponse.items[0].simpleResponse.textToSpeech=results;
        outPutToEndUser.fulfillmentText=results;
        outPutToEndUser.payload.facebook.text=results;
        outPutToEndUser.payload.facebook.quick_replies[0].payload='Send SMS';
        outPutToEndUser.payload.facebook.quick_replies[0].title='Send SMS';
        outPutToEndUser.payload.google.richResponse.suggestions[0].title="Send SMS";
        outPutToEndUser.payload.google.richResponse.suggestions[1].title="Check Another PNR";


        passtoHandler(outPutToEndUser);
    })
      
 }   
     

}