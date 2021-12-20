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
            console.log(error);
        }else{
            response.ok(rows,res)
        }
    });
}

// menampilkan semua data by id
exports.tampilbyid = function (req,res) {
    let id = req.params.id;
    conncection.query("Select * from mahasiswa where id_mahasiswa = ?",{id}, function (error,rows,fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows,res);
        }
    });
}