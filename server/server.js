const express = require('express')
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const bodyParser = require('body-parser'); 
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const path = require('path');
const formidable = require('formidable');
const MongoClient = require('mongodb').MongoClient;
var  ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(express.static(path.join(__dirname,'../dist/imageupload/')));
app.use('/images',express.static(path.join(__dirname,'./userimages')));
app.use(bodyParser.json());
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true},function(err, client) {
    if (err) {return console.log(err)}
        const dbName = 'db';
        const db = client.db(dbName);
        sockets.connect(app,io,db);
        require('./routes/create.js')(db);
        require('./routes/getuser.js')(db,app);
        require('./routes/getgroup.js')(db,app);
        require('./routes/getchannel.js')(db,app);
        require('./routes/getachannel.js')(db,app);
        require('./routes/upload.js')(app,formidable);
        require('./listen.js')(http);
});
