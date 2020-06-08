var languageContainer = null;
function setLanguage(languageIndex) {
  if (languageIndex === 1) {
    console.log("zh-TW", L_zhTW);
    languageContainer = L_zhTW;
  } else if (languageIndex === 2) {
    console.log("ENG", L_Eng);
    languageContainer = L_Eng;
  } else if (languageIndex === 3) {
    console.log("JP");
    languageContainer = L_JP;
  }
  console.log("languageContainer: " + languageContainer.title);
  document.title = languageContainer.title;
  document.getElementById("topFooterLang_topHome").innerHTML =
    languageContainer.topFooterLang_topHome;
  document.getElementById("topFooterLang_topOnlineMap").innerHTML =
    languageContainer.topFooterLang_topOnlineMap;
  document.getElementById("topFooterLang_topBulidingList").innerHTML =
    languageContainer.topFooterLang_topBulidingList;
  document.getElementById("topFooterLang_topResidentList").innerHTML =
    languageContainer.topFooterLang_topResidentList;
  document.getElementById("topFooterLang_topDarkMode").innerHTML =
    languageContainer.topFooterLang_topDarkMode;
  document.getElementById("topFooterLang_phoneHome").innerHTML =
    languageContainer.topFooterLang_phoneHome;
  document.getElementById("topFooterLang_phoneOnlineMap").innerHTML =
    languageContainer.topFooterLang_phoneOnlineMap;
  document.getElementById("topFooterLang_phoneBulidingList").innerHTML =
    languageContainer.topFooterLang_phoneBulidingList;
  document.getElementById("topFooterLang_phoneResidentList").innerHTML =
    languageContainer.topFooterLang_phoneResidentList;
  document.getElementById("topFooterLang_phoneDarkMode").innerHTML =
    languageContainer.topFooterLang_phoneDarkMode;
  document.getElementById("ResidentList_title").innerHTML =
    languageContainer.ResidentList_title;
  document.getElementById("ResidentList_text").innerHTML =
    languageContainer.ResidentList_text;
  document.getElementById("topFooterLang_fotterTitle").innerHTML =
    languageContainer.topFooterLang_fotterTitle;
  document.getElementById("topFooterLang_fotterAddress").innerHTML =
    languageContainer.topFooterLang_fotterAddress;
  document.getElementById("topFooterLang_fotterAbout").innerHTML =
    languageContainer.topFooterLang_fotterAbout;
  document.getElementById("topFooterLang_fotterTNC").innerHTML =
    languageContainer.topFooterLang_fotterTNC;
  document.getElementById("topFooterLang_fotterDynmap").innerHTML =
    languageContainer.topFooterLang_fotterDynmap;
  document.getElementById("topFooterLang_fotterCopyright").innerHTML =
    languageContainer.topFooterLang_fotterCopyright;
  document.getElementById("data_table_username").innerHTML =
    languageContainer.data_table_username;
  document.getElementById("data_table_nickname").innerHTML =
    languageContainer.data_table_nickname;
  document.getElementById("data_table_address").innerHTML =
    languageContainer.data_table_adress;
  document.getElementById("data_table_participate_year").innerHTML =
    languageContainer.data_table_participate_year;
  document.getElementById("data_table_address").innerHTML =
    languageContainer.data_table_address;
  document.getElementById("data_table_project").innerHTML =
    languageContainer.data_table_project;
  document.getElementById(
    "residentPopUpLayer_container_error_title_top"
  ).innerHTML = languageContainer.residentPopUpLayer_container_error_title_top;
  document.getElementById(
    "residentPopUpLayer_container_error_title_bottom"
  ).innerHTML =
    languageContainer.residentPopUpLayer_container_error_title_bottom;
  //document.getElementById("").innerHTML = L_zhTW[16];
  renderResident();
}
