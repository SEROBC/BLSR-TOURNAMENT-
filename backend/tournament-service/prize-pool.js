const { Pool } = require('pg');

const db = new Pool({
    connectionString: process.env.POSTGRES_URL
});

async function distributePrizePool(tournamentId, winners) {

    const client = await db.connect();

    try {

        await client.query('BEGIN');

        const tournament = await client.query(`
            SELECT *
            FROM tournaments
            WHERE id = $1
            FOR UPDATE
        `, [tournamentId]);

        const pool = tournament.rows[0].prize_pool;

        const distributions = [
            pool * 0.50,
            pool * 0.30,
            pool * 0.20
        ];

        for (let i = 0; i < winners.length; i++) {

            await client.query(`
                UPDATE wallets
                SET available_balance = available_balance + $1
                WHERE user_id = $2
            `, [distributions[i], winners[i]]);
        }

        await client.query('COMMIT');

    } catch (err) {

        await client.query('ROLLBACK');
        throw err;

    } finally {
        client.release();
    }
}

module.exports = {
    distributePrizePool
};
