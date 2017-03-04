
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://127.0.0.1/codex_test1');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    console.log("connected");
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
    save_barcode(ac_no);
  }

  function save_barcode(acno){
    var barcode = require('barcode');
    var bar_data = acno;
    var code128 = barcode('code128', {
      data: bar_data,
      width: 400,
      height: 100,
    });
    var outfile = "./barcodes/" + bar_data + ".png";
    code128.saveImage(outfile, function (err) {
        if (err) throw err;
        console.log('Barcode saved!');
    });
  }
