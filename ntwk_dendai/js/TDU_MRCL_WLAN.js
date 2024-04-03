(async function() {
    if (document.getElementsByName("username")[0] != undefined) {
        document.getElementsByName("username")[0].value = await smail();
        document.getElementsByName("password")[0].value = await decryption();
        if (document.querySelectorAll("tr[align=center]")[0] == undefined){
            document.getElementsByName("Submit")[0].click();
        }
        else {
            alert("【拡張機能のエラー】\nログインに失敗しました。\n拡張機能のオプションを確認した後，手動でログインしてください。");
        }
    }
}());
