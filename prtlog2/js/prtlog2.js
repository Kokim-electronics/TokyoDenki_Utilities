(async function() {
    if (document.getElementById("Username") != undefined) {
        document.getElementById("Username").value = await smail();
        document.getElementById("Password").value = await decryption();
        if (document.getElementById("um-auth-dialog-message") == null){
            document.getElementById("um-login-submit").click();
        }
        else {
            alert("【拡張機能のエラー】\nログインに失敗しました。\n拡張機能のオプションを確認した後，手動でログインしてください。");
        }
    }
}());
