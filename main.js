const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("my-app/build"))
app.get('*', (req, res) => {
    res.sendFile(join(__dirname,"my-app","public","index.html"));
});
app.get('/src/index.js', (req, res) => {
    res.sendFile(join(__dirname, 'my-app/src/index.js'));
});

io.on('connection', (socket) => {
    socket.on('chat message',(msg)=>{
        // console.log('message: '+msg);
        io.emit('chat message',msg);

    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});