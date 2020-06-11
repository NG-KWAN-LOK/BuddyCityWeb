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
var provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//Login
function googleLoginRedirect() {
  console.log("clicked");
  firebase
    .auth()
    .signInWithRedirect(provider)
    .then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
    });
}

//Get Data

async function readDatabase(pagechoose) {
  $("#admin__monitor").empty();
  var DataRef = firebase.database().ref(pagechoose);
  console.log("In editDatabase" + pagechoose);
  var titleString = `
  <div>在資料庫${pagechoose}內有的資料</div>
  `;
  $("#admin__monitor").append(titleString);
  if (pagechoose === "building") {
    await DataRef.once("value").then(
      (res) => {
        res.forEach((Item, index) => {
          //console.log(Item.getKey());
          var itemKey = Item.getKey();
          //console.log(Item.val());
          itemValue = Item.val();
          var divContent = `<div>${itemKey}：<div>`;
          for (var title in itemValue) {
            divContent += `<div>${title}：${itemValue[title]}<div>`;
          }
          $("#admin__monitor").append(divContent);
        });
        return true;
      },
      (rej) => {
        console.log(rej);
        return true;
      }
    );
  } else if (pagechoose === "resident") {
    await DataRef.once("value").then(
      (res) => {
        res.forEach((Item, index) => {
          //console.log(Item.getKey());
          var itemKey = Item.getKey();
          //console.log(Item.val());
          itemValue = Item.val();
          var divContent = `<div>${itemKey}：<div>`;
          for (var title in itemValue) {
            divContent += `<div>${title}：${itemValue[title]}<div>`;
          }
          $("#admin__monitor").append(divContent);
        });
        return true;
      },
      (rej) => {
        console.log(rej);
        return true;
      }
    );
  }
}
async function newItemResident() {
  var DataRef = firebase.database().ref("resident");
  var totalChild = 0;
  await DataRef.once("value").then(
    (res) => {
      res.forEach((Item, index) => {
        totalChild += 1;
      });
      return true;
    },
    (rej) => {
      console.log(rej);
      return true;
    }
  );
  console.log(totalChild);
  const form = document.forms["form"];
  var address_CHI = form.elements.address_CHI.value;
  var address_ENG = form.elements.address_ENG.value;
  var adress_JP = form.elements.adress_JP.value;
  var district_CHI = form.elements.district_CHI.value;
  var district_ENG = form.elements.district_ENG.value;
  var district_JP = form.elements.district_JP.value;
  var face = form.elements.face.value;
  var nickname_chi = form.elements.nickname_chi.value;
  var nickname_eng = form.elements.nickname_eng.value;
  var nickname_jp = form.elements.nickname_jp.value;
  var participate_year = form.elements.participate_year.value;
  var project_CHI = form.elements.project_CHI.value;
  var project_ENG = form.elements.project_ENG.value;
  var project_JP = form.elements.project_JP.value;
  var user_name = form.elements.user_name.value;
  var x = form.elements.x.value;
  var y = form.elements.y.value;
  var z = form.elements.z.value;
  if (
    address_CHI != "" &&
    address_ENG != "" &&
    adress_JP != "" &&
    district_CHI != "" &&
    district_ENG != "" &&
    district_JP != "" &&
    face != "" &&
    nickname_chi != "" &&
    nickname_eng != "" &&
    nickname_jp != "" &&
    participate_year != "" &&
    project_CHI != "" &&
    project_ENG != "" &&
    project_JP != "" &&
    user_name != "" &&
    x != "" &&
    y != "" &&
    z != ""
  ) {
    firebase
      .database()
      .ref("resident/" + totalChild)
      .set({
        address_CHI: form.elements.address_CHI.value,
        address_ENG: form.elements.address_ENG.value,
        adress_JP: form.elements.adress_JP.value,
        district_CHI: form.elements.district_CHI.value,
        district_ENG: form.elements.district_ENG.value,
        district_JP: form.elements.district_JP.value,
        face: form.elements.face.value,
        nickname_chi: form.elements.nickname_chi.value,
        nickname_eng: form.elements.nickname_eng.value,
        nickname_jp: form.elements.nickname_jp.value,
        participate_year: form.elements.participate_year.value,
        project_CHI: form.elements.project_CHI.value,
        project_ENG: form.elements.project_ENG.value,
        project_JP: form.elements.project_JP.value,
        user_name: form.elements.user_name.value,
        x: form.elements.x.value,
        y: form.elements.y.value,
        z: form.elements.z.value,
      })
      .then(function () {
        alert("建立成功");
      })
      .catch(function () {
        alert("伺服器發生錯誤，請稍後再試");
      });
  } else {
    alert("建立失敗！！！未有填寫全部資料");
  }
  $("#admin__monitor").empty();
}

const submitBtn = document.querySelector('[data-action="submit"]');
submitBtn.addEventListener("click", newItemResident);

