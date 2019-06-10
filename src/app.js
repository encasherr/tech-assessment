import express from 'express';
import http from 'http';
import routes from './routes';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import p from './passport';
import passport from 'passport';

let port_number = process.env.PORT || 3001;
let app = express();

app.server = http.createServer(app);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.use(passport.initialize());

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

app.use('/api', routes);
app.get('/home', function (req, res) {
    let fileName = path.resolve(__dirname + '/index.html');
    console.log(fileName);
    res.sendFile(fileName);
});

app.listen(port_number, () => {
    console.log('Tech Assess API runnning on ' + port_number);
})