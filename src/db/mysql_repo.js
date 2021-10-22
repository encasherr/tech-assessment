import mysql from 'mysql';

// const mysql_pool  = mysql.createPool({
//     connectionLimit: 50,
//     host: '95.216.2.208', // cloud2.zolahost.net
//     user: 'cashfrom_profile',
//     password: 'Encasherr123',
//     database: 'cashfrom_profiledb_dev',
//     acquireTimeout: 1000000
// });

const mysql_pool  = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    // host: '103.212.121.53', 
    user: 'tpptxbaq_app_write',
    password: 'Encasherr123',
    database: 'tpptxbaq_profiledb'
});

const getData = (query) => {
    // connection.connect((err) => {
    //     console.log('error in open connection', err);
    // });
    // connection.connect();

    var promise = new Promise((resolve, reject) => {

        console.log('getdata query: ', query);
        mysql_pool.getConnection((err, connection) => {
            if (err) {
                //connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                reject(err);
            }
            else{
                connection.query(query, (error, results, fields) => {
                    if(error) {
                        console.log('error in query execution: ', error);
                        reject(error);
                    }
                    console.log('success retrieval');
                    console.log('release connection');
                    connection.release();
                    resolve(results);
                });
            }
        }) 
    })

    return promise;

}

const executeQuery = (query) => {
    var promise = new Promise((resolve, reject) => {

        console.log('execute query: ', query);
        mysql_pool.getConnection((err, connection) => {
            if (err) {
                //connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                reject(err);
            }
            else{
                connection.query(query, (error, results, fields) => {
                    if(error) {
                        console.log('error in query execution: ', error);
                        reject(error);
                    }
                    console.log('connection released after query execution');
                    connection.release();
                    resolve(results);
                });
            }
        }) 
    })

    return promise;
}

export {
    getData,
    executeQuery
}