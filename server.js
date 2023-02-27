const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { Server } = require("socket.io");
const cors = require('cors')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

const io = new Server({
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on('order', (response) => {
        console.log(response)

        io.sockets.emit('shop', response)
    })
});

io.listen(3000);