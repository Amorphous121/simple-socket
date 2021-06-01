const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8081;
const log = console.log;


app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

server.listen(port, () => log("server is up and running at", port));


const io = require('socket.io')(server);

io.on('connection', (socket) => {
    log("connected");

    socket.on('message', (data) => {
        socket.broadcast.emit('message', data);
    })
})