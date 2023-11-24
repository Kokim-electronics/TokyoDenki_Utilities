//"use strict";

//import { TimeTrigger } from "./timetrigger.js";
var TimeTrigger = /** @class */ (function () {
    function TimeTrigger(time) {
        this.check = setTimeout(function () { }, 0);
        this.single = true;
        this.time = time;
    }
    TimeTrigger.prototype.timeCheck = function (func) {
        var _this = this;
        // Limit timecheck
        if (this.single == false)
            return;
        this.single = false;
        this.check = setTimeout(function () {
            func();
            _this.single = true;
        }, this.time);
    };
    TimeTrigger.prototype.clearTimeCheck = function () {
        clearTimeout(this.check);
        this.single = true;
    };
    return TimeTrigger;
}());
//# sourceMappingURL=timetrigger.js.map

// Initialize
chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
});

// Listen request
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == 'download') {
        downloadfile(request, sender);
        sendResponse();
    }
    else if (request.type == 'reportfinded') {
        clearTimeCheck();
        reportStatus(true);
        sendResponse();
    }
    else if (request.type == 'reportstatus') {
        timeCheck();
        sendResponse({ has: hasReport() });
    }
    else if (request.type == 'reportdone') {
        clearTimeCheck();
        reportStatus(false);
        sendResponse();
    }
});
/*
// Popup
chrome.action.onClicked.addListener(function () {
    getLoginUrl().then(function (loginurl) {
        chrome.tabs.create({ url: loginurl }, function (tab) {
            injectJs(tab);
        });
    });
});
function injectJs(tab) {
    if (tab.id) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            files: ["js/jquery-3.7.1.min.js", "js/autologin.js"],
            world: "MAIN"
        });
    }
}
// Get url synchronously
function getLoginUrl() {
    return new Promise(function (resolve) {
        chrome.storage.sync.get(function (item) {
            var url = item.url;
            var match = url.match('/webclass/login.php');
            if (match != null)
                resolve(url);
            else
                resolve('https://github.com/MisakiBear/WebClass-Extension');
        });
    });
}
*/
// Execute the download request from contentsdownload.js
function downloadfile(downloadmsg, sender) {
    var _a, _b, _c;
    if ((_a = sender.tab) === null || _a === void 0 ? void 0 : _a.url) {
        // Create Url
        var regex = new RegExp('(.*?)/webclass/');
        var url = ((_b = sender.tab.url.match(regex)) === null || _b === void 0 ? void 0 : _b[1]) + downloadmsg.url;
        // Get file's extension
        regex = new RegExp('.*(\\..*)');
        var ext = (_c = downloadmsg.url.match(regex)) === null || _c === void 0 ? void 0 : _c[1];
        var filename = downloadmsg.filename + ext;
        chrome.downloads.download({ url: url, filename: filename });
    }
}
// ------------- Report Alert -------------
var hasreport = false;
var repotrigger = new TimeTrigger(5000);
function reportStatus(status) {
    hasreport = status;
}
function hasReport() {
    return hasreport;
}
function timeCheck() {
    repotrigger.timeCheck(function () { reportStatus(false); });
}
function clearTimeCheck() {
    repotrigger.clearTimeCheck();
}
//# sourceMappingURL=background.js.map
