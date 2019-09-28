module.exports = function (db) {
    db.collection("User").find({ name: "super" }).count((err, count)=>{
      if (count == 0) {
        var myobj = { name:"super",super:true,admin:true,email:"",grouplist:[],admingrouplist:[],password: 0 };
        db.collection("User").insertOne(myobj, function (err, res) {
          if (err) throw err;
          console.log("Create super");
        });
      }
    });
    console.log("create successful");
  }