var body={
    "responseId": "e3cd4eb1-2479-41ca-a626-7b1977abf2cb",
    "queryResult": {
      "queryText": "2 hours",
      "action": "Live_Station_Code_any.Live_Station_Code_any-custom",
      "parameters": {
        "TIME_WINDOW": {
          "unit": "h",
          "amount": 2
        }
      },
      "allRequiredParamsPresent": true,
      "fulfillmentText": "Unable to get results from Server. Please try again later.",
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "Unable to get results from Server. Please try again later."
            ]
          }
        }
      ],
      "outputContexts": [
        {
          "name": "projects/rail-143c7/agent/sessions/a6e14be1-ac90-4577-8d41-22d9f8fffa57/contexts/getstationcode",
          "lifespanCount": 4,
          "parameters": {
            "TIME_WINDOW.original": "2 hours",
            "STATION_CODE": "ndls",
            "STATION_CODE.original": "ndls",
            "TIME_WINDOW": {
              "amount": 2,
              "unit": "h"
            }
          }
        },
        {
          "name": "projects/rail-143c7/agent/sessions/a6e14be1-ac90-4577-8d41-22d9f8fffa57/contexts/live_station_code_any-followup",
          "lifespanCount": 1,
          "parameters": {
            "STATION_CODE.original": "ndls",
            "TIME_WINDOW": {
              "amount": 2,
              "unit": "h"
            },
            "TIME_WINDOW.original": "2 hours",
            "STATION_CODE": "ndls"
          }
        }
      ],
      "intent": {
        "name": "projects/rail-143c7/agent/intents/4a1ca0ad-4140-4e19-a655-291c40966b52",
        "displayName": "Live_Station_Code_Any_Get_Hours"
      },
      "intentDetectionConfidence": 1,
      "diagnosticInfo": {
        "webhook_latency_ms": 1241
      },
      "languageCode": "en"
    },
    "webhookStatus": {
      "message": "Webhook execution successful"
    }
  }

 console.log(body.queryResult.outputContexts[0].parameters.STATION_CODE)