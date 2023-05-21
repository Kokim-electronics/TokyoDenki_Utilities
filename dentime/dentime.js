if(String(location.href).endsWith("p/tdu")){
  chrome.storage.local.get(function (item) {
    var str = item.uido_id
    var date = new Date();
    var dayOfWeek = date.getDay();
    var popp = "https://www.google.com";
    var popw = 320;
    var poph = 0;
    if (dayOfWeek == 6){
      popp = 'https://dentime.anozon.me/p/tdu2/tdu2';
      poph = 385;
    } else if (str.slice(2,3) == 'n' || str.slice(2,3) == 'N' ){
      popp = 'https://dentime.anozon.me/p/tdu2/tdu2';
      poph = 385;
    }else {
       popp = 'https://dentime.anozon.me/p/tdu/tdu';
        poph = 540;
    }
    var popn = null;
    var popx = (screen.availWidth - popw*0) / 1;
    var popy = (screen.availHeight - poph) * 0 / 2;
    var SubWinOpt = "width=" + popw + ",height=" + poph + ",top=" + popy + ",left=" + popx;
    window.open(popp, popn, SubWinOpt);
    window.open('about:blank', '_self').close();
  });
}

if(String(location.href).endsWith("p/tdu/tdu") || String(location.href).endsWith("p/tdu2/tdu2")){
document.body.style.fontSize="0.85em";
}
