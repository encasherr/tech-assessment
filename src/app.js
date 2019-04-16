import express from 'express';
import http from 'http';
import routes from './routes';

let port_number = process.env.PORT || 3001;
let app = express();

app.server = http.createServer(app);

app.use('/api', routes);

app.listen(port_number, () => {
    console.log('Tech Assess API runnning on ' + port_number);
})