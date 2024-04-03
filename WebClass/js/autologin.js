"use strict";
// Inject this script (by using content_scripts) directly to '/webclass/login.php' will not work.
// During the login process, the login page will refresh or redirect to itself one or two times.
// If using content_scripts, this script will load during the login process unexpectedly
// and cause an infinite loop.
// Sending message to background to assure this script only be injected one time will not work too.
// chrome.runtime.sendMessage will also interrupt the login process.
/*
$(window).on('load', function () {
    var loginjs = '<script>var autologin = $("<div class=\'loginFeedback\'><p>自動ログイン中です。 <img src=\'./images/loading.gif\' /></p></div>");'
        + '$.overlay({object: autologin}); $.showOverlay({ speed: 150, callback: function(){} });'
        + 'setTimeout(function(){$(document.login).trigger("submit")},200);<\/script>';
    $('body').append(loginjs);
});
*/
//# sourceMappingURL=autologin.js.map

(async function() {
    document.getElementById("username").value = await smail()  // Get the ID before '@' and insert it into the input box.
    document.getElementById("password").value = await decryption() // Get password and insert it into the input box.
    if (document.querySelectorAll(".alert.alert-warning")[0] == undefined){  // If there is no warning message, click the login button.
        document.getElementById("LoginBtn").click();  // Click the login button.
    }
    else { // If there is a warning message, alert the user to login manually.
       alert("【拡張機能のエラー】\nログインに失敗しました。\n拡張機能のオプションを確認した後，手動でログインしてください。"); // Alert the user to login manually.
    }
}());
