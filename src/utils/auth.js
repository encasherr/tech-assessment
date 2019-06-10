const jwt = require("jsonwebtoken");
import { AuthConfig } from '../commons/ServerConfig';

module.exports = function(req, res, next) {
    console.log('auth middleware check');
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        //if can verify the token, set req.user and pass to next middleware
        const decoded = jwt.verify(token, AuthConfig.myPrivateKey);
        req.user = decoded;

        if(req.user && req.user.role === 'admin') {
            next();
        }
        else {
            res.status(401).send('User is not authorized to perform requested operation');
        }    
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};