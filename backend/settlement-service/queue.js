const Queue = require('bullmq').Queue;

const settlementQueue = new Queue('settlement-queue', {
    connection: {
        host: 'redis',
        port: 6379
    }
});

module.exports = {
    settlementQueue
};
