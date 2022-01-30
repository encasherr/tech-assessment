import queries from "../db/queries";
import db from "../db/mysqldb";

class DbConfig {
    KeyValues = {};
    Initialize = () => {
        return new Promise((resolve, reject) => {
            let sql = queries.getAllDbConfig();
            db.executeQuery(sql).then((res) => {
                if(res) {
                    res.map((item, index) => {
                        this.KeyValues[item.meta_key] = item.meta_value;
                    });
                    console.log('Db config values set');
                    if(process.env.MYSQL_HOST && process.env.MYSQL_HOST === 'localhost') {
                        this.KeyValues.site_url = 'http://localhost:3001';
                    }
                    resolve(this.KeyValues);
                }
            }).catch((err) => {
                console.log('Error in loading db config values');
                reject(err);
            });
        })
    }
}
export default DbConfig;