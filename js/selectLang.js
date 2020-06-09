function SelectLang(languageIndex) {
  if (languageIndex === 1) {
    document.cookie =
      "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/BuddyCityWeb;";
    document.cookie = "language=chi; path=/BuddyCityWeb;";
    console.log(document.cookie.split(";"));
    readLangToSetLang();
  } else if (languageIndex === 2) {
    document.cookie =
      "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/BuddyCityWeb;";
    document.cookie = "language=eng; path=/BuddyCityWeb;";
    console.log(document.cookie.split(";"));
    readLangToSetLang();
  } else if (languageIndex === 3) {
    document.cookie =
      "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/BuddyCityWeb;";
    document.cookie = "language=jp; path=/BuddyCityWeb;";
    console.log(document.cookie.split(";"));
    readLangToSetLang();
  }
}

function readLangToSetLang() {
  if (getCookieByName("language") === "chi") {
    setLanguage(1);
    console.log("read chi");
    //showDistrict(1);
  } else if (getCookieByName("language") === "eng") {
    setLanguage(2);
    console.log("read eng");
    //showDistrict(2);
  } else if (getCookieByName("language") === "jp") {
    setLanguage(3);
    console.log("read jp");
    //showDistrict(3);
  }
}

$(document).ready(function () {
  console.log("check selectLang cookies");
  if (getCookieByName("language") === undefined) {
    console.log("Language null");
    document.cookie = "language=chi";
  } else {
    console.log("darkMode exist");
  }
  readLangToSetLang();
});

console.log(document.cookie.split(";"));
