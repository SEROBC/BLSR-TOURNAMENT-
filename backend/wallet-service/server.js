const express = require('express');
const { Pool } = require('pg');

const app = express();

const db = new Pool({
    connectionString: process.env.POSTGRES_URL
});

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

app.post('/wallet/deposit', async (req, res) => {

    await db.query(`
        UPDATE wallets
        SET available_balance = available_balance + $1
        WHERE user_id = $2
    `, [req.body.amount, req.body.userId]);

    res.json({ success: true });
});

app.listen(3005);
