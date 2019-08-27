module.exports ={
    listen: function(http,PORT){
        let server = http.listen(PORT, function (){
            let host = server.address().address;
            let port = server.address().port;
            console.log("Server listening on:" + host + " Port:" + port);
        });
    }
}