function showEditResidentForm() {
  $("#admin__monitor").empty();
  var divContent = `<div class="admin__monitor__title">
  增加新資料於居民名冊：
</div>
<div class="admin__monitor__subtitle">
  請填寫以下表格（全部值必須填寫）
</div>
<form name="form" id="form">
  <div class="admin__monitor__item">
    住址（日文）：
    <input
      type="text"
      name="address_CHI"
      id="address_CHI"
      value="無"
    />
  </div>
  <div class="admin__monitor__item">
    住址（英文）：
    <input
      type="text"
      name="address_ENG"
      id="address_ENG"
      value="None"
    />
  </div>
  <div class="admin__monitor__item">
    住址（日文）：
    <input type="text" name="adress_JP" id="adress_JP" value="なし" />
  </div>
  <div class="admin__monitor__item">
    住址所在之地區（中文）：
    <input
      type="text"
      name="district_CHI"
      id="district_CHI"
      value="公園"
    />
  </div>
  <div class="admin__monitor__item">
    住址所在之地區（英文）：
    <input
      type="text"
      name="district_ENG"
      id="district_ENG"
      value="Park"
    />
  </div>
  <div class="admin__monitor__item">
    住址所在之地區（日文）：
    <input
      type="text"
      name="district_JP"
      id="district_JP"
      value="公園"
    />
  </div>
  <div class="admin__monitor__item">
    頭像檔名：
    <input type="text" name="face" id="face" value="steve" />
  </div>
  <div class="admin__monitor__item">
    稱號（中文）：
    <input
      type="text"
      name="nickname_chi"
      id="nickname_chi"
      value="史提夫"
    />
  </div>
  <div class="admin__monitor__item">
    稱號（英文）：：
    <input
      type="text"
      name="nickname_eng"
      id="nickname_eng"
      value="steve"
    />
  </div>
  <div class="admin__monitor__item">
    稱號（日文）：：
    <input
      type="text"
      name="nickname_jp"
      id="nickname_jp"
      value="スティーブ"
    />
  </div>
  <div class="admin__monitor__item">
    入籍年份：
    <input
      type="text"
      name="participate_year"
      id="participate_year"
      value="2012"
    />
  </div>
  <div class="admin__monitor__item">
    曾參與過建築項目（中文）：
    <input
      type="text"
      name="project_CHI"
      id="project_CHI"
      value="無"
    />
  </div>
  <div class="admin__monitor__item">
    曾參與過建築項目（英文）：
    <input
      type="text"
      name="project_ENG"
      id="project_ENG"
      value="None"
    />
  </div>
  <div class="admin__monitor__item">
    曾參與過建築項目（日文）：
    <input
      type="text"
      name="project_JP"
      id="project_JP"
      value="なし"
    />
  </div>
  <div class="admin__monitor__item">
    遊戲用戶名稱：
    <input
      type="text"
      name="user_name"
      id="user_name"
      value="steve"
    />
  </div>
  <div class="admin__monitor__item">
    地址所在地圖之X座標：
    <input type="text" name="x" id="x" value="365" />
  </div>
  <div class="admin__monitor__item">
    地址所在地圖之Y座標：
    <input type="text" name="y" id="y" value="453" />
  </div>
  <div class="admin__monitor__item">
    地址所在地圖之Z座標：
    <input type="text" name="z" id="z" value="70" />
  </div>
  <input
    type="button"
    name="submit"
    value="送出"
    onclick="newItemResident();"
  />
</form>`;
  $("#admin__monitor").append(divContent);
}

function choosePage(choice) {
  $("#admin__choosePage").empty();
  $("#admin__monitor").empty();
  if (choice === 1) {
    var divContent = `
    <div class="admin__choosePage__editDatabase">
      <div class="admin__choosePage__editDatabase__title">
        請選擇您想於居民名冊頁面之操作：
      </div>
      <div class="admin__choosePage__editDatabase__item" onclick="readDatabase('resident')">
        閱讀資料庫
      </div>
      <div
        class="admin__choosePage__editDatabase__item"
        onclick="showEditResidentForm()"
      >
        增加新資料
      </div>
    </div>`;
    $("#admin__choosePage").append(divContent);
    //editDatabase();
  } else if (choice === 2) {
    var divContent = `
    <div class="admin__choosePage__editDatabase">
      <div class="admin__choosePage__editDatabase__title">
        請選擇您想於城市建築物名冊頁面之操作：
      </div>
      <div class="admin__choosePage__editDatabase__item" onclick="readDatabase('building')">
        閱讀資料庫
      </div>
      <div
        class="admin__choosePage__editDatabase__item"
        onclick="newItemBuilding()"
      >
        增加新資料
      </div>
    </div>`;
    $("#admin__choosePage").append(divContent);
    //editDatabase();
  }
}
