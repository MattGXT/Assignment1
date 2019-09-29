module.exports = function(app,formidable) {
    app.post('/api/upload',(req,res)=>{
        var form = new formidable.IncomingForm({ uploadDir: './userimages'});
        form.keepExtensions = true;

        form.on('error',function(err){
            if (err) throw err;
            res.send({
                result: "failed",
                data:{},
                numberofimage:0,
                message: "cannot upload image"
            });
        })

        form.on('fileBegin', function(name,file){
            file.path = form.uploadDir + "/" + file.name;
        })

        form.on('file',function(field,file){
            res.send({
                result:'OK',
                data:{'filename':file.name,'size':file.size},
                numberofimage: 1,
                message:"successful"
            })
        })

        form.parse(req);
    })
}