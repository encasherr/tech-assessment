'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql_repo = require('./mysql_repo');

var _url = require('url');

var db = {
    getCollection: function getCollection(entityName) {
        var promise = new Promise(function (resolve, reject) {
            var field_name = EntityFieldMapping[entityName];
            var query = 'select * from ta_' + entityName + ';';
            (0, _mysql_repo.getData)(query).then(function (data) {
                var outputArray = SerializeToJson(data, entityName);
                var dbEntity = {
                    data: outputArray,
                    find: function find(criteria) {
                        var sql = 'select * from ta_' + entityName + ' where ';
                        for (var key in criteria) {
                            sql += 'JSON_EXTRACT(' + field_name + ', \'$.' + key + '\') = ' + criteria[key];
                        }
                        sql += ';';
                        var findPromise = new Promise(function (resolve, reject) {
                            (0, _mysql_repo.getData)(sql).then(function (res) {
                                resolve(res);
                            }).catch(function (err) {
                                reject(err);
                            });
                        });
                        return findPromise;
                    }
                };
                resolve(dbEntity);
            }).catch(function (err) {
                console.log('error in getCollection: ', err);
                reject(err);
            });
        });

        return promise;
    },
    insert: function insert(entityName, entity) {
        return new Promise(function (resolve, reject) {
            var field_name = EntityFieldMapping[entityName];
            var sql = 'insert into ta_' + entityName + ' (' + field_name + ') \n                    values(\'' + JSON.stringify(entity) + '\');';
            (0, _mysql_repo.executeQuery)(sql).then(function (res) {
                // console.log(`${entityName} inserted, res: ${res}`); 
                console.log(entityName + ' inserted, insertId: ' + res.insertId);
                resolve(res ? res.insertId : -1);
            });
        });
    },
    update: function update(entityName, entity, id) {
        return new Promise(function (resolve, reject) {
            var field_name = EntityFieldMapping[entityName];
            var sql = 'update ta_' + entityName + ' set ' + field_name + '=\'' + JSON.stringify(entity) + '\' \n                         where id=' + id + ';';
            (0, _mysql_repo.executeQuery)(sql).then(function (res) {
                console.log(entityName + ' updated, changedRows: ' + res.changedRows);
                findOneRecord(entityName, id).then(function (updatedRecord) {
                    resolve(updatedRecord);
                }).catch(function (err) {
                    reject(err);
                });
            });
        });
    },
    delete: function _delete(entityName, id) {
        var sql = 'delete from ta_' + entityName + ' where id=' + id + ';';
        (0, _mysql_repo.executeQuery)(sql).then(function (res) {
            console.log(entityName + ' deleted, id: ' + id);
            (0, _url.resolve)(res);
        });
    },
    findOne: function findOne(entityName, id) {
        return findOneRecord(entityName, id);
    },
    getByIds: function getByIds(entityName, ids) {
        return new Promise(function (resolve, reject) {
            var commaSeparatedIds = ids.join(",");
            var sql = 'select * from ta_' + entityName + ' where id in (' + commaSeparatedIds + ');';
            (0, _mysql_repo.getData)(sql).then(function (data) {
                var outputArray = SerializeToJson(data, entityName);
                resolve(outputArray);
            }).catch(function (err) {
                reject(err);
            });
        });
    },
    deleteByIds: function deleteByIds(entityName, ids) {
        return new Promise(function (resolve, reject) {
            var commaSeparatedIds = ids.join(",");
            var sql = 'delete from ta_' + entityName + ' where id in (' + commaSeparatedIds + ');';
            (0, _mysql_repo.executeQuery)(sql).then(function (res) {
                console.log(entityName + ' deleted, res: ' + res);
                resolve(res);
            });
        });
    },
    executeQuery: function executeQuery(sql) {
        return new Promise(function (resolve, reject) {
            (0, _mysql_repo.executeQuery)(sql).then(function (res) {
                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        });
    },
    getFilteredDataByEntity: function getFilteredDataByEntity(sql, entityName) {
        return new Promise(function (resolve, reject) {
            (0, _mysql_repo.getData)(sql).then(function (data) {
                var outputArray = SerializeToJson(data, entityName);
                resolve(outputArray);
            }).catch(function (err) {
                reject(err);
            });
        });
    },
    serializeToJson: function serializeToJson(data, entityName) {
        return SerializeToJson(data, entityName);
    }
};

var findOneRecord = function findOneRecord(entityName, id) {
    return new Promise(function (resolve, reject) {
        var sql = 'select * from ta_' + entityName + ' where id=' + id + ';';
        (0, _mysql_repo.getData)(sql).then(function (data) {
            var outputArray = SerializeToJson(data, entityName);
            resolve(outputArray[0]);
        }).catch(function (err) {
            console.log('error in findOne: ', err);
            reject(err);
        });
    });
};

var SerializeToJson = function SerializeToJson(data, entityName) {
    var outputArray = [];
    var field_name = EntityFieldMapping[entityName];
    console.log('data count', data.length);
    if (data && data.length > 0) {
        data.map(function (item, index) {
            var item_value = item[field_name];
            item_value = item_value.replace(/\n/g, "\\n");
            item_value = item_value.replace(/\r/g, "\\r");
            item_value = item_value.replace(/\t/g, "\\t");
            var output = {};
            output.id = item.id;
            output[field_name] = JSON.parse(item_value);
            // output[field_name] = JSON.parse(item[field_name]);
            outputArray.push(output);
        });
    }
    return outputArray;
};

var EntityFieldMapping = {
    users: 'user_meta',
    categories: 'category_meta',
    mcq: 'mcq_meta',
    tests: 'test_meta',
    skills: 'skill_meta',
    invitations: 'invitation_meta',
    candidates: 'candidate_meta',
    mcqresponses: 'response_meta',
    org: 'org_meta'
};
exports.default = db;
//# sourceMappingURL=mysqldb.js.map