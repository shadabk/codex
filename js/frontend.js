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
    document.getElementById('isbn').value = isbn_input ;
    document.getElementById('title').value = book.title ;
    document.getElementById('author').value = book.authors;
    document.getElementById('publication').value = book.publisher ;
    // document.getElementById('publication_place').value = book.publishedDate;
    document.getElementById('publication_date').value = book.publishedDate;
    document.getElementById('description').value = book.description;
    document.getElementById('page_count').value = book.pageCount;
    document.getElementById('language').value = "English";
  });
}
