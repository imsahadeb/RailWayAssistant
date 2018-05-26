const https = require('https');


function callTheRailwayApi(url, passToCaller) {
    console.log("Requested Url :" +url);
    var request = https.request(url, function (onResponse) {
        var collectedData = "";
        onResponse.on("data", function (onReceiveEveryBit) {
            collectedData +=onReceiveEveryBit;
        });

        onResponse.on("end", function (err) {
            try {
                var storeData = collectedData;
                passToCaller(storeData, onResponse.headers['set-cookie'] != undefined ? onResponse.headers['set-cookie'].join(';') : undefined);
            }
            catch (err) {
                console.log( err);
                passToCaller(storeData, err.message);
            }
        });
    });

    request.on('error', function (err) {
        console.log('GET request call failed url: ' + JSON.stringify(url) + '\n' + err);
        passToCaller(err, err);
    });

    request.end();
}


module.exports.callTheRailwayApi= callTheRailwayApi;