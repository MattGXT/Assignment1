const express = require('express')
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const bodyParser = require('body-parser'); 
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');
const request = require('request');
const MongoClient = require('mongodb').MongoClient;
var  ObjectID = require('mongodb').ObjectID;
var fs = require('fs');

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true},function(err, client) {
    if (err) {return console.log(err)}
        const dbName = 'db';
        const db = client.db(dbName);
        sockets.connect(app,io,db);
        require('./routes/create.js')(db);
        require('./listen.js')(http);
});
