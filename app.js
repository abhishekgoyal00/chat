const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index');
});

server = app.listen(3000);

const io = require('socket.io')(server);

//listen to every connection
io.on('connection', (socket) => {
    console.log("New User Connection");

    //default Username
    socket.username = "Anonymous";

    //listen on change username
    socket.on('change_username', (data)=>{
        socket.username = data.username
    })

    //listen on new message
    socket.on('new_message', (data)=>{
        //broadcast the new message
        io.sockets.emit('new_message', {message: data.message, username: socket.username});
    })

    //listen on typing
    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', {username:socket.username});
    })
});

