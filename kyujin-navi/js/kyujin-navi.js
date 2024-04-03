(async function() {
    if (document.getElementById("txtID") != undefined) {
        document.getElementById("txtID").value = await smail();
        document.getElementById("txtPWD").value = await decryption();
        if (document.getElementsByClassName("box_ERROR")[0] ==undefined){
            document.getElementsByName("JWP4101_FORM01")[0].submit();
        }
        else {
            alert("【拡張機能のエラー】\nログインに失敗しました。\n拡張機能のオプションを確認した後，手動でログインしてください。");
        }
    }
}());
