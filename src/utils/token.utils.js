// var jwt = require('jsonwebtoken');

import jwt from 'jsonwebtoken';
import { AuthConfig } from '../commons/ServerConfig';

const createToken = (auth) => {
    console.log('creating token');
    return jwt.sign({
            googleId: auth.googleId ? auth.googleId : auth.emailId,
            id: auth.id,
            emailId: auth.emailId,
            role: auth.role,
            name: auth.name,
            orgId: auth.orgId
        }, AuthConfig.myPrivateKey,
    // }, 'my-secret',
        {
            expiresIn: 60 * 120
            // expiresIn: 15
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