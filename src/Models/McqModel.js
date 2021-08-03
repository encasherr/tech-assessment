// import db from './db';
import db from '../db/mysqldb';
import users from '../users';

import {
    GetQueryConfig,
    HandlePromise,
    HandlePromiseWithParams
} from '../commons/RoleDefinitions';
import { VIEW_MCQS, VIEW_MCQS_BY_DESCRIPTION, VIEW_MCQS_BY_SKILL } from '../commons/RoleBasedQueries/McqQueries';


class McqModel {
    entityName = 'mcq';
    entities = {};
    entityModel = (dbObject) => {
        let model = {
            // id: dbObject['$loki'],
            id: dbObject.id,
            mcq_meta: {
                author: dbObject.mcq_meta.addedBy,
                category: dbObject.mcq_meta.category,
                choices: dbObject.mcq_meta.choices,
                correctAnswer: dbObject.mcq_meta.correctAnswer,
                description: dbObject.mcq_meta.description,
                minimumExperience: dbObject.mcq_meta.minimumExperience,
                maximumExperience: dbObject.mcq_meta.maximumExperience,
                question: dbObject.mcq_meta.question,
                score: dbObject.mcq_meta.score,
                skill: dbObject.mcq_meta.skill
            }
        };
        // dbObject.mcq_meta.choices.map((choice, index) => {
        //     model.mcq_meta.choices.push(choice);
        // });
        return model;
    };

    constructor() {
        //this.initializeCollection();
    }

    GetAll = (userEntity) => {
        let queryConfig = GetQueryConfig(VIEW_MCQS);
        return HandlePromise(db, queryConfig, userEntity);

        /*return new Promise((resolve, reject) => {
            
            this.initializeCollection().then((res) => {
                if(userEntity && userEntity.role === users.UserRoles.admin) {
                    console.log(this.entities.data.length);
                    let entityModelCollection = [];
                    console.log('entities',this.entities);
                    this.entities.data.map((mcq, index) => {
                        let entityModel = this.entityModel(mcq);
                        entityModelCollection.push(entityModel);
                    });
                    resolve(entityModelCollection);
                }
                else {
                    resolve(this.GetMcqsByUser(userEntity));
                }
            });
        })*/
    }

    GetMcqsBySkill = (userEntity, skill) => {
        let queryConfig = GetQueryConfig(VIEW_MCQS_BY_SKILL);
        return HandlePromiseWithParams(db, queryConfig, { userEntity: userEntity, skill: skill });
    }
    /*GetMcqsByUser = (userEntity) => {
        if(this.entities.data && this.entities.data.length > 0 && userEntity) {
            let filteredMcqs = this.entities.data.filter((item, index) => {
                return item.mcq_meta.addedBy = userEntity.emailId;
            });
            console.log(filteredMcqs.length);
            let entityModelCollection = [];
            filteredMcqs.map((mcq, index) => {
                let entityModel = this.entityModel(mcq);
                entityModelCollection.push(entityModel);
            });
            return entityModelCollection;
        }
        return [];
    }*/

    BulkAddMcq = (jsonData) => {
        return new Promise((resolve, reject) => {
            let mcqs = jsonData.mcqs;
            if (mcqs && mcqs.length > 0) {
                mcqs.map((item, index) => {
                    item.mcq_meta.addedBy = jsonData.addedBy;
                    this.Add(item.mcq_meta)
                        .then((res) => {
                            console.log('mcq added');
                        })
                        .catch((error) => {
                            console.log('mcq add failed: ' + error);
                        });
                })
            }
            resolve(true);
        })
    }

