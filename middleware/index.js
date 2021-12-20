const { Router } = require('express');
const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();

router.post('/api/v1/register',auth.resgistrasi);
router.post('/api/v1/login',auth.login);
// route yang perlu auth
router.get('/api/v1/rahasia',verifikasi(),auth.halamanrahasia);


module.exports= router;
