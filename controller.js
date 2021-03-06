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
    conncection.query('Select * from mahasiswa where id_mahasiswa = ?',[id], function (error,rows,fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows,res);
        }
    });
}

// menambahkan data
exports.tambahdata = function(req, res) {
    var name = req.body.nama;
    var nim = req.body.nim;
    var jurusan = req.body.jurusan;

    conncection.query('insert into mahasiswa (nama,nim,jurusan) values (?,?,?)',[name,nim,jurusan] , function(error,rows,fields){
        if(error){
            console.log(error);
        }else{
            response.ok("berhasil",res);
        }
    });
};

// edit data
exports.editdata = function(req,res){
    var name = req.body.nama;
    var nim = req.body.nim;
    var jurusan = req.body.jurusan;
    var id = req.body.id_mahasiswa;

    conncection.query('update mahasiswa set nama = ? , nim = ? , jurusan = ? where id_mahasiswa = ?', [name,nim,jurusan,id], function(error,rows,fields){
        if(error){
            console.log(error);
        }else{
            response.ok("berhasil update",res);
        }
    });
}


// hapus
exports.hapusdata = function (req,res){
    var id = req.body.id_mahasiswa;

    conncection.query('delete from mahasiswa where id_mahasiswa = ?',[id], function(error,rows,fields) {
        if(error){
            console.log(error);
        }else{
            response.ok("berhasil delete",res);
        }
    });
};

// grouping json
exports.showgroup = function(req,res) {
    conncection.query('SELECT c.id_mahasiswa, c.nim,c.nama, c.jurusan, b.matakuliah, b.sks from krs a INNER join matakuiah b INNER join mahasiswa c where a.id_matakuliah = b.id_matakuliah and a.id_mahasiswa = c.id_mahasiswa ORDER BY c.id_mahasiswa',function(error,rows,fields){
        if(error){
            console.log(error);
        }else{
            response.oknested(rows,res);
        }
    })
}