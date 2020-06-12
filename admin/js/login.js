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
function logout() {
  firebase
    .auth()
    .signOut()
    .then(
      function () {
        alert("登出成功");
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
