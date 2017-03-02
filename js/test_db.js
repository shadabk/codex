var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codex_test1');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected");
});

var BookSchema = mongoose.Schema({
    accountnumber : {type : Number, min : 1, required : true},
    isbn : {type : Number, required : true},
    title : {type : String, required : true},
    author : {type : String, required : true},
    publication : {type : String, required : true},
    place_of_publication : {type : String},
    edition : {type : Number, required : true},
    date_of_publication : {type : Date},
    date_of_entry : {type : Date, default : Date.now},
    description : {type : String},
    subject : {type : String, required : true},
    page_count : {type : Number, min : 1},
    language : {type : String, default : "English"},
    shelf : {type : String, required : true}
});

// Now we will convert this schema to model
var book = mongoose.model('book', BookSchema);


var temp = new book({
  accountnumber : 1,
  isbn : 123,
  title : "Operating System and bkla blal",
  author : "Shayan",
  publication : "Shadab",
  // place_of_publication : {type : String},
  edition : 1,
  // date_of_publication : {type : Date},
  // date_of_entry : {type : Date, default : Date.now},
  // description : {type : String},
  subject : "OS",
  // page_count : {type : Number, min : 1},
  // language : {type : String, default : "English"},
  shelf : "4.2DC"
});

temp.save(function (err) {
  if (err) return console.error(err);
  else{
    console.log("book added");
  }
});

book.find(function (err, book) {
  if (err) return console.error(err);
  console.log(book);
})
