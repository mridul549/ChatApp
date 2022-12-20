// Node server which will handle socket io connections
const express = require('express');
const io      = require('socket.io')(8000)
const path    = require('path')
const date    = require(__dirname + "/date.js");

const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

const day=date.getDate();
const time=date.getTime();
const users = {};

app.get('/', function(req,res){
    res.render('index',{
        currDate: day
    })
})

io.on('connection', socket => {
    socket.on('new-user-joined',name => {
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        })
    })

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', {name: users[socket.id]});
        delete users[socket.id];
    });
});

app.listen(process.env.PORT || 3000, function(err){
    if(!err){
        console.log("Server started!");
    }
})