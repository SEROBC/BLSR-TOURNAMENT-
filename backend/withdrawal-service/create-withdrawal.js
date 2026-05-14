require('dotenv').config();

const Stripe = require('stripe');
const { Pool } = require('pg');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const db = new Pool({
    connectionString: process.env.POSTGRES_URL
});

async function createWithdrawal(userId, amount, stripeAccountId) {

    const payout = await stripe.payouts.create({
        amount,
        currency: 'usd'
    }, {
        stripeAccount: stripeAccountId
    });

    await db.query(`
        INSERT INTO withdrawals (
            id,
            user_id,
            amount,
            status,
            stripe_payout_id
        ) VALUES (
            gen_random_uuid(),
            $1,
            $2,
            'PROCESSING',
            $3
        )
    `, [userId, amount, payout.id]);

    return payout;
}

module.exports = {
    createWithdrawal
};
