import loki from 'lokijs';
import path from 'path';

const dbFileName = 'dev.json';
const dbPath = path.join(__dirname, '..', '..', 'data', dbFileName);
console.log('dbpath: ' + dbPath);
// const db = new loki(dbPath);


var db = new loki(dbPath);

// set up an initialize function for first load (when db hasn't been created yet)
function databaseInitialize() {
  var categories = db.getCollection("categories");
  var users = db.getCollection("users");
  var skills = db.getCollection("skills");
  var mcqs = db.getCollection("mcqs");
  var candidates = db.getCollection("candidates");
  var tests = db.getCollection("tests");


  // Add our main example collection if this is first run.
  // This collection will save into a partition named quickstart3.db.0 (collection 0)  
  if (categories === null) {
    // first time run so add and configure collection with some arbitrary options
    categories = db.addCollection("categories");
  }

  if (users === null) {
    users = db.addCollection("users");
    // messages.insert({ txt: "i will only insert into this collection during databaseInitialize" });
  }
  
  if (skills === null) {
    skills = db.addCollection("skills");
    // messages.insert({ txt: "i will only insert into this collection during databaseInitialize" });
  }
  if(mcqs === null) {
    mcqs = db.addCollection("mcqs");
  }
  if(candidates === null) {
    candidates = db.addCollection("candidates");
  }
  if(tests === null) {
    tests = db.addCollection("tests");
  }
}

// place any bootstrap logic which needs to be run after loadDatabase has completed
function runProgramLogic() {
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


export default db;
