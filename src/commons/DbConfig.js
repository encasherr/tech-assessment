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