// 初期実行===========================================
var textEnd;
var boxes;
var bre;
var index;
var num;
var fontB = "";
var infodiv = "";
var details_element;
var clone;
var fontB_element;
var first_flag = true;

for (var n = 25; n <= 100; n++) {
    var texthold = document.querySelectorAll("span[class=ui-menuitem-text]")[n];
    if (texthold === undefined) {
        textEnd = "";
        continue;
    }
    if (texthold.textContent.endsWith("時間割表") || texthold.textContent.endsWith("シラバス検索") || texthold.textContent.endsWith("成績照会") || texthold.textContent.endsWith("出欠状況確認")) {
        textEnd = texthold.textContent;
        boxes = document.querySelectorAll("span[class=ui-menuitem-text]")[n].parentNode;
        break;
    } else {
        textEnd = "";
    }
}

let times = 10;
if (textEnd.endsWith("学生時間割表")) {
    times = 6;
}
if (textEnd.endsWith("時間割表")) {
    numbering();
    main3();
}
// 初期実行===========================================

function numbering() {
    fontB = document.getElementsByClassName('fontB');
    infodiv = document.querySelectorAll(".jugyo-info.jugyo-normal");
    for (index = 0; index < infodiv.length; index++) {
        infodiv[index].id = "jugyo-id" + index;
    }
}

function jugyo_hidden(array, le) {
    if (first_flag) {
        for (index = 0; index < infodiv.length; index++) {
            // クローン
            details_element = document.createElement('details');
            clone = document.querySelector(`#jugyo-id` + index).cloneNode(true);
            fontB_element = clone;

            // 子要素をコピー
            for (num = 0; num < fontB_element.children.length + times; num += 1) {
                if (fontB_element.children[0] === undefined) {
                    bre = true;
                    break;
                }
                details_element.appendChild(fontB_element.children[0]);
                bre = false;
            }
            if (bre) {
                //continue;
            }

            // idとclassを追加
            details_element.classList.add("jugyo-info", "jugyo-normal", "fontB-id" + index);
            details_element.querySelector(`.fontB`).id = "fontB-id" + index;

            // 書き換え
            var infodiv2 = document.getElementById('jugyo-id' + index);
            infodiv2.replaceWith(details_element);

            /*==============================================================*/

            clone = document.querySelector(`#fontB-id` + index).cloneNode(true);
            fontB_element = document.createElement('summary');
            fontB_element.append(clone.textContent);

            for (num = 0; num < clone.className.split(' ').length; num++) {
                fontB_element.classList.add(clone.className.split(' ')[num]);
            }

            var fontBdiv2 = document.querySelector('#fontB-id' + index);
            fontBdiv2.replaceWith(fontB_element);
        }
        first_flag = false;
    }

    //===================================================
    //非表示
    for (index = 0; index < fontB.length; index++) {
        fontB[index].parentNode.classList.remove('delete_info')
        for (var index2 = 0; index2 < /*array.*/le/*ngth*/; index2++) {
            if (fontB[index].textContent.startsWith(array[index2])) {
                fontB[index].parentNode.classList.add('delete_info');
            }
        }
    }
    //===================================================

    // 番号づけ
    numbering();
}

function jugyo_search(array, le) {
    //===================================================
    //検索
    for (index = 0; index < fontB.length; index++) {
        fontB[index].parentNode.classList.remove('delete_info')
        for (var index2 = 0; index2 < le; index2++) {
            if (fontB[index].textContent.includes(array[index2])) {
                fontB[index].parentNode.classList.remove('delete_info');
                break;
            } else {
                fontB[index].parentNode.classList.add('delete_info');
            }
        }
    }
    //===================================================

    // 番号づけ
    numbering();
}

function jugyo_all(array, le) {
    //===================================================
    //再表示
    for (index = 0; index < fontB.length; index++) {
        fontB[index].parentNode.classList.remove('delete_info')
    }
    //===================================================
    // 番号づけ
    numbering();
}

function main3() {
    chrome.storage.local.get(function (item) {
        var array = item.kamoku
        var le = array.length;
        jugyo_hidden(array, le);
    });
}

