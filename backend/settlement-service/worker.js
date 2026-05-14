const { Worker } = require('bullmq');

const worker = new Worker(
    'settlement-queue',

    async job => {

        console.log('Processing settlement:', job.data);

        return {
            success: true
        };
    },

    {
        connection: {
            host: 'redis',
            port: 6379
        }
    }
);

console.log('Settlement worker online');
