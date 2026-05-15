const { Worker } = require('bullmq');
const { Pool } = require('pg');

const db = new Pool({
    connectionString: process.env.POSTGRES_URL
});

const worker = new Worker(
    'settlement-queue',
    async job => {

        const client = await db.connect();

        try {

            await client.query('BEGIN');

            await client.query(`
                UPDATE wallets
                SET available_balance = available_balance + $1
                WHERE user_id = $2
            `, [job.data.amount, job.data.winnerId]);

            await client.query('COMMIT');

        } catch (err) {

            await client.query('ROLLBACK');
            throw err;

        } finally {
            client.release();
        }
    },
    {
        connection: {
            host: 'redis',
            port: 6379
        }
    }
);

console.log('settlement-service online');
