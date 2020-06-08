function closeLayer(x) {
  x.classList.toggle("change");
  buildingPopUpLayer.style.display = "none";
  window.history.pushState({}, 0, "index.html");
  document.title = languageContainer.title;
}

function chooseDistrict(districtId) {
  buildingPopUpLayer.style.display = "flex";
  document.getElementsByClassName(
    "buildingPopUpLayer__container__error"
  )[0].style.display = "none";
  buildingData.style.display = "none";
  districtData.style.display = "block";
  console.log(districtId);
  $("#building").empty();
  var userDataRef = firebase.database().ref("/building/" + districtId);
  userDataRef.once("value").then(
    (res) => {
      var tempInfo = {
        name: null,
        district: null,
      };
      res.forEach((buildingIndex, index) => {
        let cityInfo = buildingIndex.val();
        if (languageContainer.lang === "chi") {
          tempInfo = {
            name: cityInfo.name_chi,
          };
        } else if (languageContainer.lang === "eng") {
          tempInfo = {
            name: cityInfo.name_eng,
          };
        } else if (languageContainer.lang === "jp") {
          tempInfo = {
            name: cityInfo.name_jp,
          };
        }
        console.log(cityInfo.name_chi);
        var buildingString =
          `<div target="_blank" class="district__building" id="districtId=${districtId}&buildingId=${buildingIndex}" onClick="chooseBuilding('${districtId}', ${buildingIndex.key})">` +
          `<div class="district__building__name">${tempInfo.name}</div>
                    </a>`;
        $("#building").append(buildingString);
      });
      let districtInfo = res.child("0").val();
      if (languageContainer.lang === "chi") {
        tempInfo = {
          district: districtInfo.district_chi,
        };
      } else if (languageContainer.lang === "eng") {
        tempInfo = {
          district: districtInfo.district_eng,
        };
      } else if (languageContainer.lang === "jp") {
        tempInfo = {
          district: districtInfo.district_jp,
        };
      }
      $("#data_district_title").html(tempInfo.district);
      console.log(districtInfo.district_chi);
      window.history.pushState({}, 0, "?districtId=" + districtId);
    },
    (rej) => {
      console.log(rej);
    }
  );
}

function chooseBuilding(districtId, buildingId) {
  buildingPopUpLayer.style.display = "flex";
  document.getElementsByClassName(
    "buildingPopUpLayer__container__error"
  )[0].style.display = "none";
  document.getElementsByClassName(
    "buildingPopUpLayer__buildingData__container__data"
  )[0].style.display = "flex";
  buildingData.style.display = "block";
  districtData.style.display = "none";
  console.log(districtId + " " + buildingId);
  var userDataRef = firebase
    .database()
    .ref("/building/" + districtId + "/" + buildingId);
  userDataRef.once("value").then(
    (res) => {
      var tempInfo = {
        name: null,
        district: null,
        adress: null,
        utilization: null,
        inside: null,
        notFound: null,
      };
      let buildingInfo = res.val();
      if (buildingInfo != null) {
        if (languageContainer.lang === "chi") {
          tempInfo = {
            name: buildingInfo.name_chi,
            district: buildingInfo.district_chi,
            adress: buildingInfo.adress_chi,
            utilization: buildingInfo.用途,
            inside: buildingInfo.內裝,
            notFound: "找不到資料",
          };
        } else if (languageContainer.lang === "eng") {
          tempInfo = {
            name: buildingInfo.name_eng,
            district: buildingInfo.district_eng,
            adress: buildingInfo.adress_eng,
            utilization: buildingInfo.Utilization,
            inside: buildingInfo.inside,
            notFound: "404 Not Found",
          };
        } else if (languageContainer.lang === "jp") {
          tempInfo = {
            name: buildingInfo.name_jp,
            district: buildingInfo.district_jp,
            adress: buildingInfo.adress_jp,
            utilization: buildingInfo.用途_jp,
            inside: buildingInfo.インテリア,
            notFound: "ページが見つかりません",
          };
        }
        $(".data_link_eng").attr(
          "href",
          `../eng/building_list/building.html?districtId=${districtId}&buildingId=${buildingId}`
        );
        $(".data_link_jp").attr(
          "href",
          `../jp/building_list/building.html?districtId=${districtId}&buildingId=${buildingId}`
        );
        $("#data_building_ahref").html(tempInfo.name);
        $("#data_building_title").html(tempInfo.name);
        $("#data_buildingName").html(tempInfo.name);
        $("#data_district").html(tempInfo.district);
        $("#data_adress").html(tempInfo.adress);
        $("#data_Utilization").html(tempInfo.utilization);
        $("#data_inside").html(tempInfo.inside);
        $("#data_address_map").attr(
          "src",
          `https://buddycityinfo.sgngs.com/map.html?worldname=world&mapname=flat&zoom=6&x=${buildingInfo.x}&y=${buildingInfo.y}&z=${buildingInfo.z}`
        );
        $("#data_address_link").attr(
          "href",
          `https://buddycityinfo.sgngs.com/map.html?worldname=world&mapname=flat&zoom=6&x=${buildingInfo.x}&y=${buildingInfo.y}&z=${buildingInfo.z}`
        );
        window.history.pushState(
          {},
          0,
          "?districtId=" + districtId + "&buildingId=" + buildingId
        );
        document.title = tempInfo.name + "丨" + languageContainer.title;
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
        document.title = tempInfo.notFound + "丨" + languageContainer.title;
        document.getElementsByClassName(
          "buildingPopUpLayer__buildingData__container__data"
        )[0].style.display = "none";
        document.getElementsByClassName(
          "buildingPopUpLayer__container__error"
        )[0].style.display = "flex";
      }
    },
    (rej) => {
      console.log(rej);
    }
  );
}

function getURL() {
  let searchParams = new URLSearchParams(window.location.search);
  let districtId = searchParams.get("districtId");
  let buildingId = searchParams.get("buildingId");
  if (districtId != null && buildingId != null) {
    chooseBuilding(districtId, buildingId);
  }
  console.log("URL" + districtId, buildingId);
}

$(document).ready(function () {
  getURL();
});
