// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD8rlfI1ia02uVCyn4HigEgKnqSVppm96c",
  authDomain: "buddy-city-6644d.firebaseapp.com",
  databaseURL: "https://buddy-city-6644d.firebaseio.com",
  projectId: "buddy-city-6644d",
  storageBucket: "buddy-city-6644d.appspot.com",
  messagingSenderId: "602566457456",
  appId: "1:602566457456:web:b7339ee8dc4121e7771cb5",
  measurementId: "G-21NGJNE2VH",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//Get Data

async function renderResident() {
  $("#sortNav").empty();
  $("#resident").empty();
  const districtArray = [];
  const districtArrayENG = [];
  const districtArrayJP = [];

  var userDataRef = firebase.database().ref("resident");
  await userDataRef.once("value").then(
    (res) => {
      var districtBtn;
      res.forEach((characterSh, index) => {
        var character = characterSh.val();
        console.log(character);
        districtArray.push(character.district_CHI);
        districtArrayENG.push(character.district_ENG);
        districtArrayJP.push(character.district_JP);
        var characterString =
          `<div target="_blank" class="resident__box" id="${character.district_CHI}" onclick="chooseCharacter(${characterSh.key})">` +
          `<div class="resident__box__character" id="${character.user_name}">` +
          `<img class="resident__box__character__image" src="image/${character.face}.png">` +
          `<div class="resident__box__character__title">${character.user_name}</div>` +
          `</div>` +
          `</div>` +
          `</a>`;
        $("#resident").append(characterString);
      });
      return true;
    },
    (rej) => {
      console.log(rej);
      return true;
    }
  );

  const districtList = new Set(districtArray);
  const districtListENG = new Set(districtArrayENG);
  const districtListJP = new Set(districtArrayJP);
  console.log(districtListENG, districtListJP);
  console.log("here is the districtList", districtList);
  var allLable = "";
  if (languageContainer.lang === "chi") {
    allLable = "全部";
  } else if (languageContainer.lang === "eng") {
    allLable = "All";
  } else if (languageContainer.lang === "jp") {
    allLable = "全て";
  }
  var districtBtn = `<div class="actSortNav__btn" id="all-btn" onClick="sortByDistrict('全部', 'all')">
        <div class="actSortNav__text" id="all-text">
        ${allLable}
        </div>
        </div>`;
  $("#sortNav").append(districtBtn);
  var tempInfo = {
    district: null,
  };
  var count = 0;
  districtList.forEach((district_CHI, districtIndex) => {
    if (district_CHI != undefined) {
      console.log(district_CHI);
      console.log("index = " + districtIndex);
      console.log(Array.from(districtListENG)[count]);
      function chooseWord() {
        if (languageContainer.lang === "chi") {
          return district_CHI
        } else if (languageContainer.lang === "eng") {
          return Array.from(districtListENG)[count]
        } else if (languageContainer.lang === "jp") {
          return Array.from(districtListJP)[count]
        }
      }
      districtBtn = `
      <div class="sortNav__btn" id="${districtIndex}-btn" onClick="sortByDistrict('${district_CHI}', '${districtIndex}')">
            <div class="sortNav__text" id="${districtIndex}-text">
            ${chooseWord()}
            </div>
        </div>`;
      $("#sortNav").append(districtBtn);
    }
    count += 1;
  });
}

var tempClassName = "all";
function sortByDistrict(district_CHI, className) {
  console.log(district_CHI, className, tempClassName);
  document.getElementById(tempClassName + "-btn").className = "sortNav__btn";
  document.getElementById(tempClassName + "-text").className = "sortNav__text";
  document.getElementById(className + "-btn").className = "actSortNav__btn";
  document.getElementById(className + "-text").className = "actSortNav__text";
  $(".resident__box").fadeOut();
  if (district_CHI === "全部") {
    var residentBox = document.getElementsByClassName("resident__box");
    $(".resident__box").delay(300).fadeIn("slow");
  } else {
    var residentBox = document.querySelectorAll("#" + district_CHI);
    $("#" + district_CHI)
      .delay(300)
      .fadeIn("slow");
  }
  tempClassName = className;
}
