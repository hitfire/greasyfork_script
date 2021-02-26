// ==UserScript==
// @name         吾爱破解 自动签到
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  自动签到
// @author       zz
// @match        https://www.52pojie.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var nowDate = new Date();
    var pojie52AutologinFlag = JSON.parse(localStorage.getItem('pojie52AutologinFlag')) || {};
    var sessionDay = pojie52AutologinFlag.sessionDay;
    var sessionMonth = pojie52AutologinFlag.sessionMonth;
    console.log(pojie52AutologinFlag)

    if (nowDate.getDay() != sessionDay || nowDate.getMonth() != sessionMonth) {
        var sessionObj = new Object();
        sessionObj.sessionDay = new Date().getDay();
        sessionObj.sessionMonth = new Date().getMonth();
        console.log(JSON.stringify(sessionObj))
        localStorage.setItem('pojie52AutologinFlag', JSON.stringify(sessionObj));
        window.open('/home.php?mod=task&do=apply&id=2');
    }
})();