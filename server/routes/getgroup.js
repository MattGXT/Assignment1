module.exports = function(db,app){
    //Route to get list of all items from the database.
    
    app.post('/api/getgroup',function(req,res){
        if (Object.keys(req.body).length === 0) {
            return res.sendStatus(400);
        }
        username = req.body.username;
        const collection = db.collection('User');
                collection.find({ name: username }).toArray((err, data) => {
                    if (data.super == true) {
                        const collection2 = db.collection('Group');
                        collection2.find({}).toArray((err, data) => {
                            res.send(data);
                        })
                    } else {
                        const collection2 = db.collection('Group');
                        collection2.find({members:username}).toArray((err, data) => {
                            res.send(data);
                        })
                    }
                })
    })
}       