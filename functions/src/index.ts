import * as functions from "firebase-functions"
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51IPDXrHdKa0qwLLpwArVDmsyOUgc7cy947G0JSWFPIA83fFi5WCYEvGNiW5Uhp0VzTfw3yT1FK4hGYuyUyqkKn9900WNv5fg0S')

const app = express()

app.use(cors({origin: true}))
app.use(express.json())

app.get('/', (request: any, response: any) => response.status(200).send('express returned 200'))

app.post('/payments/create', async (request: any, response: any) => {
    const total = request.query.total

    console.log('Payment request received - ', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd'
    })

    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

exports.api = functions.https.onRequest(app)


