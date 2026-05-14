const { Pool } = require('pg');

const db = new Pool({
    connectionString: process.env.POSTGRES_URL
});

async function freezeWallet(userId, reason) {

    await db.query(`
        UPDATE wallets
        SET pending_withdrawal = available_balance
        WHERE user_id = $1
    `, [userId]);

    console.log('Wallet frozen:', userId, reason);
}

module.exports = {
    freezeWallet
};
