(async function() {
    if (document.getElementById("user") != undefined) {
        document.getElementById("user").value = await smail();
        document.getElementById("passwd").value = await decryption();
        if (document.getElementById("dError").children[1] == undefined){
            document.getElementById("submit").disabled = false;
            document.getElementById("submit").click();
        }
        else {
            alert("【拡張機能のエラー】\nログインに失敗しました。\n拡張機能のオプションを確認した後，手動でログインしてください。");
        }
    }
}());
