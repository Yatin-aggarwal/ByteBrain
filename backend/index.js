const express = require('express');
const dotenv = require('dotenv');
const { Server } = require("socket.io");
const  http = require("http")
const cors = require('cors')
const { io } = require("socket.io-client");
const Blog_router = require('./Routes/Blog/Blog');
const paper_router = require('./Routes/Paper/Paper');
const paper_check  = require('./Redis/paper_check');
dotenv.config();
const port = process.env.PORT || 8000;
const app = express();
const {init} = require('./Kafka/admin')

init()

app.use(cors())

const server = http.createServer(app);
const IO = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET", "POST"],

    },
  pingTimeout: 600000,
  pingInterval: 25000

});
const Fast_Socket = io("http://localhost:8020");


IO.on("connection", (socket) => {
    console.log("Client connected", socket.id)
    socket.on("LLM", async (Data)=>{
        const res = await paper_check(Data['url']);
        if(res !== 'True'){
            Data['response'] = "Paper not found";
            IO.to(socket.id).emit("client", {query:Data.query, response:Data.response })
        }
        else{
            Fast_Socket.emit("Query", {'client_id':socket.id,...Data})
        }
    })
    Fast_Socket.off("Response").on("Response",(Data)=>{
        console.log(Data)
        IO.to(Data['client_id']).emit("client", {query:Data.query, response:Data.response })

    })
    socket.on("disconnect", () => console.log("Client disconnected",socket.id));
});


app.use(express.urlencoded({
            extended: true
}));

app.use('/paper',paper_router )

app.use('/blog', Blog_router)


server.listen(port,()=>{
    console.log("server started",process.env.PORT)
})