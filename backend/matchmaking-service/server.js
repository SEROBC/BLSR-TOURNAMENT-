const express = require('express');
const Redis = require('ioredis');

const app = express();
const redis = new Redis();

app.use(express.json());

app.post('/queue', async (req, res) => {

    const ticket = {
        playerId: req.body.playerId,
        mmr: req.body.mmr,
        region: req.body.region
    };

    await redis.lpush('matchmaking:queue', JSON.stringify(ticket));

    res.json({ queued: true });
});

app.listen(3001, () => {
    console.log('Matchmaking running');
});
