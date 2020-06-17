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

async function readDatabase(pagechoose) {
  $("#admin__monitor").empty();
  var DataRef = firebase.database().ref(pagechoose);
  console.log("In editDatabase" + pagechoose);
  var titleString = `
  <div class="admin__monitor__title">在資料庫${pagechoose}內有的資料</div>
  `;
  $("#admin__monitor").append(titleString);
  if (pagechoose === "building") {
    await DataRef.once("value").then(
      (res) => {
        res.forEach((Item, index) => {
          //console.log(Item.getKey());
          var itemKey = Item.getKey();
          itemValue = Item.val();
          console.log(itemValue);
          var divContent = `<div class="admin__monitor__item" style="padding:36px 0px 0px 0px">${itemKey}：</div>`;
          for (var title in itemValue) {
            //console.log(itemValue[title]);
            divContent += `<div class="admin__monitor__item" style="padding-left:64px">${title}：${itemValue[title]}</div>`;
            for (var value in itemValue[title]) {
              divContent += `<div class="admin__monitor__item" style="padding-left:128px">${value}：${itemValue[title][value]}</div>`;
            }
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
          var divContent = `<div class="admin__monitor__item" style="padding:36px 0px 0px 0px">${itemKey}：</div>`;
          for (var title in itemValue) {
            divContent += `<div class="admin__monitor__item" style="padding-left:64px">${title}：${itemValue[title]}</div>`;
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
async function newItemBuilding(districtId) {
  console.log(districtId);
  var DataRef = firebase.database().ref("/building/" + districtId);
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
  var Utilization = form.elements.Utilization.value;
  var adress_chi = form.elements.adress_chi.value;
  var adress_eng = form.elements.adress_eng.value;
  var adress_jp = form.elements.adress_jp.value;
  var district_chi = form.elements.district_chi.value;
  var district_eng = form.elements.district_eng.value;
  var district_jp = form.elements.district_jp.value;
  var inside = form.elements.inside.value;
  var name_chi = form.elements.name_chi.value;
  var name_eng = form.elements.name_eng.value;
  var name_jp = form.elements.name_jp.value;
  var x = form.elements.x.value;
  var y = form.elements.y.value;
  var z = form.elements.z.value;
  var インテリア = form.elements.インテリア.value;
  var 內裝 = form.elements.內裝.value;
  var 用途 = form.elements.用途.value;
  var 用途_jp = form.elements.用途_jp.value;
  if (
    Utilization != "" &&
    adress_chi != "" &&
    adress_eng != "" &&
    adress_jp != "" &&
    district_chi != "" &&
    district_eng != "" &&
    district_jp != "" &&
    inside != "" &&
    name_chi != "" &&
    name_eng != "" &&
    name_jp != "" &&
    インテリア != "" &&
    內裝 != "" &&
    用途 != "" &&
    用途_jp != "" &&
    x != "" &&
    y != "" &&
    z != ""
  ) {
    firebase
      .database()
      .ref("/building/" + districtId + "/" + totalChild)
      .set({
        Utilization: Utilization,
        adress_chi: adress_chi,
        adress_eng: adress_eng,
        adress_jp: adress_jp,
        district_chi: district_chi,
        district_eng: district_eng,
        district_jp: district_jp,
        inside: inside,
        name_chi: name_chi,
        name_eng: name_eng,
        name_jp: name_jp,
        インテリア: インテリア,
        內裝: 內裝,
        用途: 用途,
        用途_jp: 用途_jp,
        x: x,
        y: y,
        z: z,
      })
      .then(function () {
        alert("建立成功");
      })
      .catch(function () {
        alert("伺服器發生錯誤。如果您是管理員，請尋真·管理員協助。 或者 你是黑客 ㄇㄌㄈㄎ！！");
        if (user === "") {
          logout(999);
          $("#admin__content").empty();
          $("#admin__choosePage").empty();
          var divContent = `
    <div class="admin__login">
        <div class="admin__login__title">請先登入</div>
        <div id="singUpRedirect" onclick="googleLoginRedirect()">
            使用google帳號登入
        </div>
    </div>`;
          $("#admin__content").append(divContent);
        }
      });
  } else {
    alert("建立失敗！！！未有填寫全部資料");
  }
  $("#admin__monitor").empty();
}
function showEditBuildingForm(
  districtId,
  district_chi,
  district_eng,
  district_jp
) {
  $("#admin__monitor").empty();
  var divContent = `<div class="admin__monitor__title">
  增加新資料於居民名冊：
</div>
<div class="admin__monitor__subtitle">
  請填寫以下表格（全部值必須填寫）
</div>
<form name="form" id="form">
  <div class="admin__monitor__item">
    住址（中文）：
    <input
      type="text"
      name="adress_chi"
      id="adress_chi"
      value="市中心Buddy路1號"
    />
  </div>
  <div class="admin__monitor__item">
    住址（英文）：
    <input type="text" name="adress_eng" id="adress_eng" value="1-Buddy Road, Buddy Central" />
  </div>
  <div class="admin__monitor__item">
    住址所在之地區（日文）：
    <input
      type="text"
      name="adress_jp"
      id="adress_jp"
      value="中央区Buddy路-1"
    />
  </div>
  <div class="admin__monitor__item">
    住址所在之地區（中文）：
    <input
      type="text"
      name="district_chi"
      id="district_chi"
      value="${district_chi}"
    />
  </div>
  <div class="admin__monitor__item">
    住址所在之地區（英文）：
    <input
      type="text"
      name="district_eng"
      id="district_eng"
      value="${district_eng}"
    />
  </div>
  <div class="admin__monitor__item">
    住址所在之地區（日文）：
    <input type="text" name="district_jp" id="district_jp" value="${district_jp}" />
  </div>
  <div class="admin__monitor__item">
    建築物名稱（中文）：
    <input
      type="text"
      name="name_chi"
      id="name_chi"
      value="新建築"
    />
  </div>
  <div class="admin__monitor__item">
    建築物名稱（英文）：
    <input
      type="text"
      name="name_eng"
      id="name_eng"
      value="New Building"
    />
  </div>
  <div class="admin__monitor__item">
    建築物名稱（日文）：
    <input
      type="text"
      name="name_jp"
      id="name_jp"
      value="新しビール"
    />
  </div>
  <div class="admin__monitor__item">
    所在地圖之X座標：
    <input type="text" name="x" id="x" value="365" />
  </div>
  <div class="admin__monitor__item">
    所在地圖之Y座標：
    <input type="text" name="y" id="y" value="453" />
  </div>
  <div class="admin__monitor__item">
    所在地圖之Z座標：
    <input type="text" name="z" id="z" value="70" />
  </div>
  <div class="admin__monitor__item">
    內裝（中文）：
    <input
      type="text"
      name="內裝"
      id="內裝"
      value="有"
    />
  </div>
  <div class="admin__monitor__item">
    內裝 （英文）：
    <input
      type="text"
      name="inside"
      id="inside"
      value="Yes"
    />
  </div>
  <div class="admin__monitor__item">
    內裝（日文）：
    <input
      type="text"
      name="インテリア"
      id="インテリア"
      value="あり"
    />
  </div>
  <div class="admin__monitor__item">
    用途（中文）：
    <input
      type="text"
      name="用途"
      id="用途"
      value="古蹟"
    />
  </div>
  <div class="admin__monitor__item">
    用途（英文）：
    <input
      type="text"
      name="Utilization"
      id="Utilization"
      value="Monument"
    />
  </div>
  <div class="admin__monitor__item">
    用途（日文）
    <input
      type="text"
      name="用途_jp"
      id="用途_jp"
      value="遺跡"
    />
  </div>
  <input
    type="button"
    name="submit"
    value="送出"
    onclick="newItemBuilding('${districtId}');"
  />
</form>`;
  $("#admin__monitor").append(divContent);
}
function showBuildingItem() {
  $("#admin__monitor").empty();
  var DataRef = firebase.database().ref("building");
  var titleString = `
  <div class="admin__monitor__title">請選擇要加入的城市建築物名內的區域：</div>
  `;
  $("#admin__monitor").append(titleString);
  DataRef.once("value").then(
    (res) => {
      res.forEach((districtSh, buildingIndex) => {
        let districtInfo = districtSh.child("0").val();
        var districtTitleString = `
        <div class="admin__monitor__chooseItem" onclick="showEditBuildingForm('${districtSh.key}','${districtInfo.district_chi}','${districtInfo.district_eng}','${districtInfo.district_jp}')">${districtInfo.district_chi}</div>
        `;
        $("#admin__monitor").append(districtTitleString);
      });
    },
    (rej) => {
      console.log(rej);
    }
  );
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
        alert("伺服器發生錯誤。如果您是管理員，請尋真·管理員協助。 或者 你是黑客 ㄇㄌㄈㄎ！！");
        if (user === "") {
          logout(999);
          $("#admin__content").empty();
          $("#admin__choosePage").empty();
          var divContent = `
    <div class="admin__login">
        <div class="admin__login__title">請先登入</div>
        <div id="singUpRedirect" onclick="googleLoginRedirect()">
            使用google帳號登入
        </div>
    </div>`;
          $("#admin__content").append(divContent);
        }
      });
  } else {
    alert("建立失敗！！！未有填寫全部資料");
  }
  $("#admin__monitor").empty();
}

// const submitBtn = document.querySelector('[data-action="submit"]');
// submitBtn.addEventListener("click", newItemResident);

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
        onclick="showBuildingItem()"
      >
        增加新資料
      </div>
    </div>`;
    $("#admin__choosePage").append(divContent);
    //editDatabase();
  }
}
