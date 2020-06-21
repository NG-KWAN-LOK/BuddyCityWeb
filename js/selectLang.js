function SelectLang(languageIndex) {
  if (languageIndex === 1) {
    localStorage.setItem("language", "chi");
    readLangToSetLang();
  } else if (languageIndex === 2) {
    localStorage.setItem("language", "eng");
    readLangToSetLang();
  } else if (languageIndex === 3) {
    localStorage.setItem("language", "jp");
    readLangToSetLang();
  }
  console.log(localStorage.getItem("language"));
}

function readLangToSetLang() {
  if (localStorage.getItem("language") === "chi") {
    setLanguage(1);
    console.log("read chi");
    //showDistrict(1);
  } else if (localStorage.getItem("language") === "eng") {
    setLanguage(2);
    console.log("read eng");
    //showDistrict(2);
  } else if (localStorage.getItem("language") === "jp") {
    setLanguage(3);
    console.log("read jp");
    //showDistrict(3);
  }
}

$(document).ready(function () {
  console.log("check selectLang cookies");
  if (localStorage.getItem("language") === null) {
    console.log("Language null");
    localStorage.setItem("language", "chi");
  } else {
    console.log("Language exist");
  }
  readLangToSetLang();
});
