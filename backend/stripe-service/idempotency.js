const crypto = require('crypto');

function createIdempotencyKey(data) {

    return crypto
        .createHash('sha256')
        .update(JSON.stringify(data))
        .digest('hex');
}

module.exports = {
    createIdempotencyKey
};
