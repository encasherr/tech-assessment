import "babel-core/register";
import "babel-polyfill";
import express from 'express';
import http from 'http';
import routes from './routes';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import p from './passport';
import passport from 'passport';
import { setConfig, createPrerequisitesDir } from "./utils/general";
// import CronScheduler from './commons/CronSheduler';

let port_number = process.env.PORT || 8005;
let app = express();

app.server = http.createServer(app);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.use(passport.initialize());
// app.use(CronScheduler);

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next();
});


createPrerequisitesDir();

app.use('/api', routes);

global.appRoot = path.resolve(__dirname);
console.log('global.appRoot', global.appRoot);

app.use('/*', (req, resp) => {
    let fileName = path.resolve(__dirname + '/index.html');
    resp.sendFile(fileName);
});

app.use('/testLanding', (req, resp) => {
    let fileName = path.resolve(__dirname + '/index.html');
    resp.sendFile(fileName);
})

app.listen(port_number, () => {
    console.log('Tech Assess API runnning on ' + port_number);
})