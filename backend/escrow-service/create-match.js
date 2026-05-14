const { Pool } = require('pg');
const { v4: uuid } = require('uuid');

const db = new Pool({
    connectionString: process.env.POSTGRES_URL
});

async function createEscrowMatch(player1, player2, wager) {

    if (wager < 100 || wager > 9900000)
        throw new Error('Invalid wager');

    const client = await db.connect();

    try {

        await client.query('BEGIN');

        await client.query(`
            UPDATE wallets
            SET
                available_balance = available_balance - $1,
                locked_balance = locked_balance + $1
            WHERE user_id = $2
        `, [wager, player1]);

        await client.query(`
            UPDATE wallets
            SET
                available_balance = available_balance - $1,
                locked_balance = locked_balance + $1
            WHERE user_id = $2
        `, [wager, player2]);

        const matchId = uuid();

        await client.query(`
            INSERT INTO escrow_matches (
                id,
};
