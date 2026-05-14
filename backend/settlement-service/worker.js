const Worker = require('bullmq').Worker;
const { settleMatch } = require('./settle-match');

const worker = new Worker(
    'settlement-queue',
    async job => {

        await settleMatch(
            job.data.matchId,
            job.data.winnerId
        );
    },
    {
        connection: {
            host: 'redis',
            port: 6379
        }
    }
);
