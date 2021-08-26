// load express module 
let express = require("express");
let app = express();
// http connected with app express reference. 
// because socket.io internal logic written using 
// http module 
let http = require("http").Server(app);
// creating socket.io reference with help of http module 
let io = require("socket.io")(http);

// http://localhost:9090
app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})



// // This function execute when client send the request. 
// io.on("connection",(socket)=> {
//     console.log("Client connected");
//     // to get the message from a client 
//     socket.on("obj",({name,message})=> {
//         console.log({name,message});       // we are display message in console 
//                                 // can we store this message 
//                                 // in databaes using 
//                                 // mongodb or mongoose module 
//     })
// })



//load the module and create the reference.
let obj=require("mongodb").MongoClient;
let url="mongodb://localhost:27017";

obj.connect(url,(err,client)=>
{ if(!err){


   

// This function execute when client send the request. 
io.on("connection",(socket)=> {
    console.log("Client connected");
    // to get the message from a client 
    
    socket.on("obj",({name,message})=> { let db=client.db("mern"); //connect to database
        console.log({name,message});       // we are display message in console 
                                // can we store this message 
                                // in databaes using 
                                // mongodb or mongoose module 
                                let row = {username : name, text : message };                         
    




db.collection("Chatbox").insertOne(row,(err,result)=>{
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
       
    
    else{
        console.log(err);
    } 
})













// store the message in mongo db database. 

// run the server on port number using http reference. 
http.listen(9090,()=>console.log("Server running on port number 9090"))
