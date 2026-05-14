require('dotenv').config();

const express = require('express');
const Stripe = require('stripe');
const { Pool } = require('pg');

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const db = new Pool({
    connectionString: process.env.POSTGRES_URL
});

app.use(express.json());

app.post('/deposit/create-intent', async (req, res) => {

    const { amount, userId } = req.body;

    if (amount < 100 || amount > 9900000) {
        return res.status(400).json({
            error: 'Invalid wager amount'
        });
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        metadata: {
            userId
        }
    });

    res.json({
        clientSecret: paymentIntent.client_secret
    });
});

app.listen(4001, () => {
    console.log('Stripe service running');
});
