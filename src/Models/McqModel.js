// import db from './db';
import db from '../db/mysqldb';
import users from '../users';

import { GetQueryConfig, 
    HandlePromise } from '../commons/RoleDefinitions';
import { VIEW_MCQS } from '../commons/RoleBasedQueries/McqQueries';


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
            if(mcqs && mcqs.length > 0) {
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
          let correctOptions = ['A','B','C','D','E','F'];
          if(entity.correctAnswer && correctOptions.indexOf(entity.correctAnswer) > -1) {
                if(entity.choices && entity.choices.length > 0) {
                    entity.choices.map((choice, chIndex) => {
                        if(chIndex === correctOptions.indexOf(entity.correctAnswer)) {
                            choice.isCorrect = true;              
                        }
                        else {
                            choice.isCorrect = false;
                        }
                        if(!choice.key) {
                            choice.key = correctOptions[chIndex];
                        }
                    })
                }
          }
          db.insert(this.entityName, entity)
                .then((insertId) => {
                    resolve(insertId);
                })
                .catch((err) => {
                    reject(err);
                })

      });
    }

    GetMcqsByIds = (mcqIds) => {
        return new Promise((resolve, reject) => {
            db.getByIds(this.entityName, mcqIds).then((mcqs) => {
                resolve(mcqs);
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

    Delete = (entity) => {
      return new Promise((resolve, reject) => {
          db.delete(this.entityName, entity.id)
                    .then((res) => {
                        resolve(entity.mcq_meta);
                    })
                    .catch((err) => {
                        reject(err);
                    })
        //   let mcqToDelete = this.entities.chain().find({ '$loki': entity.$loki });
        //   if(mcqToDelete) {
        //       mcqToDelete.remove();
        //         db.saveDatabase(() => {
        //             this.EmailSnapshot('CategoryAdd');
        //         });
    
        //       resolve(true);
        //   }
        //   else {
        //       console.log('nothing to delete');
        //       reject("nothing to delete");
        //   }
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
