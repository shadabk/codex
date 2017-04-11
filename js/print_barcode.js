var bc_arr = [];
var shelf_arr = [];
var book = mongoose.model('book', BookSchema);
var account = mongoose.model('account', accountSchema);

// adds accountnumber to a js array.
// on pressing print, all elements in array > 0 are used.
function add_to_list() {
  var acc_no = document.getElementById("acc_to_add").value;
  if (acc_no <= 0) {
    window.alert("Account number must be greater than 0");
    document.getElementById("acc_to_add").value = "";
    return;
  }
  account.find({account_number: acc_no}, function(err, res) {
    if (err) throw err;
    console.log(res);
    if(res.length == 0){
      window.alert("Please check the account number");
      document.getElementById("acc_to_add").value = "";
      return;
    }
    else{
      bc_arr.push(acc_no);
      book.find({isbn:res[0]["isbn"]}, function(err, res2) {
        if (err) throw err;
        shelf_arr.push(res2[0]["shelf"]);
        console.log(bc_arr);
        ref_bars(res2[0]["title"]);
      });
    }
  });
}

// function for populating with barcode cards
function ref_bars(title) {
    var bcPage = document.getElementById("bc_page");
    var an = bc_arr.slice(-1).pop();
    var row = document.createElement("div");
    row.className = "row";
    var csm = document.createElement("div");
    csm.className = "col-sm";
    var card = document.createElement("div");
    card.className = "card";
    var cimg = document.createElement("img");
    cimg.className = "card-img-top";
    cimg.src = "./barcodes/"+an+".png";
    var cb = document.createElement("div");
    cb.className = "card-block";
    var ct = document.createElement("h4");
    ct.className = "card-title";
    ct.textContent=title;
    var ctxt = document.createElement("p");
    ctxt.className = "card-text";
    var rm = document.createElement("a");
    rm.className = "btn btn-primary";
    rm.textContent = "Remove";
    rm.href = "#";
    rm.id = "bc_row"+bc_arr.length;
    rm.addEventListener("click", function() {
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
      var ind = this.id.slice(6);
      console.log(ind);
      bc_arr[ind - 1] = -1;
      shelf_arr[ind - 1] = -1;
    });
    cb.appendChild(ct);
    cb.appendChild(ctxt);
    cb.appendChild(rm);
    card.appendChild(cimg);
    card.appendChild(cb);
    csm.appendChild(card);
    row.appendChild(csm);
    bcPage.appendChild(row);
}

function send_to_print(){
  localStorage.setItem("bcArr", bc_arr);
  localStorage.setItem("shelfArr", shelf_arr);
  const electron = require('electron').remote;
  win = new electron.BrowserWindow({width:400,height:700});
	win.loadURL(`file://${__dirname}/bill_temp.html`);
}

function backup(){
    var backup = require('mongodb-backup')
    /*
   *  use
   */
    backup({
      uri: 'mongodb://localhost/codex_test1', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
      root: 'dump/', // write files into this dir
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
      root: 'dump/codex_test1',
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

function loadimages(){
  // console.log("bc_arr "+localStorage.getItem("var1"));
  var bc_arr = localStorage.getItem("bcArr");
  var shelf_arr = localStorage.getItem("shelfArr");
  bc_arr = bc_arr.split(",");
  shelf_arr = shelf_arr.split(",");
  var md = document.getElementById("main_div");
  var c = 0;
  for (var i = 0; i < bc_arr.length; i++) {
    if (bc_arr[i] != -1) {
      if(c % 3 == 0){
        var lgr = document.createElement("div");
        lgr.className = "list-group row";
        var li = document.createElement("div");
        li.className = "list-group-item";
        li.id = "last_li";
        var c4 = document.createElement("div");
        c4.className = "col-4";
        var image = document.createElement("img");
        image.src = "./barcodes/"+bc_arr[i]+".png";
        image.className = "img-fluid";
        var ac = document.createElement("span");
        ac.textContent = bc_arr[i];
        var shelf = document.createElement("span");
        shelf.textContent = shelf_arr[i];
        shelf.style = "float:right";
        c4.appendChild(image);
        c4.appendChild(ac);
        c4.appendChild(shelf);
        li.appendChild(c4);
        lgr.appendChild(li);
        md.appendChild(lgr);
        c++;
      }
      else if (c % 3 == 1) {
        var li = document.getElementById("last_li");
        var c4 = document.createElement("div");
        c4.className = "col-4";
        var image = document.createElement("img");
        image.src = "./barcodes/"+bc_arr[i]+".png";
        image.className = "img-fluid";
        var ac = document.createElement("span");
        ac.textContent = bc_arr[i];
        var shelf = document.createElement("span");
        shelf.textContent = shelf_arr[i];
        shelf.style = "float:right";
        c4.appendChild(image);
        c4.appendChild(ac);
        c4.appendChild(shelf);
        li.appendChild(c4);
        c++;
      }
      else if (c % 3 == 2) {
        var li = document.getElementById("last_li");
        var c4 = document.createElement("div");
        c4.className = "col-4";
        var image = document.createElement("img");
        image.src = "./barcodes/"+bc_arr[i]+".png";
        image.className = "img-fluid";
        var ac = document.createElement("span");
        ac.textContent = bc_arr[i];
        var shelf = document.createElement("span");
        shelf.textContent = shelf_arr[i];
        shelf.style = "float:right";
        c4.appendChild(image);
        c4.appendChild(ac);
        c4.appendChild(shelf);
        li.appendChild(c4);
        li.id = "";
        c++;
      }
    }
  }
  setTimeout(function(){window.print();},1000);
}
