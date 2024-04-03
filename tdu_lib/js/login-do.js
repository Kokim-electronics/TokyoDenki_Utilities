var element = new Array(3);

element[0] = document.querySelectorAll("input[name=userid]");
if (element[0][0] != undefined) {
    element[0][0].id = "userid";
}

element[1] = document.querySelectorAll("input[type=password]");
if (element[1][0] != undefined) {
    element[1][0].id = "pass";
}

element[2] = document.getElementsByClassName("show_center");
if (element[2][0] != undefined) {
    element[2][0].click();
}

(async function() {
    document.getElementById("userid").value = await smail();
    document.getElementById("pass").value = await decryption();
    document.querySelectorAll("input[type=image]")[0].click();
}());
