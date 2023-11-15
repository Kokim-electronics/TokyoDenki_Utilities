chrome.storage.local.get(function (item) {
    if (document.getElementById("txtID") != undefined) {
        document.getElementById("txtID").value = item.uido_id.substr(0, item.uido_id.indexOf('@')).toLowerCase();
        document.getElementById("txtPWD").value = item.uido_pass;
        if (document.getElementsByClassName("box_ERROR")[0] ==undefined){
            document.getElementsByName("JWP4101_FORM01")[0].submit();
        }
        else {
            alert("【拡張機能のエラー】\nログインに失敗しました。\n拡張機能のオプションを確認した後，手動でログインしてください。");
        }
    }
});
