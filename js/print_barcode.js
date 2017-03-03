var bc_arr = [];
var book = mongoose.model('book', BookSchema);

// adds accountnumber to a js array.
// on pressing print, all elements in array > 0 are used.
function add_to_list() {
  var acc_no = document.getElementById("acc_to_add").value;
  if (acc_no <= 0) {
    window.alert("Account number must be greater than 0");
    document.getElementById("acc_to_add").value = "";
    return;
  }
  book.find({accountnumber: acc_no}, function(err, res) {
    if (err) throw err;
    console.log(res);
    if(res.length == 0){
      window.alert("Please check the account number");
      document.getElementById("acc_to_add").value = "";
      return;
    }
    else{
      bc_arr.push(acc_no);
      console.log(bc_arr);
      ref_bars(res[0]["title"]);
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

// $(document).on("click", "#remove_bc_btn", function (e){
//   e.preventdefault;
//   console.log("this yo");
//   $(this).parent().parent().parent().empty();
// });
//
function remove_bc(arg){
  console.log("arg");
  console.log(arg.parentNode.parentNode.id);
}
