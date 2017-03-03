var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codex_test1');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
