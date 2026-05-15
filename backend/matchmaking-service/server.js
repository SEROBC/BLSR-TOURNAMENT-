const express = require('express');
const Redis = require('ioredis');
const { v4: uuid } = require('uuid');

const redis = new Redis({
    host: 'redis',
    port: 6379
});

const app = express();

app.use(express.json());

app.post('/queue', async (req, res) => {

    const player = {
        id: uuid(),
        mmr: req.body.mmr,
        region: req.body.region
    };

    await redis.lpush('matchmaking', JSON.stringify(player));

    res.json(player);
});

app.listen(3001);
