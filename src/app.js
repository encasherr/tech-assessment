import express from 'express';
import http from 'http';
import routes from './routes';
import bodyParser from 'body-parser';

let port_number = process.env.PORT || 3001;
let app = express();

app.server = http.createServer(app);
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next();
});

app.use('/api', routes);

app.listen(port_number, () => {
    console.log('Tech Assess API runnning on ' + port_number);
})