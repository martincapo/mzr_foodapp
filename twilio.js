require('dotenv').config();
const twilio = require('twilio');
const express = require('express');
const router  = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);
const VoiceResponse = twilio.twiml.VoiceResponse;


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
        const userId = request.body.userId
        const orderId = request.body.orderId

        let vendorNumber = '+16478856109'

        let options = {
            to: vendorNumber,
            from: '+12898135702',
            url: 'https://ordercall.fwd.wf/orders/orderMessage/' + userId + '/' + orderId
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
        
        let userNumber = '+1' + request.body.userNumber.split('-').join('')
        let orderId = request.body.orderId
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

    router.post("/orderMessage/:userId/:orderId", (req, res) => {
        const userId = req.params.userId
        const orderId = req.params.orderId
        knex
            .select(['food.name AS food_name' , 'orders_food.qty AS order_quantity'])
            .from('orders_food')
            .leftJoin('orders', 'orders_food.order_id', 'orders.id')
            .leftJoin('food', 'orders_food.food_id', 'food.id')
            .where('orders.user_id', userId)
            .andWhere('orders.id', orderId)
            .then((data) => {
                let message = ''
                data.forEach((food, index) => {
                    if(index === data.length) {
                        message += `${food.order_quantity} ${food.food_name}.`
                    } else {
                        message += `${food.order_quantity} ${food.food_name}, `
                    }
                })
                var twimlResponse = new VoiceResponse();
                
                twimlResponse.say(`A new order has been placed, order details are as follows, ${message}`,
                                    { voice: 'alice' });
        
                
                res.send(twimlResponse.toString());
            })
        
        
    })
    return router
}