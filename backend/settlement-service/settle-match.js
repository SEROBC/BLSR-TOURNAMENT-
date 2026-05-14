const { Pool } = require('pg');

        await client.query('BEGIN');

        const result = await client.query(`
            SELECT *
            FROM escrow_matches
            WHERE id = $1
            FOR UPDATE
        `, [matchId]);

        const match = result.rows[0];

        if (!match.replay_verified)
            throw new Error('Replay not verified');

        if (!match.fraud_reviewed)
            throw new Error('Fraud review pending');

        await client.query(`
            UPDATE wallets
            SET
                available_balance = available_balance + $1,
                locked_balance = locked_balance - $2
            WHERE user_id = $3
        `, [
            match.total_pool,
            match.wager_amount,
            winnerId
        ]);

        const loserId =
            winnerId === match.player1
            ? match.player2
            : match.player1;

        await client.query(`
            UPDATE wallets
            SET
                locked_balance = locked_balance - $1
            WHERE user_id = $2
        `, [
            match.wager_amount,
            loserId
        ]);

        await client.query(`
            UPDATE escrow_matches
            SET
                winner = $1,
                status = 'SETTLED'
            WHERE id = $2
        `, [winnerId, matchId]);

        await client.query('COMMIT');

    } catch (err) {

        await client.query('ROLLBACK');
        throw err;

    } finally {
        client.release();
    }
}

module.exports = {
    settleMatch
};
