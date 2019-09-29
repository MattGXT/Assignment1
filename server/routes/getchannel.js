module.exports = function (db, app) {
    //Route to get list of all items from the database.

    app.get('/api/getchannel', function (req, res) {
        const collection = db.collection('Channel');
        collection.find({}).toArray((err, data) => {
            if (err) throw err;
            res.send(data);
        })
    })
}       