chrome.storage.local.get(function (item) {

    if (document.getElementById("loginForm:userId") != undefined) {
        document.getElementById("loginForm:userId").value = item.uido_id.substr(0, item.uido_id.indexOf('@')).toLowerCase();
        document.getElementById("loginForm:password").value = item.uido_pass;
        if (document.getElementsByClassName("ui-messages-error-detail")[0] == undefined){
            document.getElementById("loginForm:loginButton").click();
        }
        else {
            alert("【拡張機能のエラー】\nログインに失敗しました。\n拡張機能のオプションを確認した後，手動でログインしてください。");
        }
    }
    
});

if (document.getElementsByClassName("innerInfo")[0] != undefined) {
    if (document.getElementsByClassName("innerInfo")[0].innerText.startsWith('長時間操作が行われなかったため')){
        location.href = 'https://portal.sa.dendai.ac.jp/';
    }
    if (document.getElementsByClassName("innerInfo")[0].innerText.startsWith("別の画面で操作されたため")){
        location.href = 'https://portal.sa.dendai.ac.jp/';
    }
}


if (document.querySelectorAll("[control-id=ControlID-1]")[0] != undefined) {
    document.querySelectorAll("[control-id=ControlID-1]")[0].click

}