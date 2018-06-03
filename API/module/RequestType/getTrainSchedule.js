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
        var outPutToEndUser='';
        if(responseCode!=200){
                outPutToEndUsr={
                fulfillmentText:'Unable to get results from Server. Please try again later.'
            }
           // passToHandler(outPutToEndUsr);
        }

        else{
            let getJsonData = JSON.parse(getResponseFromApi);
            tarinName=getJsonData.train.name;
            trainNo = getJsonData.train.number;
            route= getJsonData.route
            results ='';
            for(i=0;i<route.length;i++){
                stationName = route[i].station.name;
                arrTime = route[i].scharr;
                depTime = route[i].schdep;
                haltTime = route[i].halt;
                distFromSource = route[i].distance;
    
                results+="Station: " +stationName + " Distance :"+distFromSource+"\n";
                results += "Arrival Time :" +arrTime+ " Departure time: " +depTime+"\n\n"
            }
            console.log(results)
    
               outPutToEndUsr= {
               'fulfillmentText':results
           }
          

        }
        passToHandler(outPutToEndUsr);
    })

    
}

