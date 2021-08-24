// Database
// load the module and create the reference.
let obj = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017"; //defualt port number for mongodb

obj.connect(url,(err,client)=>
{
    if(!err){
        console.log("Connected database")
    }else{
        conssole.log(err);
    } 

client.close();
    
})