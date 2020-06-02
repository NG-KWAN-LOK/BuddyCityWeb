function closeLayer(x) {
    x.classList.toggle("change");
    residentPopUpLayer.style.display = "none";
    window.history.pushState({}, 0, 'index.html');
    document.title = '居民名冊丨Buddy-INFO Buddy市指南)';
}

function chooseCharacter(characterId) {
    residentPopUpLayer.style.display = "flex";
    var userDataRef = firebase.database().ref("/resident/" + characterId);
    console.log(characterId);
    userDataRef.once("value").then(
        res => {
            let characteInfo = res.val();
            $('#data_username_title').html(characteInfo.user_name);
            $('#data_face_img').attr("src", `image/${characteInfo.face}1.png`);
            $('#data_username').html(characteInfo.user_name);
            $('#data_nickname').html(characteInfo.nickname_chi);
            $('#data_participate_year').html(characteInfo.participate_year);
            $('#data_address').html(characteInfo.address_CHI);
            $('#data_project').html(characteInfo.project_CHI);
            $('#data_address_map').attr("src", `../map.html?worldname=world&mapname=flat&zoom=6&x=${characteInfo.x}&y=${characteInfo.y}&z=${characteInfo.z}`);
            $('#data_address_link').attr("href", `../map.html?worldname=world&mapname=flat&zoom=6&x=${characteInfo.x}&y=${characteInfo.y}&z=${characteInfo.z}`);
            window.history.pushState({}, 0, '?characterId=' + characterId);
            document.title = `${characteInfo.user_name}` + `丨居民名冊丨Buddy-INFO Buddy市指南)`;
        },
        rej => {

        }
    );
}

function getURL() {
    let searchParams = new URLSearchParams(window.location.search);
    let characterId = searchParams.get('characterId');
    if (characterId != null) {
        chooseCharacter(characterId);
    }
    console.log("URL" + characterId);
}

$(document).ready(function () {
    getURL();
});