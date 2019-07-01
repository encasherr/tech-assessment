import db from './db';
import users from './users';

class McqModel {
    entities = {};

    constructor() {
      this.initializeCollection();
    }

    GetAll = (userEntity) => {
        return new Promise((resolve, reject) => {
            // console.log('get all mcqs called', req.user);
            // let mcqs = this.initializeCollection();
            if(userEntity && userEntity.role === users.UserRoles.admin) {
                console.log(this.entities.data.length);
                resolve(this.entities.data);
            }
            else {
                this.GetMcqsByUser(userEntity);
            }
        })
    }

    GetMcqsByUser = (userEntity) => {
        if(this.entities.data && this.entities.data.length > 0 && userEntity) {
          let filteredMcqs = this.entities.data.filter((item, index) => {
              return item.addedBy = userEntity.emailId;
          });
          console.log(filteredMcqs.length);
          return filteredMcqs;
        }
        return [];
    }

    BulkAddMcq = (jsonData) => {
        return new Promise((resolve, reject) => {
            let mcqs = jsonData.mcqs;
            if(mcqs && mcqs.length > 0) {
                mcqs.map((item, index) => {
                    item.addedBy = jsonData.addedBy;
                    this.Add(item)
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
          console.log('mcq insert called', this.entities.data.length);
          this.entities.insert(entity);
          db.saveDatabase();
          console.log('save db called');
          resolve(true);
      });
    }

    Update = (entity) => {
      return new Promise((resolve, reject) => {
          // let mcqs = this.initializeCollection();
          let mcqToUpdate = this.entities.find({ '$loki': entity.$loki });
          if(mcqToUpdate && mcqToUpdate.length > 0) {
              mcqToUpdate[0].title = entity.title;
              mcqToUpdate[0].description = entity.description;
              if(entity.user) {
                  mcqToUpdate[0].updatedBy = entity.emailId;
              }
              this.entities.update(mcqToUpdate[0]);
              db.saveDatabase();
              resolve(true);
          }
          else {
              console.log('nothing to update');
              reject("nothing to update");
          }
      })
    }

    Delete = (entity) => {
      return new Promise((resolve, reject) => {
          let mcqToDelete = this.entities.chain().find({ '$loki': entity.$loki });
          if(mcqToDelete) {
              mcqToDelete.remove();
              db.saveDatabase();
              resolve(true);
          }
          else {
              console.log('nothing to delete');
              reject("nothing to delete");
          }
      })
    }

    initializeCollection = () => {
      this.entities = db.getCollection('mcqs');
      if(!this.entities) {
          this.entities = db.addCollection('mcqs');
      }
      console.log('mcq entity initialized', this.entities.data.length);
    }
}
export default McqModel;
