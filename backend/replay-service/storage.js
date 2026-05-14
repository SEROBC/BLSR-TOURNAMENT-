const AWS = require('aws-sdk');

const s3 = new AWS.S3();

async function uploadReplay(file, key) {

    return s3.upload({
        Bucket: 'bslr-replays',
        Key: key,
        Body: file
    }).promise();
}

module.exports = {
    uploadReplay
};
