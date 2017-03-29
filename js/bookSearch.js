var book = mongoose.model('book', BookSchema);
var account = mongoose.model('account', accountSchema);
var issue = mongoose.model('issue', issueSchema);

function searchBook(){
  var searchTitle = document.getElementById("search_title").value;
  var searchAuthor = document.getElementById("search_author").value;

  var srTable = document.getElementById("sr_table");
  while(srTable.rows.length>1){
    srTable.deleteRow(1);
  }

  book.find({$text: {$search : searchAuthor+searchTitle}}, function(err, res){
    console.log(res);
    if (err) throw err;
    else{
      if(res.length > 0){
        res.forEach(function(resi, i){
          account.find({isbn:resi.isbn}, function(err, res2){
            if (err) throw err;
            else{
              res2.forEach(function(res2j, j){
                var row = srTable.insertRow(1);
                var c0 = row.insertCell();
                var c1 = row.insertCell();
                var c2 = row.insertCell();
                var c3 = row.insertCell();
                c0.innerHTML = res2j.account_number;
                c1.innerHTML = resi.title;
                c2.innerHTML = resi.author;
                c3.innerHTML = resi.shelf;
                issue.find({book_ac_no: res2j.account_number}, function(err, res3){
                  if(err) throw err;
                  else {
                    if(res3.length > 0){
                      var c4 = row.insertCell();
                      var c5 = row.insertCell();
                      var c6 = row.insertCell();
                      c4.innerHTML = "issued";
                      c5.innerHTML = res3[0].date_of_return;
                      c6.innerHTML = res3[0].mis;

                    }
                    else{
                      var c4 = row.insertCell();
                      c4.innerHTML = "on shelf";
                    }
                  }
                });
              });
            }
          });

        });
      }
      else{
        console.log("nobookfound");
      }
    }
  });
}
