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
   // let city = request.body.queryResult.parameters['geo-city'];
    //train="13147";
    console.log("Train No: "+train);
    //let train=post_body.x
   // let url='https://api.railwayapi.com/v2/route/train/'+train+'/apikey/'+API_KEY+'/';
    let find_train_url='https://api.railwayapi.com/v2/name-number/train/'+train+'/apikey/q86si59pft/';
   // console.log("requested URL: "+url);
    axios.get(find_train_url)
       .then(response=>{
           //response
           let info=response.data;
          // var len=Object.keys(info['route']).length;

           let train_name=info.train['name'];
        //    let s=info['route'][0]['station'];
        //    var outResult="";
       
           console.log(info);
           res.status(200).json({
               'fulfillmentText':train_name
             })
       })
       .catch(error=>{
           console.log(error);
       });
});

app.listen(process.env.PORT || 80);