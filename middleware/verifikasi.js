const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(){
    
    return function(req,rest,next){
        var role = req.body.role;
        var tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer){
            var token = tokenWithBearer.split(' ')[1];
            jwt.verify(token,config.secret,function(err,decoded){
                if(err){
                    return rest.status(401).send({auth:false, message:"Token not found"})
                }else{
                    if(role==2){
                        req.auth = decoded;
                        next();
                    }else{
                        return rest.status(401).send({auth:false, message:"not akses"})
                    }
                }
            });
        }else{
            return rest.status(401).send({auth:false, message:"access need token , please enter your token!"})
        }
    }
}

module.exports = verifikasi;