var mongoose = require('mongoose');

// Now we will convert this schema to model
var student = mongoose.model('student', studentSchema);

function add_student_to_db(){
  var mis = document.getElementById('mis');
  var name = document.getElementById('student_name');
  var year = document.getElementById('year');
  var branch = document.getElementById('branch');
  var contact = document.getElementById('contact');
  var email = document.getElementById('email');

  var temp = new student({
    mis : mis.value,
    name : name.value,
    year : year.value,
    branch : branch.value,
    email : email.value,
    contact : contact.value
  });
  temp.save(function (err) {
    if (err) {
      Object.keys(err.errors).forEach(function(key) {
        var message = err.errors[key].message;
        console.log('Validation error for "%s": %s', key, message);
        alert("Already registered")
        // console.error(err);
      });
    }
    else{
      alert("Student Added");
      location.reload();
    }
  });

}
