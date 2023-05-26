"use strict";
// Inject this script (by using content_scripts) directly to '/webclass/login.php' will not work.
// During the login process, the login page will refresh or redirect to itself one or two times.
// If using content_scripts, this script will load during the login process unexpectedly
// and cause an infinite loop.
// Sending message to background to assure this script only be injected one time will not work too.
// chrome.runtime.sendMessage will also interrupt the login process.
/*
$(window).on('load', function () {
    var loginjs = '<script>var autologin = $("<div class=\'loginFeedback\'><p>閾ｪ蜍輔Ο繧ｰ繧､繝ｳ荳ｭ縺ｧ縺吶� <img src=\'./images/loading.gif\' /></p></div>");'
        + '$.overlay({object: autologin}); $.showOverlay({ speed: 150, callback: function(){} });'
        + 'setTimeout(function(){$(document.login).trigger("submit")},200);<\/script>';
    $('body').append(loginjs);
});
*/
//# sourceMappingURL=autologin.js.map

chrome.storage.local.get(function (item) {
    document.getElementById("username").value = item.uido_id.substr(0, item.uido_id.indexOf('@'));
    document.getElementById("password").value = item.uido_pass;
    if (document.querySelectorAll(".alert.alert-warning")[0] == undefined){
        document.getElementById("LoginBtn").click();
    }
    else {
        alert("【拡張機能のエラー】\nログインに失敗しました。\n拡張機能のオプションを確認した後，手動でログインしてください。");
    }
    
});