//load mongoose module in renderer.js
// Now we will convert this schema to model
var book = mongoose.model('book', BookSchema);
var account = mongoose.model('account', accountSchema);

function add_book_to_db(ac_no, isbn, title, author, publication, publication_place, edition_book, publication_date,description, subject, page_count,language,shelf,price){

  // first generate barcode
  var barcode = require('barcode');
  var bar_data = ac_no;
  var code128 = barcode('code128', {
    data: bar_data,
    width: 400,
    height: 100,
  });
  var outfile = "./barcodes/" + bar_data + ".png";
  // now save barcode as image
  // cb_level0
  code128.saveImage(outfile, function (err) {
    if (err) throw err;
    console.log('Barcode image saved!');

    // cb_level1
    // convert saved image to encoded_barcode
    var base64Img = require('base64-img');
    base64Img.base64('./barcodes/1.png', function(err, encoded_barcode) {
      // encoded_barcode is generated, add it to db
      // cb_level2
      book.find({isbn:isbn}, function(err, res){
        if (err) throw err;
        if(res.length == 0){
          var temp = new book({
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
              alert("This account number already exists")
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
      });
      var temp2 = new account({
        account_number : ac_no,
        isbn : isbn,
        bc_enc : encoded_barcode
      });
      temp2.save(function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("acc success");
          alert("Book has been added Successfully");
        }
      });
    });
  });
}
