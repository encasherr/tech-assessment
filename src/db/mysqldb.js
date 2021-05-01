import { getData, executeQuery } from './mysql_repo';
import { resolve } from 'url';

const db = {
    getCollection: (entityName) => {
        var promise = new Promise((resolve, reject) => {
            let field_name = EntityFieldMapping[entityName];
            let query = `select * from ta_${entityName};`;
            getData(query).then((data) => {
                let outputArray = SerializeToJson(data, entityName);
                let dbEntity = {
                    data: outputArray,
                    find: (criteria) => {
                        let sql = `select * from ta_${entityName} where `;
                        for(var key in criteria){
                            sql += `JSON_EXTRACT(${field_name}, '$.${key}') = ${criteria[key]}`;
                        }
                        sql += ';';
                        var findPromise = new Promise((resolve, reject) => {
                            getData(sql).then((res) => {
                                resolve(res);
                            }).catch((err) => {
                                reject(err);
                            })
                        });
                        return findPromise;
                    }
                }
                resolve(dbEntity);
            }).catch((err) => {
                console.log('error in getCollection: ', err);
                reject(err);
            });
            
        });

        return promise;
    },
    insert: (entityName, entity) => {
        return new Promise((resolve, reject) => {
            let field_name = EntityFieldMapping[entityName];
            let sql = `insert into ta_${entityName} (${field_name}) 
                    values('${JSON.stringify(entity)}');`;
            executeQuery(sql).then((res) => {
                // console.log(`${entityName} inserted, res: ${res}`); 
                console.log(`${entityName} inserted, insertId: ${res.insertId}`); 
                resolve(res ? res.insertId : -1);
            });
        })
    },
    insertCustom: (entityName, entity) => {
        return new Promise((resolve, reject) => {
            let field_name = EntityFieldMapping[entityName];
            let fieldString = '', valueString = '';
            Object.keys(entity).forEach((prop, index) => {
                if(index === Object.keys(entity).length-1) {
                    fieldString += `${prop}`;
                    let fieldVal = entity[prop];
                    if(typeof fieldVal === 'string') {
                        valueString += `'${fieldVal}'`;
                    }
                    else if(typeof fieldVal === 'object') {
                        valueString += `'${JSON.stringify(fieldVal)}'`;
                    }
                    else {
                        valueString += `${fieldVal}`;
                    }
                }
                else {
                    fieldString += `${prop},`;
                    let fieldVal = entity[prop];
                    if(typeof fieldVal === 'string') {
                        valueString += `'${fieldVal}'`;
                    }
                    else if(typeof fieldVal === 'object') {
                        valueString += `'${JSON.stringify(fieldVal)}'`;
                    }
                    else {
                        valueString += `${fieldVal}`;
                    }
                    valueString += ',';
                }
            })
            let sql = `insert into ta_${entityName} (${fieldString}) 
                    values(${valueString});`;
            executeQuery(sql).then((res) => {
                // console.log(`${entityName} inserted, res: ${res}`); 
                console.log(`${entityName} inserted, insertId: ${res.insertId}`); 
                resolve(res ? res.insertId : -1);
            });
        })
    },
    update: (entityName, entity, id) => {
        return new Promise((resolve, reject) => {
            let field_name = EntityFieldMapping[entityName];
            let sql = `update ta_${entityName} set ${field_name}='${JSON.stringify(entity)}' 
                         where id=${id};`;
            executeQuery(sql).then((res) => {
                console.log(`${entityName} updated, changedRows: ${res.changedRows}`);  
                findOneRecord(entityName, id).then((updatedRecord) => {
                    resolve(updatedRecord);    
                }).catch((err) => {
                    reject(err);  
                });
            })
        })
    },
    delete: (entityName, id) => {
        return new Promise((resolve, reject) => {
            let sql = `delete from ta_${entityName} where id=${id};`;
            executeQuery(sql).then((res) => {
                console.log(`${entityName} deleted, id: ${id}`);  
                resolve(res);
            })
        });
    },
    findOne: (entityName, id) => {
        return findOneRecord(entityName, id);
    },
    getByIds: (entityName, ids) => {
        return new Promise((resolve, reject) => {
            let commaSeparatedIds = ids.join(",");
            let sql = `select * from ta_${entityName} where id in (${commaSeparatedIds});`;
            getData(sql).then((data) => {
                    let outputArray = SerializeToJson(data, entityName);
                    resolve(outputArray);
                }).catch((err) => {
                    reject(err);
                });
        });
    },
    deleteByIds: (entityName, ids) => {
        return new Promise((resolve, reject) => {
            let commaSeparatedIds = ids.join(",");
            let sql = `delete from ta_${entityName} where id in (${commaSeparatedIds});`;
            executeQuery(sql).then((res) => {
                console.log(`${entityName} deleted, res: ${res}`);  
                resolve(res);
            });
        });
    },
    executeQuery: (sql) => {
        return new Promise((resolve, reject) => {
            executeQuery(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    },
    getFilteredDataByEntity: (sql, entityName) => {
        return new Promise((resolve, reject) => {
            getData(sql).then((data) => {
                    let outputArray = SerializeToJson(data, entityName);
                    resolve(outputArray);
                }).catch((err) => {
                    reject(err);
                });
        });
    },
    serializeToJson: (data, entityName) => {
        return SerializeToJson(data, entityName);
    }
}


const findOneRecord = (entityName, id) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from ta_${entityName} where id=${id};`;
        getData(sql).then((data) => {
            let outputArray = SerializeToJson(data, entityName);
            resolve(outputArray[0]);
        }).catch((err) => {
            console.log('error in findOne: ', err);
            reject(err);
        });
    });
}

const SerializeToJson = (data, entityName) => {
    let outputArray = [];
    let field_name = EntityFieldMapping[entityName];
    console.log('data count', data.length);
    if(data && data.length > 0) {
        data.map((item, index) => {
            let item_value = item[field_name];
            item_value = item_value.replace(/\n/g, "\\n");
            item_value = item_value.replace(/\r/g, "\\r");
            item_value = item_value.replace(/\t/g, "\\t");
            let output = {};
            output.id = item.id;
            output[field_name] = JSON.parse(item_value);
            // output[field_name] = JSON.parse(item[field_name]);
            outputArray.push(output);
        })
    }
    return outputArray;
}

const EntityFieldMapping = {
    users: 'user_meta',
    categories: 'category_meta',
    mcq: 'mcq_meta',
    tests: 'test_meta',
    skills: 'skill_meta',
    invitations: 'invitation_meta',
    candidates: 'candidate_meta',
    mcqresponses: 'response_meta',
    org: 'org_meta',
    grade: 'grade_meta'
}
export default db;