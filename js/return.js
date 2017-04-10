//TODO : fetch issue details (when issued, when to return)
//TODO : book return button on list of issued books
//TODO :
//TODO :

var book = mongoose.model('book', BookSchema);
var account = mongoose.model('account', accountSchema);
// var issue = mongoose.model('issue', issueSchema);

function fetch_student_data2(mis){
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
      issue.find({mis:mis}, function(err, books_under_this_mis) {
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
                                  issue.find({book_ac_no: ans[0].account_number}, function(err, val){
                                    var c3 = row.insertCell();
                                    var c4 = row.insertCell();
                                    c3.innerHTML = val[0].date_of_issue.toISOString().split('T')[0];
                                    c4.innerHTML = val[0].date_of_return.toISOString().split('T')[0];
                                    var c0 = row.insertCell(0);
                                    var c5 = row.insertCell();
                                    c0.innerHTML = ans[0].account_number;
                                    c5.innerHTML = "x";
                                    c0.addEventListener("click", function() {
                                      return_book(c0.innerHTML);
                                    });
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

function fetch_book(mis){

  var an = document.getElementById("an");
  var title = document.getElementById("title");
  var author = document.getElementById("author");
  var shelf = document.getElementById("shelf");
  var input_an = document.getElementById("ac_no").value;

  account.find({account_number: input_an}, function(err, data){
    an.innerHTML = input_an;
    book.find({isbn: data[0].isbn}, function(err, data2){
      title.innerHTML = data2[0].title;
      author.innerHTML = data2[0].author;
      shelf.innerHTML = data2[0].shelf;
    });
  });
}

//
function return_book(ac_no){
  var mis = document.getElementById('mis_input').value;
  // var ac_no = document.getElementById('ac_no').value;
  var flag = 0;
  /* Check if the ac_no entered is actually issued to this mis or not */
  issue.find({mis:mis}, function(err, books_under_this_mis) {
    if (err) {
      throw err;
    }
    else{
      for(i = 0; i < books_under_this_mis.length;i++){
        var dt;
        if(books_under_this_mis[i].book_ac_no == ac_no){
              flag = 1;
            // Book exists, delete it
            /*If issued, return it*/
              issue.find({ book_ac_no : ac_no }, function(err, ans) {
                if (err) throw err;
                else{
                  dt = ans[0].date_of_issue;
                  var permanent_issue = mongoose.model('permanent_issue', permanent_issueSchema);
                  console.log(dt);
                  var temp = new permanent_issue({
                    book_ac_no : ac_no,
                    mis : mis,
                    date_of_issue : dt,
                    date_of_return : Date.now()
                  });
                  temp.save(function (err) {
                    if (err) {
                      // window.alert("Please check the account number");
                      alert("Saving error");
                      Object.keys(err.errors).forEach(function(key) {
                        var message = err.errors[key].message;
                        console.log('Validation error for "%s": %s', key, message);
                        // console.error(err);
                      });
                    }
                    else{
                      alert("Book Returned");
                    }
                  });
                }
              });

              issue.find({ book_ac_no : ac_no }, function(err, ans) {
              if (err) throw err;

              else{
                // delete him
                ans[0].remove(function(err) {
                  if (err) throw err;
                  console.log('Temp data deleted');
                });
              }
            });
        }
      }
      if(flag === 0)
        alert("No book with the given ac_no against this mis");
    }
  });
  fetch_student_data2(mis);
}
