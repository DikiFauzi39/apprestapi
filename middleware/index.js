const { Router } = require('express');
const express = require('express');
const auth = require('./auth');
const router = express.Router();

router.post('/api/v1/register',auth.resgistrasi);

module.exports= router;
