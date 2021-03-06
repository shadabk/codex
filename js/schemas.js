var mongoose = require("mongoose");

var BookSchema = mongoose.Schema({
    isbn : {type : String, required : true, unique: true},
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

BookSchema.index({title: "text", author: "text"});

var accountSchema = mongoose.Schema({
  account_number : {type : Number, required : true, unique: true, index: true},
  isbn : {type : String, required : true},
  bc_enc : {type: String}
});

var studentSchema = mongoose.Schema({
    mis : {type : String, required : true, unique : true},
    name : {type : String, required : true},
    year : {type : String, required : true},
    branch : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    contact : {type : String, required : true, unique : true},
    fine: {type : Number, default : 0}
});

var issueSchema = mongoose.Schema({
    book_ac_no : {type : Number, required : true, unique:true},
    mis : {type : String, required : true},
    date_of_issue : {type : Date, default : Date.now},
    date_of_return : {type : Date, required : true}
});

var permanent_issueSchema = mongoose.Schema({
    book_ac_no : {type : Number, required : true},
    mis : {type : String, required : true},
    date_of_issue : {type : Date},
    date_of_return : {type : Date}
});
