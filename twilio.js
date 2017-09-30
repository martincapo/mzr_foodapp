require('dotenv').config();
const twilio = require('twilio');
const express = require('express');
const router  = express.Router();

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


module.exports = (knex) => {
    router.post('/call', function(request, response) {
        // knex
        //   .select("*")
        //   .from("orders")
        //   .then(result => {
        //     response.json(result)
        //   })
        //   .catch(err => {
        //       console.log(err)
        //   })

        let vendorNumber = '+16478856109'

        let options = {
            to: vendorNumber,
            from: '+12898135702',
            url: 'https://ordercall.fwd.wf/orderMessage'
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

    });

    router.post('/sms', function(request, response) {
        
        let userNumber = request.body.userNumber
        let orderId = request.body.order
        let time = request.body.time

        client.messages.create({
            body: `Your order, ${orderId} will be ready in ${time} minutes.`,
            to: userNumber,  // Text this number
            from: '+12898135702' // From a valid Twilio number
        }, function(err, call) {
            if(err) {
                console.log(err)
            } else {
                console.log(call.sid)
            }
        })
    });

    return router
}