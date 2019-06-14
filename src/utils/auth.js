const jwt = require("jsonwebtoken");
import { AuthConfig } from '../commons/ServerConfig';

module.exports = function(req, res, next) {
    console.log('auth middleware check');
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
        console.log('401');
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        //if can verify the token, set req.user and pass to next middleware
        const decoded = jwt.verify(token, AuthConfig.myPrivateKey);
        req.user = decoded;
        console.log('user role', req.user);
        if(req.user && adminUserRoles.includes(req.user.role)) {
            console.log('authorized', req.user.role);
            next();
        }
        else {
            console.log('not authorized', req.user.role);
            res.status(401).send('User is not authorized to perform requested operation');
        }    
    } catch (ex) {
            console.log('exception in authorization', req.user.role);
            res.status(400).send("Invalid token.");
    }
};

const adminUserRoles = [
    'admin',
    'guest'
]