function search() {
    var arr_kamoku = [];
    if (document.querySelector("input[type=text]").value.length != 0) {
        arr_kamoku = document.querySelector("input[type=text]").value.split(',');
    }
    jugyo_search(arr_kamoku, arr_kamoku.length);
}

function btn33() {
    document.getElementById('funcForm:search').click();
    setTimeout(function () { numbering(); first_flag = true; main3(); }, 1500);

}

function btn35() {
    if (document.getElementById('funcForm:j_idt172:1').checked) {
        document.getElementById('funcForm:j_idt266').click();
    }
}

// 後期==============================================
var today = new Date();
if ((9 <= (today.getMonth() + 1)) && textEnd.endsWith("学生時間割表")) {
    if (document.querySelectorAll("div[class=ofAuto]")[0] != undefined) {
        document.querySelectorAll("div[class=ofAuto]")[0].classList.add("delete_info");
    }
}
// 後期==============================================

// ボタン作成=========================================
var element;
var afel = document.createElement("div");

//========================
element = document.createElement('button');
element.type = 'button';
if (textEnd.endsWith("時間割表")) {
    afel.className = "inner"
    element.innerText = "修得済科目非表示";
    element.onclick = main3;
} else if (textEnd.endsWith("シラバス検索")) {
    afel.className = "innerA"
    element.innerText = "検索条件を指定";
    element.onclick = function () {
        document.getElementById('funcForm:j_idt172:0').click();
    };
} else if (textEnd.endsWith("成績照会")) {
    afel.className = "innerA"
    element.innerText = "まとめて表示";
    element.onclick = function () {
        document.getElementById('funcForm:initPtn:0').click();
    };
} else if (textEnd.endsWith("出欠状況確認")) {
    afel.className = "innerA"
    element.innerText = "表示";
    element.onclick = function () {
        document.getElementById('funcForm:btnHyoji').click();
    };
}
element.id = "btmain";
afel.appendChild(element);// boxes.after(element);
//========================

//========================
element = document.createElement('button');
element.type = 'button';
element.id = "btmain2";
if (textEnd.endsWith("時間割表")) {
    element.innerText = "全科目表示"
    element.onclick = jugyo_all;
} else if (textEnd.endsWith("シラバス検索")) {
    element.innerText = "ｶﾘｷｭﾗﾑﾂﾘｰ照会";
    element.onclick = function () {
        document.getElementById('funcForm:j_idt172:1').click();
    };
} else if (textEnd.endsWith("成績照会")) {
    element.innerText = "年度学期表示";
    element.onclick = function () {
        document.getElementById('funcForm:initPtn:1').click();
    };
}
if (textEnd.endsWith("時間割表") || textEnd.endsWith("シラバス検索") || textEnd.endsWith("成績照会")) {
    afel.appendChild(element);// boxes.after(element);
}
//========================

//========================
var afel2 = document.createElement("div");
if (textEnd.endsWith("授業時間割表")) {
    element = document.createElement('input');
    element.type = 'text';
    element.id = "serchtext";
    element.name = "serchtext";
    element.size = "20";
    element.placeholder = "科目名";
    afel2.appendChild(element);
    element = document.createElement('button');
    element.type = 'button';
    element.innerText = " 検索 ";
    element.onclick = search;
    element.id = "btmain3";
    afel2.className = "searchB"
    afel2.appendChild(element);
}
//========================

if (textEnd.endsWith("シラバス検索")) {
    element = document.createElement('button');
    element.type = 'button';
    element.id = "btmain3";
    element.className = 'SyllabusBtnHyoji'
    element.innerText = "表示"
    element.onclick = btn35;
    afel.appendChild(element);
}
if (textEnd.endsWith("時間割表") || textEnd.endsWith("シラバス検索") || textEnd.endsWith("成績照会") || textEnd.endsWith("出欠状況確認")) {
    boxes.after(afel);
}
if (textEnd.endsWith("授業時間割表")) {
    var boxes2 = document.querySelectorAll("div[class=inner]")[0];
    boxes2.after(afel2);
}
if (textEnd.endsWith("時間割表")) {
    element = document.createElement('button');
    element.type = 'button';
    element.id = "btmain3";
    element.className = 'inner2'
    element.innerText = "表示"
    element.onclick = btn33;
    boxes.after(element);
}
