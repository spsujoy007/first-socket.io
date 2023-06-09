const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors');

// middleware 
// app.use(express())
app.use(cors())

const http = require('http');
const {Server} =  require('socket.io')

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {

    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recive_message", data)
    })
})

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
  });
  
server.listen(port, () => {
    console.log(`Server is running at ${port}`);
});