module.exports = function (db, app) {
    //Route to get list of all items from the database.

    app.get('/api/getuser', function (req, res) {
        const collection = db.collection('User');
        collection.find({}).toArray((err, data) => {
            if (err) throw err;
            res.send(data);
        })
    })
}       