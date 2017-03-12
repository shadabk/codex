var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/codex_test1');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
console.log("conn success");

function fine_check(){
  var today = new Date();
  console.log(today);
  var issue = mongoose.model('issues', issueSchema);
  var student = mongoose.model('students', studentSchema);
  issue.find({}, function(err, data){
    for (var i = 0; i < data.length; i++) {
      var delay = today - data[i]["date_of_return"];
      if (delay > 0) {
        var cond = {mis:data[i]["mis"]},
          update = {$inc: {fine: delay*2}};
        student.update(cond, update, function(err, numAffected){
          console.log(numAffected+" documents affected.");
        });
      }
    }
  });
}

function get_fined_students(){
  var student = mongoose.model('students', studentSchema);
  student.find({fine: {$gt: 0}}, function(err, data){

  });
}


var today = new Date().toLocaleDateString();
const fs = require('fs');
fs.readFile('config.json', function (err, data) {
   if (err) {
      return console.error(err);
   }
   data = JSON.parse(data.toString());
   var lastopen = data["lastopen"];
   // if this function already ran today, do not continue.
   if( lastopen != today ){
     var buff = "{\"lastopen\":\""+today+"\"}";
     console.log(buff);
     // save today's date on the client's computer
     fs.writeFile('config.json', buff, function(err){
       console.log("config updated");
     });
     // your code below
    //  fine_check();
   }
});
