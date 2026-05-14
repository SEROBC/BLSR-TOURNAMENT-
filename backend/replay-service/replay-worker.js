const Worker = require('bullmq').Worker;

const worker = new Worker(
    'replay-validation',
    async job => {

        console.log('Validating replay', job.data.matchId);

        return {
            valid: true
        };
    },
    {
        connection: {
            host: 'redis',
            port: 6379
        }
    }
);
