const { Pool } = require('pg');
const { v4: uuid } = require('uuid');

const db = new Pool({
    connectionString: process.env.POSTGRES_URL
});

async function appendLedgerEvent(event) {

    await db.query(`
        INSERT INTO ledger_entries (
            id,
            user_id,
            match_id,
            type,
            amount,
            balance_after,
            metadata
        ) VALUES ($1,$2,$3,$4,$5,$6,$7)
    `, [
        uuid(),
        event.userId,
        event.matchId,
        event.type,
        event.amount,
        event.balanceAfter,
        event.metadata
    ]);
}

module.exports = {
    appendLedgerEvent
};
