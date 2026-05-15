const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ ok: true, service: 'auth-service' });
});

app.post('/register', async (req, res) => {

    const hash = await bcrypt.hash(req.body.password, 10);

    res.json({
        user: req.body.email,
        hash
    });
});

app.post('/login', async (req, res) => {

    const token = jwt.sign(
        { user: req.body.email },
        'secret'
    );

    res.json({ token });
});

app.listen(3000);
