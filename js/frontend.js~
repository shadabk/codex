function fetch_data_from_isbn(isbn_input){
  console.log(isbn_input);
  var isbn = require('node-isbn');
  isbn.resolve(isbn_input, function (err, book) {
    if (err) {
        console.log('Book not found', err);
    }
    else {
        console.log('Book found ', book);
    }
    document.getElementById('name').value = book.title ;
    document.getElementById('publication').value = book.publisher ;
    document.getElementById('author').value = book.authors;

  });
  // var name = book.title;
  /*Displaying the result in html */
}
