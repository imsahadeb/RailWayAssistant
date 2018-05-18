const express =require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const API_KEY = "q86si59pft";
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());

app.post('/api',(request,res)=>{
    let train = request.body.queryResult.parameters['train-no'];
    res.status(200).json({
        'fulfillmentText':"train_name"
    });
    let find_train_url='https://api.railwayapi.com/v2/name-number/train/'+train+'/apikey/q86si59pft/';
    axios.get(find_train_url)
       .then(response=>{
           //response
           let info=response.data;
           let train_name=info.train['name'];
           console.log(train_name);
        //    res.status(200).json({
        //     'fulfillmentText':train_name
        //      });
       })
       .catch(error=>{
           console.log(error);
       });
});

app.listen(process.env.PORT || 80);