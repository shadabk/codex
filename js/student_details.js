var mongoose = require('mongoose');
// Now we will convert this schema to model
var issue = mongoose.model('issue', issueSchema);
var student = mongoose.model('student', studentSchema);
var accounts = mongoose.model('accounts', accountSchema);
var permanent_issue = mongoose.model('permanent_issue', permanent_issueSchema);

function display_student_details(mis){
    var books_table = document.getElementById("books_table");
    while(books_table.rows.length>1){
      books_table.deleteRow(1);
    }
    student.find({mis:mis}, function(err, users) {
    if (err){
      alert("MIS invalid");
      throw err;
    }

      else{
        // console.log(users[0].name);
        permanent_issue.find({mis:mis}, function(err, books_under_this_mis) {
          if (err) {
            alert("thisone");
            throw err;
          }
          else{
              // console.log();
                {
                    document.getElementById('mis').innerHTML = users[0].mis ;
                    document.getElementById('student_name').innerHTML = users[0].name ;
                    document.getElementById('year').innerHTML = users[0].year ;
                    document.getElementById('branch').innerHTML = users[0].branch ;
                }

                {
                  if(books_under_this_mis.length > 0){
                    var books_table = document.getElementById("books_table");
                    var b_issued = [];
                    var i = 0;
                    for(i = 0 ; i < books_under_this_mis.length; i++){
                        // console.log(i);
                        account.find({account_number : books_under_this_mis[i].book_ac_no}, function(err, ans) {
                          var row = books_table.insertRow(1);
                            if (err) throw err;
                            else{
                                book.find({isbn : ans[0].isbn}, function(err, val) {
                                  if (err) throw err;
                                  else{
                                    var c1 = row.insertCell();
                                    var c2 = row.insertCell();
                                    c1.innerHTML = val[0].title;
                                    c2.innerHTML = val[0].author;
                                    permanent_issue.find({book_ac_no: ans[0].account_number}, function(err, val){
                                      var c3 = row.insertCell();
                                      var c4 = row.insertCell();
                                      c3.innerHTML = val[0].date_of_issue.toISOString().split('T')[0];
                                      c4.innerHTML = val[0].date_of_return.toISOString().split('T')[0];
                                      var c0 = row.insertCell(0);
                                      var c5 = row.insertCell();
                                      c0.innerHTML = ans[0].account_number;
                                      c5.innerHTML = "x";
                                    });

                                  }
                                });
                            }
                        });
                     }
                  }
                  else {
                    alert("No books issued");
                  }
                }
          }
        });

      }
    });
}

function issue_book(){
  var mis = document.getElementById('mis_input').value;
  var ac_no = document.getElementById('ac_no').value;

    // check if the book ac_no is valid
      var return_date;
      {
          {
            return_date = new Date();
            return_date.setMonth(return_date.getMonth() + 2);
            // console.log(d);
          }

          accounts.find({account_number : ac_no}, function(err, book) {
            if (err) throw err;
            else{
              console.log(book[0].isbn);
              var temp = new issue({
                book_ac_no : ac_no,
                mis : mis,
                // date_of_issue : Date.now,
                date_of_return : return_date
              });
              temp.save(function (err) {
                if (err) {
                  // window.alert("Please check the account number");
                  alert("This Book is already issued, Please check the account number of the book");
                  Object.keys(err.errors).forEach(function(key) {
                    var message = err.errors[key].message;
                    console.log('Validation error for "%s": %s', key, message);
                    // console.error(err);
                  });
                }
                else{
                  fetch_student_data2(mis);
                  console.log("Book issued");
                  alert("Book issued");
                }
              });
            }
          });
      }
}
