function backup(){

    var backup = require('mongodb-backup')
    time = new Date().toTimeString().split(" ")[0];
    dt = new Date().toISOString().split('T')[0];
    console.log(dt+time);
    /*
   *  use
   */
    backup({
      uri: 'mongodb://localhost/codex_test1', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
      root: '.db_backup/'+dt+time, // write files into this dir
      callback: function(err) {
        if (err) {
          console.error(err);
        } else {
          alert("Backup Success")
          console.log('finish');
        }
      }
    });
}

function restore_db(){
  var restore = require('mongodb-restore');
  restore({
    uri: 'mongodb://localhost/codex_test1', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
      root: '.db_backup/codex_test1',
    callback: function(err) {
      if (err) {
        console.error(err);
      } else {
        alert("Restored")
        console.log('finish');
      }
    }
  });
}
