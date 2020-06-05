function closeLayer(x) {
  x.classList.toggle("change");
  buildingPopUpLayer.style.display = "none";
  window.history.pushState({}, 0, "index.html");
  document.title = "城市建築物名冊丨Buddy-INFO Buddy市指南)";
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
      res.forEach((buildingIndex, index) => {
        let cityInfo = buildingIndex.val();
        console.log(cityInfo.name_chi);
        var buildingString =
          `<div target="_blank" class="district__building" id="districtId=${districtId}&buildingId=${buildingIndex}" onClick="chooseBuilding('${districtId}', ${buildingIndex.key})">` +
          `<div class="district__building__name">${cityInfo.name_chi}</div>
                    </a>`;
        $("#building").append(buildingString);
      });
      let districtInfo = res.child("0").val();
      $("#data_district_title").html(districtInfo.district_chi);
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
      let buildingInfo = res.val();
      if (buildingInfo != null) {
        $(".data_link_eng").attr(
          "href",
          `../eng/building_list/building.html?districtId=${districtId}&buildingId=${buildingId}`
        );
        $(".data_link_jp").attr(
          "href",
          `../jp/building_list/building.html?districtId=${districtId}&buildingId=${buildingId}`
        );
        $("#data_building_ahref").html(buildingInfo.name_chi);
        $("#data_building_title").html(buildingInfo.name_chi);
        $("#data_buildingName").html(buildingInfo.name_chi);
        $("#data_district").html(buildingInfo.district_chi);
        $("#data_adress").html(buildingInfo.adress_chi);
        $("#data_Utilization").html(buildingInfo.用途);
        $("#data_inside").html(buildingInfo.內裝);
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
        document.title =
          `${buildingInfo.name_chi}` +
          `丨城市建築物名冊丨Buddy-INFO Buddy市指南)`;
      } else {
        document.title = "找不到資料丨城市建築物名冊丨Buddy-INFO Buddy市指南)";
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
