const express = require('express')
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');
const request = require('request');
var fs = require('fs');

const PORT = 3000;

app.use(cors());

sockets.connect(io,PORT);

server.listen(http,PORT);