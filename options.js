function saveurl() {
  var value_id   = $('#uido_id').val();
  var value_pass = $('#uido_pass').val();

  var option_jigen = new Array(8)
  for (let n = 1; n < 8; n++){
    //console.log(document.getElementById(n + "th").checked);
    option_jigen[n] = document.getElementById("period" + n).checked;
  }

  var option_date = new Array(7)
  for (let m = 1; m < 7; m++){
    option_date[m] = document.getElementById("date" + m).checked;
  }

  var arr_kamoku
  if ($("#kamokuary").val().length == 0) {
    arr_kamoku = ""
  } else {
    arr_kamoku = $("#kamokuary").val().split(',');
  }

  chrome.storage.local.set(
    { uido_id   : value_id, 
      uido_pass : value_pass,
      tf_period : option_jigen,
      tf_date   : option_date,
      kamoku    : arr_kamoku
    }
  );

  $("#resultlb").text('設定が成功しました. ');
  document.getElementById("resultlb").innerHTML = document.getElementById("resultlb").innerHTML + getNow() ;
}

$('#confirmbtn').on('click', saveurl);

// Initialize the record from storage
chrome.storage.local.get(function (item) {
  $("#uido_id").val(item.uido_id);
  $("#uido_pass").val(item.uido_pass);

  for (let n = 1; n < 8; n++){
    document.getElementById("period" + n).checked = item.tf_period[n];
  }

  for (let m = 1; m < 7; m++){
    document.getElementById("date" + m).checked = item.tf_date[m];
  }

  $("#kamokuary").val(item.kamoku)

});

//http://www.shurey.com/js/samples/2_msg10.html
function getNow() {
  var now = new Date();
  var year = now.getFullYear();
  var mon = now.getMonth()+1; //１を足すこと
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  var sec = now.getSeconds();
  //出力用
  var s = hour + ":" + min + ":" + sec + ""; 
  return s;
}

//https://www.rectus.co.jp/archives/2940
/*document.getElementById("buttonEye").addEventListener("click", pushHideButton);
function pushHideButton() {
  var txtPass = document.getElementById("uido_pass");
  var btnEye = document.getElementById("buttonEye");
  if (txtPass.type === "text") {
    txtPass.type = "password";
    btnEye.className = "fa fa-eye";
  } else {
    txtPass.type = "text";
    btnEye.className = "fa fa-eye-slash";
  }
}*/
document.getElementById("passwordbtn").addEventListener("click", pushHideButton2);
function pushHideButton2() {
  var txtPass = document.getElementById("uido_pass");
  //var btnEye = document.getElementById("buttonEye");
  if (txtPass.type === "text") {
    txtPass.type = "password";
    document.getElementById("passwordbtn").innerText = "PW表示";
    //btnEye.className = "fa fa-eye";
  } else {
    txtPass.type = "text";
    document.getElementById("passwordbtn").innerText = "PW非表示";
    //btnEye.className = "fa fa-eye-slash";
  }
}