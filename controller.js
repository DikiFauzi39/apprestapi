'use strict';

const response = require('./res');
const conncection= require('./koneksi');

exports.index = function(req, res) {
    response.ok("Success Running!!",res)
};

// Menampilkan Data

exports.tampilsemuamahasiswa = function (req,res) {
    conncection.query('Select * from mahasiswa', function(error, rows, fields){
        if(error){
            conncection.log(error);
        }else{
            response.ok(rows,res)
        }
    });
}