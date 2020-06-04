function DarkMode(x) {
    x.classList.toggle("change");
    if (document.getElementsByTagName("body")[0].getAttribute("data-theme") === '') {
        setDarkMode('dark');
        document.cookie = "darkMode=light; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/BuddyCityWeb;";
        document.cookie = "darkMode=dark; path=/BuddyCityWeb;";
        console.log(document.cookie.split(';'));
        console.log("on");
    } else {
        setDarkMode('light');
        document.cookie = "darkMode=dark; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/BuddyCityWeb;";
        document.cookie = "darkMode=light; path=/BuddyCityWeb;";
        console.log(document.cookie.split(';'));
        console.log("off");
    }
}
function readModeToSwitchMode() {
    if (getCookieByName('darkMode') === "light") {
        setDarkMode('light');
    }
    else if (getCookieByName('darkMode') === 'dark') {
        setDarkMode('dark');
    }
}

function setDarkMode(mode) {
    if (mode === 'dark') {
        document.getElementById("darkModeSwitch").checked = true;
        document.getElementById("PhoneTopDarkModeSwitch").checked = true;
        document.getElementsByTagName("body")[0].setAttribute("data-theme", "dark");
        document.getElementById("logoImg__Top").src = "image/logo_light.png";
        document.getElementById("logoImg__phoneTop").src = "image/logo_light.png";
        document.getElementById("logoImg__footer").src = "image/logo_light.png";
        $('#logoImg__Top').on("error", function () {
            $(this).attr('src', '../image/logo_light.png');
        });
        $('#logoImg__phoneTop').on("error", function () {
            $(this).attr('src', '../image/logo_light.png');
        });
        $('#logoImg__footer').on("error", function () {
            $(this).attr('src', '../image/logo_light.png');
        });
        console.log("dark");
    } else if (mode === 'light') {
        document.getElementById("darkModeSwitch").checked = false;
        document.getElementById("PhoneTopDarkModeSwitch").checked = false;
        document.getElementsByTagName("body")[0].setAttribute("data-theme", "");
        document.getElementById("logoImg__Top").src = "image/logo.png";
        document.getElementById("logoImg__phoneTop").src = "image/logo.png";
        document.getElementById("logoImg__footer").src = "image/logo.png";
        $('#logoImg__Top').on("error", function () {
            $(this).attr('src', '../image/logo.png');
        });
        $('#logoImg__phoneTop').on("error", function () {
            $(this).attr('src', '../image/logo.png');
        });
        $('#logoImg__footer').on("error", function () {
            $(this).attr('src', '../image/logo.png');
        });
        console.log("light");
    }
}

function parseCookie() {
    var cookieObj = {};
    var cookieAry = document.cookie.split(';');
    var cookie;

    for (var i = 0, l = cookieAry.length; i < l; ++i) {
        cookie = jQuery.trim(cookieAry[i]);
        cookie = cookie.split('=');
        cookieObj[cookie[0]] = cookie[1];
    }

    return cookieObj;
}
function getCookieByName(name) {
    var value = parseCookie()[name];
    if (value) {
        value = decodeURIComponent(value);
    }

    return value;
}
$(document).ready(function () {
    console.log('check cookies');
    if (getCookieByName('darkMode') === undefined) {
        console.log('darkMode null');
        document.cookie = 'darkMode=light';
    }
    else {
        console.log('darkMode exist');
    }
    readModeToSwitchMode();
});

console.log(document.cookie.split(';'));