const express = require('express')
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');
const request = require('request');
const readfile = require('./readfile.js');
var fs = require('fs');

const PORT = 3000;

app.use(cors());

//get userlist from file system
userlist=readfile.getdata();
console.log(userlist);

//Get channel from file system
channel = JSON.parse(fs.readFileSync('./channel.json'));
console.log(channel);

//Get groups from file system
group = JSON.parse(fs.readFileSync('./group.json'));
console.log(group);

sockets.connect(io,userlist,channel,group);

server.listen(http,PORT);