
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/codex_test1');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    console.log("connected");
  });

  var BookSchema = mongoose.Schema({

      accountnumber : {type : Number, required : true},
      isbn : {type : String, required : true},
      title : {type : String, required : true},
      author : {type : String, required : true},
      publication : {type : String, required : true},
      place_of_publication : {type : String},
      edition : {type : Number, required : true},
      date_of_publication : {type : Date},
      date_of_entry : {type : Date, default : Date.now},
      description : {type : String},
      subject : {type : String, required : true},
      page_count : {type : String},
      language : {type : String, default : "English"},
      shelf : {type : String},
      price : {type : Number, required : true}
  });

  // Now we will convert this schema to model
var book = mongoose.model('book', BookSchema);

function add_book_to_db(ac_no, isbn, title, author, publication, publication_place, edition_book, publication_date,description, subject, page_count,language,shelf,price){
    var temp = new book({
      accountnumber :ac_no,
      isbn : isbn,
      title : title,
      author : author,
      publication : publication,
      place_of_publication :publication_place,
      edition : edition_book,
      date_of_publication :publication_date,
      // date_of_entry : Date.now,
      description : description,
      subject :subject,
      page_count : page_count,
      language : language,
      shelf : shelf,
      price : price
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
        console.log("book added");
      }
    });
  }
