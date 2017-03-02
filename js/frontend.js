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
    document.getElementById('publication_place').value = book.publishedDate;
    document.getElementById('publication_date').value = book.publishedDate;
    document.getElementById('description').value = book.description;
    document.getElementById('page_count').value = book.pageCount;
    document.getElementById('language').value = "English";
  });
  // var name = book.title;
  /*Displaying the result in html */
}

function add_book_to_db(ac_no, isbn, title, author, publication, publication_place, edition, publication_date, subject, page_count, shelf){

  console.log(ac_no);
  console.log(isbn);
  console.log(title);
  console.log(author);
  console.log(publication);
  console.log(publication_place);
  console.log(edition);
  console.log(publication_date);
  console.log(subject);
  console.log(page_count);
  console.log(shelf);
}
