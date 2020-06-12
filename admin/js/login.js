var provider = new firebase.auth.GoogleAuthProvider();
var token = "";
var user = "";
function googleLoginRedirect() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // 可以獲得 Google 提供 token，token可透過 Google API 獲得其他數據。
      token = result.credential.accessToken;
      user = result.user;
    });
}
function logout(eventCode = 0) {
  firebase
    .auth()
    .signOut()
    .then(
      function () {
        if (eventCode === 0) {
          alert("登出成功");
        } else if (eventCode === 1) {
          alert("您已閒置超過5秒，系統自動登出");
        }
        user = "";
        token = "";
      },
      function (error) {
        alert("登出失敗");
      }
    );
}
firebase.auth().onAuthStateChanged(async function (user) {
  $("#admin__content").empty();
  $("#admin__choosePage").empty();
  $("#admin__monitor").empty();
  var userIsAdmin = "";
  if (user) {
    var UserRef = firebase.database().ref("/user/" + user.uid + "/admin");
    await UserRef.once("value").then(
      (res) => {
        userIsAdmin = res.val();
        return true;
      },
      (rej) => {
        console.log(rej);
        return true;
      }
    );
    if (userIsAdmin === true) {
      alert("歡迎管理員大大");
      var divContent = `
    <div class="admin__content__title">歡迎管理員大大</div>
    <div class="admin__content__logout" onclick="logout()">
        <div class="admin__content__logout__btn">登出系統</div>
    </div>
    <div class="admin__content__text">
        請選擇您想管理之頁面：
    </div>
    <div class="admin__content__chooseItem" onclick="choosePage(1)">
        居民名冊
    </div>
    <div class="admin__content__chooseItem" onclick="choosePage(2)">
        城市建築物名冊
    </div>
    `;
      autoLogout();
    } else {
      alert("很抱歉，您不是管理員，請您找真·管理員尋求協助");
      logout();
    }
  } else {
    var divContent = `
    <div class="admin__login">
        <div class="admin__login__title">請先登入</div>
        <div id="singUpRedirect" onclick="googleLoginRedirect()">
            使用google註冊
        </div>
    </div>`;
  }
  $("#admin__content").append(divContent);
});

console.log(user);
function autoLogout() {
  console.log("autoLogout");
  var oTimerId;
  function Timeout() {
    logout(1);
  }
  function ReCalculate() {
    clearTimeout(oTimerId);
    if (user != "") {
      oTimerId = setTimeout(function () {
        Timeout(1);
      }, 1 * 5 * 1000);
    }
  }
  document.onmousedown = ReCalculate;
  document.onmousemove = ReCalculate;
  ReCalculate();
}
autoLogout();