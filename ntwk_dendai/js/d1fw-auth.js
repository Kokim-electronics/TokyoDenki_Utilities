chrome.storage.local.get(function (item) {
    if (document.getElementById("user") != undefined) {
        document.getElementById("user").value = item.uido_id.substr(0, item.uido_id.indexOf('@')).toLowerCase();
        document.getElementById("passwd").value = item.uido_pass;
        if (document.getElementById("dError").children[1] == undefined){
            document.getElementById("submit").disabled = false;
            document.getElementById("submit").click();
        }
        else {
            alert("【拡張機能のエラー】\nログインに失敗しました。\n拡張機能のオプションを確認した後，手動でログインしてください。");
        }
    }
});
/*
if (document.getElementById("user") != undefined) {
        document.getElementById("user").value = "21eh089"
        document.getElementById("passwd").value = "n*3PvM%[JzN;6!yh4bqA";
        if (document.getElementById("dError").children[1] == undefined){
            document.getElementById("submit").disabled = false;
            document.getElementById("submit").click();
        }
        else {
            alert("【拡張機能のエラー】\nログインに失敗しました。\n拡張機能のオプションを確認した後，手動でログインしてください。");
        }
    }
*/
