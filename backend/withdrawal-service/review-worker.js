const Worker = require('bullmq').Worker;

const worker = new Worker(
    'withdrawal-review',
    async job => {

        console.log('Reviewing withdrawal', job.data.withdrawalId);
    },
    {
        connection: {
            host: 'redis',
            port: 6379
        }
    }
);
