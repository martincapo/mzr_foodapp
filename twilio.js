require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);



// client.calls.create({
//     body: 'Hello from Node',
//     to: '+16478856109',  // Text this number
//     from: '+12898135702', // From a valid Twilio number
//     url: 'http://demo.twilio.com/docs/voice.xml'
// }, function(err, call) {
//      if(err) {
//         console.log(err)
//      } else {
//         console.log(call.sid)
//      }
// })
// .then((message) => console.log(message.sid));



// $( document ).ready(function() {
    // ${vender.number}
// $( "#place-order-button" ).click(function() {

    let options = {
        to: `+16478856109`,
        from: '+12898135702',
        url: 'http://1857aabe.ngrok.io/orderMessage'
    }

    client.calls.create(options)
        .then((message) => {
            console.log(message.responseText);
            response.send({
                message: 'Thank you! We will be calling you shortly.',
            });
          })
          .catch((error) => {
            console.log(error);
            response.status(500).send(error);
          });
    // });

    client.messages.create({
        body: 'Hello from Node',
        to: '+16478856109',  // Text this number
        from: '+12898135702 ' // From a valid Twilio number
    }, function(err, call) {
        if(err) {
            console.log(err)
        } else {
            console.log(call.sid)
        }
    })

    })
