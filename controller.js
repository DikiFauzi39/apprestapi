'use strict';

const response = require('./res');
const conncection= require('./koneksi');

exports.index = function(req, res) {
    response.ok("Success Running!!",res)
};