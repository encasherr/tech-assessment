import loki from 'lokijs';
import path from 'path';

const dbFileName = 'dev.json';
const dbPath = path.join(__dirname, '..', '..', 'data', dbFileName);
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
  // dataCleanup();
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
  //"categories", 
  "users", 
  /*"skills", "candidates", "mcqs", "tests"*/
];

export default db;
