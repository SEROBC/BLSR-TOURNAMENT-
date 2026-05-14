const express = require('express');

const app = express();

app.get('/health', (req, res) => {
    res.json({
        ok: true,
        service: 'wallet-service'
    });
});

app.listen(3005, () => {
    console.log('wallet-service online');
});
