(async function() {
    if (location.href.endsWith("saml20endpoint")) {
        document.getElementById("username").value = await mail();
        var bt = document.querySelectorAll("button[type=submit]");
        bt[0].id = "login";
        document.getElementById("login").click();
    } else if (location.href.endsWith("usernameSubmission")) {
        document.getElementById("password").value = await decryption();
        var bt = document.querySelectorAll("button[type=submit]");
        bt[0].id = "login";
        document.getElementById("login").click();
    }
}());
