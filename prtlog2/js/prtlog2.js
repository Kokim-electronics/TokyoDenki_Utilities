chrome.storage.local.get(function (item) {
    if (document.getElementById("Username") != undefined) {
        document.getElementById("Username").value = item.uido_id.substr(0, item.uido_id.indexOf('@')).toLowerCase();
        document.getElementById("Password").value = item.uido_pass;
        if (document.getElementById("um-auth-dialog-message") == null){
            document.getElementById("um-login-submit").click();
        }
        else {
            alert("【拡張機能のエラー】\nログインに失敗しました。\n拡張機能のオプションを確認した後，手動でログインしてください。");
        }
    }
});
