const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware');
const secret = 'mysecretsshhh';

router.post('/api/authenticate', function (req, res) {
    const { email, password } = req.body;

    console.log(`email: ${email},password: ${password}`);

    req.app.get('db').findUserByCredentials([email, password]).then(result => {

        if (!result[0]) {
            return res.status(404).send('Not Found Buddy');
        }
        // you could construct a JWT or a session here instead of
        // returning the user object
        // Issue token
        const payload = { email };
        const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
        });
        res.cookie('token', token, { httpOnly: false }).sendStatus(200);
    });
});

router.get('/checkToken', withAuth, function (req, res) {
    res.sendStatus(200);
});
module.exports = router;