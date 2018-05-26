const changeCase = require('change-case');
const moment = require('moment');
const fromRailWayAPI = require('../../RailwayApiCall/calRailwayApi');
const getDataFromConstantFile = require('../../../constraints/constant');


module.exports.getStationCode = function(request,passToHandler){
    let parameters =request.body.queryResult.parameters;
    
}