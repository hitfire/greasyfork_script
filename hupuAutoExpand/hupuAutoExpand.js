// ==UserScript==
// @name         虎扑引用楼层内容过长自动折叠
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  虎扑引用楼层内容过长自动折叠，v0.2增加展开和收起按钮，v0.3超过一定长度才会折叠,v0.4折叠标题内容
// @author       zerozz
// @match        https://bbs.hupu.com/*.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function onClickExpand() {
        var ele = document.getElementById("expandBtn" + this.id.charAt(this.id.length - 1));
        if (this.innerText == "展开") {
            this.parentNode.previousElementSibling.style.maxHeight = "none";
            this.innerText = "收起";
        } else {
            this.parentNode.previousElementSibling.style.maxHeight = "100px";
            this.innerText = "展开";
        }
    }

    function reduceSize(bqEleArr, i, allsize) {
        var donesize = i;
        for (; i < allsize; i++) {
            var bqEle = bqEleArr[i - donesize];
            if (bqEle.offsetHeight && bqEle.offsetHeight > 200) {
                bqEle.style.cssText='max-height: 100px; overflow: hidden; transition: max-height 2s ease 0s;';

                var expandParentEle = document.createElement("div");
                expandParentEle.id = "expandParentEle" + i;
                expandParentEle.style.cssText = "text-align: center;padding: 10px;";

                var expandEle = document.createElement("span");
                expandEle.id = "expandBtn" + i;
                expandEle.style.cssText = "color:#108089;cursor: pointer;padding: 4px 7px;border-radius: 3px;border-width: 1px;border-style: solid;border-color: rgb(166, 166, 166);transition: all 0.1s ease 0s;";
                expandEle.innerText = "展开";
                expandEle.onclick = onClickExpand;
                expandParentEle.appendChild(expandEle);

                var parent = bqEle.parentNode;
                if (parent.lastChild == bqEle) {
                    parent.appendChild(expandParentEle);
                } else {
                    parent.insertBefore(expandParentEle, bqEle.nextSibling)
                }
            }
        }

        return i;
    }


    var titleEleArr = document.getElementsByClassName("quote-content") || [];
    var i = 0;
    var size = titleEleArr.length;
    i = reduceSize(titleEleArr, i, size);

    var bqEleArr = document.getElementsByTagName("blockquote") || [];
    size += bqEleArr.length;
    i = reduceSize(bqEleArr, i, size);
})();
