function SelectLang(languageIndex) {
    if (languageIndex === 1) {
        document.cookie = "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/BuddyCityWeb;";
        document.cookie = "language=chi; path=/BuddyCityWeb;";
        console.log(document.cookie.split(';'));
    } else if (languageIndex === 2) {
        document.cookie = "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/BuddyCityWeb;";
        document.cookie = "language=eng; path=/BuddyCityWeb;";
        console.log(document.cookie.split(';'));
    } else if (languageIndex === 3) {
        document.cookie = "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/BuddyCityWeb;";
        document.cookie = "language=jp; path=/BuddyCityWeb;";
        console.log(document.cookie.split(';'));
    }
}

function readLangToSetLang() {
    if (getCookieByName('language') === "chi") {
        setLanguage(1);
        showDistrict(1);
    }
    else if (getCookieByName('darkMode') === 'eng') {
        setLanguage(2);
        showDistrict(2);
    }
    else if (getCookieByName('darkMode') === 'jp') {
        setLanguage(3);
        showDistrict(3);
    }
}

$(document).ready(function () {
    console.log('check selectLang cookies');
    if (getCookieByName('language') === undefined) {
        console.log('Language null');
        document.cookie = 'language=chi';
    }
    else {
        console.log('darkMode exist');
    }
    readModeToSwitchMode();
});

console.log(document.cookie.split(';'));