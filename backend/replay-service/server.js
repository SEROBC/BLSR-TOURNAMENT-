const express = require('express');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const app = express();

app.post('/replay/upload', async (req, res) => {

    res.json({
        uploaded: true
    });
});

app.listen(3010);
