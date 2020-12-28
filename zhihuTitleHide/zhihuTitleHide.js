// ==UserScript==
// @name         去除知乎最上方标题栏
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  去除知乎最上方标题栏，右边的侧边栏，设置正文宽度为显示宽度的2/3
// @author       zerozz
// @match        https://www.zhihu.com/question/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    setTimeout(function() {
        document.getElementsByClassName("PageHeader")[0].remove();
        document.getElementsByClassName("AppHeader-inner")[0].remove();
        let stickyArr = document.getElementsByClassName("Sticky");
        let stickySize = stickyArr.length;
        for (let i = 0; i < stickySize; i++) {
           stickyArr[i] ? stickyArr[i].remove() : null;
        }

        setTimeout(function() {
            document.getElementsByClassName("QuestionAnswers-answers")[0].style.width = document.body.clientWidth / 3 * 2 + 'px';
        }, 100);
    }, 500);
})();
