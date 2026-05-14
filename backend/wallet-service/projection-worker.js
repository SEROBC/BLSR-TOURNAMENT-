const Worker = require('bullmq').Worker;

const worker = new Worker(
    'wallet-projections',
    async job => {

        console.log('Projecting ledger event', job.data.id);
    },
    {
        connection: {
            host: 'redis',
            port: 6379
        }
    }
);
