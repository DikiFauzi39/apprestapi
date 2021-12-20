const connection = require('../koneksi');
const mysql = require('mysql');
const md5 = require('MD5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

// controller for register
exports.resgistrasi =  function(req,res){
    var post ={
        username : req.body.username,
        email : req.body.email,
        password : md5(req.body.password),
        role : req.body.role,
        tanggal_daftar: new Date() 
    }

    var query = "select email from ?? where ??=? ";
    var table = ["user","email",post.email];

    query = mysql.format(query,table);

    connection.query(query,function(error,rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0 ){
                var query = "insert into ?? set ?";
                var table = ["user"];
                query = mysql.format(query,table);
                connection.query(query,post,function(error,rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("yeey berhasil", res);
                    }
                });
            }else{
                response.ok("email sudah terdaftar",res);
            }
        }
    })
}