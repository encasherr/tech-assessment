// var jwt = require('jsonwebtoken');

import jwt from 'jsonwebtoken';
import { AuthConfig } from '../commons/ServerConfig';

const createToken = (auth) => {
    console.log('creating token');
    return jwt.sign({
            googleId: auth.googleId,
            emailId: auth.emailId,
            role: auth.role,
            name: auth.name
        }, AuthConfig.myPrivateKey,
    // }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

const generateToken = (req, res, next) => {
    console.log('generating token', req.user);
    req.token = createToken(req.auth);
    return next();
};

const sendToken = (req, res) => {
    console.log('sending token');
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
};

export {
  generateToken,
  sendToken
};