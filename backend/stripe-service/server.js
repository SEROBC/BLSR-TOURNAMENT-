const express = require('express');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.json());

app.post('/deposit/create-intent', async (req, res) => {

    const amount = req.body.amount;

    if (amount < 100 || amount > 9900000) {
        return res.status(400).json({
            error: 'Invalid wager amount'
        });
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd'
    });

    res.json(paymentIntent);
});

app.listen(4001);});

app.listen(4001, () => {
    console.log('Stripe service running');
});
