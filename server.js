// load express module 
let express = require("express");
let app = express();

// http connected with app express reference. 
let http = require("http").Server(app);

// creating socket.io reference with help of http module 
let io = require("socket.io")(http);

// http://localhost:9090/firstclient
app.get("/firstclient",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

// http://localhost:9090/secondclient
app.get("/secondclient",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

//load the module and create the reference.
let obj=require("mongodb").MongoClient;
let url="mongodb://localhost:27017";

users = [];
obj.connect(url,(err,client)=>
{ 
    if(!err){
    console.log("MongoDB successfully connected...");
   
// This function execute when client send the request. 
io.on("connection",(socket)=> {
    console.log("Client connected");

   socket.on('setUsername', function(data){
      console.log(data);

      if(users.indexOf(data) > -1){
         socket.emit('userExists', data + ' username is taken! Try another.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });

   socket.on('msg', function(data){
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   
      //save data in database
      let db=client.db("mern"); //connect to mern database
      db.collection("Chatbox").insertOne(data,(err,result)=>{
       if(!err){
           console.log(result);
       }else{
           console.log(err); 
       }
// client.close();
})
})
})
}
})

// run the server on port number using http reference. 
http.listen(9090,()=>console.log("Server running on port number 9090"))