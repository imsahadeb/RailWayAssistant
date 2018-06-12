const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');



module.exports.getTrainSchedule = function(request,passToHandler){
    let parameters =request.body.queryResult.parameters;
    let TRAIN_NO = parameters.TRAIN_NO;

    
    let URL = getDataFromConstantFile.API_HOST + '/v2/route/train/'
    + TRAIN_NO + '/apikey/'+getDataFromConstantFile.API_KEY_1 + '/';

    fromRailWayAPI.callTheRailwayApi(URL,(getResponseFromAPI)=>{
        var getJsonData = JSON.parse(getResponseFromAPI);
        var responseCode=getJsonData.response_code;
        console.log('Response Code: '+responseCode);
        var outPutToEndUser=getDataFromConstantFile.ResponseFormat;  
        var results='';
        if(responseCode!=200){  
                results='Unable to get results from Server. Please try again later.'    
        }

        else{
            tarinName=changeCase.titleCase(getJsonData.train.name);
            trainNo = getJsonData.train.number;
            route= getJsonData.route
           
            for(i=0;i<route.length;i++){
                stationName =changeCase.titleCase(route[i].station.name);
                arrTime = route[i].scharr;
                depTime = route[i].schdep;
                haltTime = route[i].haltcd;
                distFromSource = route[i].distance;
    
                results+='\n'+"Station: " +stationName +" Distance :"+distFromSource+'km'+'\n'
                +"Arrival Time :" +arrTime + " Departure time: " +depTime
                +"\n\n"
            }
        }
        console.log('Results: '+results);

        let richResponse=outPutToEndUser.payload.google.richResponse;
        richResponse.items[0].simpleResponse.textToSpeech=results;
        outPutToEndUser.payload.facebook.text=results;
        outPutToEndUser.fulfillmentText=results;
        richResponse.suggestions[0].title='PNR Status';
        richResponse.suggestions[1].title='LIve Station';
        passToHandler(outPutToEndUser);
    })

    
}

