function closeLayer(x) {
  x.classList.toggle("change");
  residentPopUpLayer.style.display = "none";
  window.history.pushState({}, 0, "index.html");
  document.title =
    languageContainer.ResidentList_title + "｜" + languageContainer.title;
}

function chooseCharacter(characterId) {
  residentPopUpLayer.style.display = "flex";
  document.getElementsByClassName(
    "residentPopUpLayer__container__error"
  )[0].style.display = "none";
  document.getElementsByClassName(
    "residentPopUpLayer__container__data"
  )[0].style.display = "flex";
  var userDataRef = firebase.database().ref("/resident/" + characterId);
  console.log(characterId);
  userDataRef.once("value").then(
    (res) => {
      var tempInfo = {
        nickname: null,
        address: null,
        project: null,
        notFound: null,
      };
      let characteInfo = res.val();
      console.log("characteInfo" + characteInfo);
      if (characteInfo != null) {
        if (languageContainer.lang === "chi") {
          tempInfo = {
            nickname: characteInfo.nickname_chi,
            address: characteInfo.address_CHI,
            project: characteInfo.project_CHI,
          };
        } else if (languageContainer.lang === "eng") {
          tempInfo = {
            nickname: characteInfo.nickname_eng,
            address: characteInfo.address_ENG,
            project: characteInfo.project_ENG,
          };
        } else if (languageContainer.lang === "jp") {
          tempInfo = {
            nickname: characteInfo.nickname_jp,
            address: characteInfo.adress_JP,
            project: characteInfo.project_JP,
          };
        }
        $("#data_username_title").html(characteInfo.user_name);
        $("#data_face_img").attr("src", `image/${characteInfo.face}1.png`);
        $("#data_username").html(characteInfo.user_name);
        $("#data_nickname").html(tempInfo.nickname);
        $("#data_participate_year").html(characteInfo.participate_year);
        $("#data_address").html(tempInfo.address);
        $("#data_project").html(tempInfo.project);
        $("#data_address_map").attr(
          "src",
          `../map.html?worldname=world&mapname=flat&zoom=6&x=${characteInfo.x}&y=${characteInfo.y}&z=${characteInfo.z}`
        );
        $("#data_address_link").attr(
          "href",
          `../map.html?worldname=world&mapname=flat&zoom=6&x=${characteInfo.x}&y=${characteInfo.y}&z=${characteInfo.z}`
        );
        window.history.pushState({}, 0, "?characterId=" + characterId);
        document.title =
          `${characteInfo.user_name}` +
          "丨" +
          languageContainer.ResidentList_title +
          "｜" +
          languageContainer.title;
      } else {
        if (languageContainer.lang === "chi") {
          tempInfo = {
            notFound: "找不到資料",
          };
        } else if (languageContainer.lang === "eng") {
          tempInfo = {
            notFound: "404 Not Found",
          };
        } else if (languageContainer.lang === "jp") {
          tempInfo = {
            notFound: "ページが見つかりません",
          };
        }
        document.title =
          tempInfo.notFound +
          "丨" +
          languageContainer.ResidentList_title +
          "｜" +
          languageContainer.title;
        document.getElementsByClassName(
          "residentPopUpLayer__container__data"
        )[0].style.display = "none";
        document.getElementsByClassName(
          "residentPopUpLayer__container__error"
        )[0].style.display = "flex";
      }
    },
    (rej) => {}
  );
}

function getURL() {
  let searchParams = new URLSearchParams(window.location.search);
  let characterId = searchParams.get("characterId");
  if (characterId != null) {
    chooseCharacter(characterId);
  }
  console.log("URL" + characterId);
}

$(document).ready(function () {
  getURL();
});
