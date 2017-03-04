var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/codex_test1');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected");
});

var studentSchema = mongoose.Schema({

    mis : {type : String, required : true, unique : true},
    name : {type : String, required : true},
    year : {type : String, required : true},
    branch : {type : String, required : true},
    email : {type : String, required : true},
    contact : {type : String, required : true}
});

// Now we will convert this schema to model
var student = mongoose.model('student', studentSchema);

function add_student_to_db(mis,name,year,branch,email,contact){
  var temp = new student({
    mis : mis,
    name : name,
    year : year,
    branch : branch,
    email : email,
    contact : contact
  });
  temp.save(function (err) {
    if (err) {
      Object.keys(err.errors).forEach(function(key) {
        var message = err.errors[key].message;
        console.log('Validation error for "%s": %s', key, message);
        // console.error(err);
      });
    }
    else{
      console.log("Student added");
    }
  });

}
