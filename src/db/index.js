import loki from 'lokijs';
import path from 'path';
import { DbConfig } from '../commons/ServerConfig';

const dbFileName = 'dev.json';
var dbPath = path.join(__dirname, '..', '..', 'data', dbFileName);
dbPath = path.join(__dirname,'..', 'data', dbFileName);
dbPath = DbConfig.filePath;
// dbPath = 'https://techassessment-bucket.s3.ap-south-1.amazonaws.com/dev_11.json';
// dbPath = 'https://drive.google.com/file/d/1f0QqEi1aLlJ0BQBcGuUphKecQeYn-2p-/view?usp=sharing';
console.log('dbpath: ' + dbPath);
// const db = new loki(dbPath);

var db = new loki(dbPath);

// set up an initialize function for first load (when db hasn't been created yet)
const databaseInitialize = () => {

  entities.map((item, index) => {
    let dbCollection = db.getCollection(item);
    if(dbCollection === null) {
      db.addCollection(item);
    }
  });
  console.log('initialized all entities');
}

const dataCleanup = () => {
  entitiesToDelete.map((item, index) => {
    let dbCollection = db.getCollection(item);
    if(dbCollection !== null) {
      dbCollection.clear();
    }
  })
  console.log('deleted all entities');
}

// place any bootstrap logic which needs to be run after loadDatabase has completed
function runProgramLogic() {
  databaseInitialize();
  dataCleanup();
  db.saveDatabase();
//   var categories = db.getCollection("categories");
//   var categoryCount = categories.count();
//   var now = new Date();

//   console.log("old number of categories in database : " + categoryCount);

//   categories.insert({ title: 'Programming', description: 'All programming languages' });
//   categoryCount = categories.count();

//   console.log("new number of categories in database : " + categoryCount);
//   console.log("");
//   categories.clear();
  // var mcqs = db.getCollection("mcqs");
  // if(mcqs){
  //   mcqs.clear();
  // }
  // manually save
  //  db.saveDatabase(function(err) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   else {
  //     console.log("saved... it can now be loaded or reloaded with up to date data");
  //   }
  // });
}

console.log("");
console.log("Loading database...");

// manual bootstrap
db.loadDatabase({}, function(err) {
  databaseInitialize();
  console.log("db initialized");
  runProgramLogic();
  console.log("program logic run but it's save database probably not finished yet");
});

console.log("wait for it...");
const entities = [
  "categories", "users", "skills", "candidates", "mcqs", "tests"
];
const entitiesToDelete = [
  // "categories", 
  // "users", 
  // "skills", 
  // "mcqs", 
  // "tests",
  // "candidates", 
];

export default db;
