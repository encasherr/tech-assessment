class database {
db={}
initialise=()=>{
return new Promise ((resolve,reject)=>{
let dbfile=path.to.db.file
this.db=new loki(dbfile,{
autoload: true
autoloadcallbCk: dbinit
})
resolve
})

dbinit=()=>{
//Collections initialise loop on table names
db.addcollection
db.save
}

Savedatabase=()=>{
this.db.savedatabase
}
}

}
