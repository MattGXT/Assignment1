module.exports = function (db, app) {
    //Route to get list of all items from the database.

    app.post('/api/getachannel', function (req, res) {
        if (Object.keys(req.body).length === 0) {
            return res.sendStatus(400);
        }
        name = req.body.name;
        const collection = db.collection('Channel');
        collection.find({name:name}).toArray((err, data) => {
            if (err) throw err;
            res.send(data);
        })
    })
}     