    Add = (entity) => {
        return new Promise((resolve, reject) => {
            console.log('mcq insert called');
            let correctOptions = ['A', 'B', 'C', 'D', 'E', 'F'];
            if (entity.correctAnswer && correctOptions.indexOf(entity.correctAnswer) > -1) {
                if (entity.choices && entity.choices.length > 0) {
                    entity.choices.map((choice, chIndex) => {
                        if (chIndex === correctOptions.indexOf(entity.correctAnswer)) {
                            choice.isCorrect = true;
                        }
                        else {
                            choice.isCorrect = false;
                        }
                        if (!choice.key) {
                            choice.key = correctOptions[chIndex];
                        }
                        if(choice.content && choice.content.indexOf('"')) {
                            console.log('escaping double quotes from choice content');
                            choice.content = choice.content.replace(/\"/g, '<doublequotes>');
                        }
                    })
                }
            }
            if(entity.description && entity.description.indexOf('"') > -1) {
                console.log('escaping double quotes');
                entity.description = entity.description.replace(/\"/g, '<doublequotes>');
            }
            if (entity.choices && entity.choices.length > 0) {
                entity.choices.map((choice, chIndex) => {
                    console.log(`choice ${chIndex}: ${choice.content}`);
                    console.log(`choice type ${typeof choice}`);
                    if(choice.content && choice.content.indexOf('"') > -1) {
                        console.log('escaping double quotes from choice content');
                        choice.content = choice.content.replace(/\"/g, '<doublequotes>');
                    }
                })
            }
            let mcqEntity = {
                mcq_meta: entity,
                skill: entity.skill,
                category: entity.category,
                addedBy: entity.createdBy
            }
            //return;
            //   db.insert(this.entityName, entity)
            db.insertCustom(this.entityName, mcqEntity)
                .then((insertId) => {
                    resolve(insertId);
                })
                .catch((err) => {
                    reject(err);
                })

        });
    }

    GetMcqByDescription = (userEntity, description) => {
        let queryConfig = GetQueryConfig(VIEW_MCQS_BY_DESCRIPTION);
        return HandlePromiseWithParams(db, queryConfig, { userEntity: userEntity, description: description });
    }

    AddAcademicMcq = (entity) => {
        return new Promise((resolve, reject) => {
            console.log('mcq insert called');
            let correctOptions = ['A', 'B', 'C', 'D', 'E', 'F'];
            if (entity.correctAnswer && correctOptions.indexOf(entity.correctAnswer) > -1) {
                if (entity.choices && entity.choices.length > 0) {
                    entity.choices.map((choice, chIndex) => {
                        if (chIndex === correctOptions.indexOf(entity.correctAnswer)) {
                            choice.isCorrect = true;
                        }
                        else {
                            choice.isCorrect = false;
                        }
                        if (!choice.key) {
                            choice.key = correctOptions[chIndex];
                        }
                    })
                }
            }
            let mcqEntity = {
                mcq_meta: entity,
                grade: entity.grade,
                subject: entity.subject,
                category: entity.category,
                addedBy: entity.createdBy
            }

            //   db.insert(this.entityName, entity)
            db.insertCustom(this.entityName, mcqEntity)
                .then((insertId) => {
                    resolve(insertId);
                })
                .catch((err) => {
                    reject(err);
                })

        });
    }

    GetMcqsByIds = (selectedMcqs) => {
        return new Promise((resolve, reject) => {
            let mcqIds = [];
            selectedMcqs.forEach((selectedMcq) => {
                mcqIds.push(selectedMcq.mcqId);
            })
            db.getByIds(this.entityName, mcqIds).then((mcqs) => {
                let mcqsWithIndex = [];
                if (mcqs && mcqs.length > 0) {
                    mcqs.map((mcqItem) => {
                        let matchingSelectedMcq = selectedMcqs.filter((smItem) => {
                            return smItem.mcqId === mcqItem.id;
                        })

                        if (matchingSelectedMcq && matchingSelectedMcq.length > 0) {
                            mcqsWithIndex.push({
                                questionOrderIndex: matchingSelectedMcq[0].questionOrderIndex,
                                ...mcqItem
                            })
                        }
                    })
                }

                resolve(mcqsWithIndex);
                // resolve(mcqs);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    GetMcqById = (mcqId) => {
        console.log('mcqentity', mcqId);
        return new Promise((resolve, reject) => {
            db.findOne(this.entityName, mcqId).then((mcqs) => {
                if (mcqs && mcqs.length > 0) {
                    console.log('mcqentity', mcqs[0]);
                    resolve(mcqs[0]);
                }
            }).catch((err) => {
                reject(err);
            })
        })
    }

    Update = (entity) => {
        return new Promise((resolve, reject) => {
            // let mcqs = this.initializeCollection();
            db.update(this.entityName, entity.mcq_meta, entity.id).then((res) => {
                resolve(res);
            });
            /*
            let mcqToUpdate = this.entities.find({ '$loki': entity.$loki });
            if(mcqToUpdate && mcqToUpdate.length > 0) {
                mcqToUpdate[0].title = entity.title;
                mcqToUpdate[0].description = entity.description;
                if(entity.user) {
                    mcqToUpdate[0].updatedBy = entity.emailId;
                }
                this.entities.update(mcqToUpdate[0]);
                db.saveDatabase(() => {
                  this.EmailSnapshot('CategoryAdd');
              });
      
                resolve(true);
            }
            else {
                console.log('nothing to update');
                reject("nothing to update");
            }*/
        })
    }

    DeleteByIds = (mcqIds) => {
        return new Promise((resolve, reject) => {
            db.deleteByIds(this.entityName, mcqIds).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    DeleteById = (mcqId) => {
        return new Promise((resolve, reject) => {
            db.delete(this.entityName, mcqId).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    Delete = (entity) => {
        return new Promise((resolve, reject) => {
            db.delete(this.entityName, entity.id)
                .then((res) => {
                    resolve(entity.mcq_meta);
                })
                .catch((err) => {
                    reject(err);
                })
          
        })
    }

    // initializeCollection = () => {
    //   this.entities = db.getCollection('mcqs');
    //   if(!this.entities) {
    //       this.entities = db.addCollection('mcqs');
    //   }
    //   console.log('mcq entity initialized', this.entities.data.length);
    // }
    initializeCollection = () => {
        var promise = new Promise((resolve, reject) => {
            db.getCollection(this.entityName)
                .then((res) => {
                    this.entities = res;
                    resolve(this.entities);
                }).catch((err) => {
                    console.log('error occurred: ', err);
                    reject(err);
                })
        });
        return promise;
    }
}
export default McqModel;
