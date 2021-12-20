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

exports.login = function(req,res){
    var post = {
        password: req.body.password,
        email: req.body.email,   
    }

    var query = "select * from ?? where ?? = ? and ??=?";
    var table = ['user','password',md5(post.password),'email',post.email];

    query = mysql.format(query,table);
    connection.query(query,function(error,rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 1){
                console.log(rows);
                var token  = jwt.sign({rows},config.secret,{
                    expiresIn: 1440
                });
                id_user = rows[0].id_user;

                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }
                var query = "insert into ?? set ?";
                var table = ["akses_token"];

                query = mysql.format(query,table);
                connection.query(query,data,function(error,rows){
                    if(error){
                        console.log(error);
                    }else{
                        res.json({
                            success:  true,
                            message: 'token generated',
                            token: token,
                            currUser: data.id_user,
                        });
                    }
                });
            }else{
                res.json({"Error": true, message: "email atau password salah"})
            }
        }
    })
}

exports.halamanrahasia = function(req,res){
    response.ok('halaman rahasia',res);
}