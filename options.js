"use strict";

async function saveurl() { // 入力から取得しchrome.storage.localに保存
  var value_mail = $('#mail').val();
  var value_pass = $('#uido_pass').val();

  var option_jigen = new Array(8)
  for (let n = 1; n < 8; n++) {
    //console.log(document.getElementById(n + "th").checked);
    option_jigen[n] = document.getElementById("period" + n).checked;
  }

  var option_date = new Array(7)
  for (let m = 1; m < 7; m++) {
    option_date[m] = document.getElementById("date" + m).checked;
  }

  var arr_kamoku
  if ($("#kamokuary").val().length == 0) {
    arr_kamoku = ""
  } else {
    arr_kamoku = $("#kamokuary").val().split(',');
  }

  if (value_pass != "") {
    var value_key = makepassword(); //$('#key').val();
    var aes = await encryption(value_pass, value_key);
    chrome.storage.local.set({
        mail: value_mail,
        aes: aes,
        tf_period: option_jigen,
        tf_date: option_date,
        kamoku: arr_kamoku,
        key: value_key
    });
  } else {
    chrome.storage.local.set({
        mail: value_mail,
        tf_period: option_jigen,
        tf_date: option_date,
        kamoku: arr_kamoku,
    });
  }

  $("#resultlb").text('設定が成功しました. ');
  document.getElementById("resultlb").innerHTML = document.getElementById("resultlb").innerHTML + getNow();
}
makepassword();
$('#confirmbtn').on('click', saveurl);

// Initialize the record from storage
chrome.storage.local.get(function (item) {
  $("#mail").val(item.mail);
  for (let n = 1; n < 8; n++) {
    document.getElementById("period" + n).checked = item.tf_period[n];
  }
  for (let m = 1; m < 7; m++) {
    document.getElementById("date" + m).checked = item.tf_date[m];
  }
  $("#kamokuary").val(item.kamoku)
});

//http://www.shurey.com/js/samples/2_msg10.html
function getNow() {
  var now = new Date();
  var year = now.getFullYear();
  var mon = now.getMonth() + 1; //１を足すこと
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  var sec = now.getSeconds();
  //出力用
  var s = hour + ":" + min + ":" + sec + "";
  return s;
}

//https://www.rectus.co.jp/archives/2940
document.getElementById("passwordbtn").addEventListener("click", pushHideButton2); // パスワード表示ボタン
function pushHideButton2() { // パスワード表示ボタン
  var txtPass = document.getElementById("uido_pass");
  //var btnEye = document.getElementById("buttonEye");
  if (txtPass.type === "text") { // textの場合
    txtPass.type = "password"; // パスワードにする
    //document.getElementById("key").type = "password"; // パスワードにする
    document.getElementById("passwordbtn").innerText = "PW表示";
    //btnEye.className = "fa fa-eye";
  } else { // passwordの場合
    txtPass.type = "text"; // textにする
    //document.getElementById("key").type = "text"; // textにする
    document.getElementById("passwordbtn").innerText = "PW非表示";
    //btnEye.className = "fa fa-eye-slash";
  }
}

//https://chakkari.org/blog/2020/05/03/aes-encrypt-with-javascript/
async function encryption(value, key) {
  //パスフレーズ
  let passPhrase = key;
  //暗号化したい元のデータ
  let data = value;
  let utf8_plain = CryptoJS.enc.Utf8.parse(data);
  //暗号化
  let encrypted = CryptoJS.AES.encrypt(utf8_plain, passPhrase);
  return encrypted;
}

//https://jp.quora.com/Javascript%E3%81%A7-Promise%E5%8C%96%E3%81%97%E3%81%9F%E9%96%A2%E6%95%B0%E3%81%8B%E3%82%89-%E5%AE%9F%E8%A1%8C%E5%BE%8C%E3%81%AE%E6%88%BB%E3%82%8A%E5%80%A4%E3%82%92%E5%8F%96%E3%82%8A%E5%87%BA%E3%81%97%E3%81%A6
//https://www.ipentec.com/document/javascript-generate-random-string
function makepassword() {
  const str = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!#$%()*+-./:;?@[]^_{}~";
  const passLength = 50;
  let password = "";
  for (let i = 0; i < passLength; i++) {
    let selected = Math.floor(Math.random() * str.length);
    password += str.substring(selected, selected + 1);
  }
  return password;
}
