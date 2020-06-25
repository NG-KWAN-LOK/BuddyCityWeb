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
  document.title =
    languageContainer.BuildingList_title + "｜" + languageContainer.title;
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
  document.getElementById("BuildingList_title").innerHTML =
    languageContainer.BuildingList_title;
  document.getElementById("BuildingList_text").innerHTML =
    languageContainer.BuildingList_text;
  document.getElementById(
    "buildingPopUpLayer_data_table_buildingName"
  ).innerHTML = languageContainer.buildingPopUpLayer_data_table_buildingName;
  document.getElementById("buildingPopUpLayer_data_table_district").innerHTML =
    languageContainer.buildingPopUpLayer_data_table_district;
  document.getElementById("buildingPopUpLayer_data_table_adress").innerHTML =
    languageContainer.buildingPopUpLayer_data_table_adress;
  document.getElementById(
    "buildingPopUpLayer_data_table_Utilization"
  ).innerHTML = languageContainer.buildingPopUpLayer_data_table_Utilization;
  document.getElementById("buildingPopUpLayer_data_table_inside").innerHTML =
    languageContainer.buildingPopUpLayer_data_table_inside;
  document.getElementById(
    "buildingPopUpLayer_container_error_title_top"
  ).innerHTML = languageContainer.buildingPopUpLayer_container_error_title_top;
  document.getElementById(
    "buildingPopUpLayer_container_error_title_bottom"
  ).innerHTML =
    languageContainer.buildingPopUpLayer_container_error_title_bottom;
  //document.getElementById("").innerHTML = L_zhTW[16];
  showDistrict(languageIndex);
}
