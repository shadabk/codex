var mongoose = require('mongoose');

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
