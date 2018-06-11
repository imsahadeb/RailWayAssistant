const sid='AC541548859ee1372e7ea451b1812c97b8';
const auth='hidef13a46b9d6cb62e24ee0fdda2d4fdd7f';
const client = require('twilio')(sid,auth);
// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+18059549634',
//      to: '+91907316655'
//    })
//   .then(message => console.log(message.sid))
//   .done();
  

client.messages({
    to:'+918116826807',
    from:'+1805954-9634',
    body:'Hello'
    
},function(err,data){
    if(err){
        console.log(err);
    }
    else{
        console.log(date);
    }
})