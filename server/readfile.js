var fs = require('fs');

module.exports = {
    getdata:function(){
        var list = fs.readFileSync('./users.json','utf8');
        let userlist = JSON.parse(list);
        return userlist;
    }

}