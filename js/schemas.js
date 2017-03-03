var mongoose = require("mongoose");

var BookSchema = mongoose.Schema({
    accountnumber : {type : Number, required : true, unique: true, index: true},
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
