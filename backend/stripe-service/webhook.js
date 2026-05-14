require('dotenv').config();

const express = require('express');
const Stripe = require('stripe');
const { Pool } = require('pg');

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const db = new Pool({
    connectionString: process.env.POSTGRES_URL
});

app.post('/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {

    const sig = req.headers['stripe-signature'];

    const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'payment_intent.succeeded') {

        const paymentIntent = event.data.object;

        const userId = paymentIntent.metadata.userId;
        const amount = paymentIntent.amount;

        await db.query(`
            UPDATE wallets
            SET available_balance = available_balance + $1
            WHERE user_id = $2
        `, [amount, userId]);
    }

    res.json({ received: true });
});

app.listen(4002, () => {
    console.log('Webhook processor online');
});
