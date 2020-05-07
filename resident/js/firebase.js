// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD8rlfI1ia02uVCyn4HigEgKnqSVppm96c",
    authDomain: "buddy-city-6644d.firebaseapp.com",
    databaseURL: "https://buddy-city-6644d.firebaseio.com",
    projectId: "buddy-city-6644d",
    storageBucket: "buddy-city-6644d.appspot.com",
    messagingSenderId: "602566457456",
    appId: "1:602566457456:web:b7339ee8dc4121e7771cb5",
    measurementId: "G-21NGJNE2VH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//Get Data

async function renderResident() {

    const districtArray = [];

    var userDataRef = firebase.database().ref("resident");
    await userDataRef.once("value").then(
        res => {
            var districtBtn;
            res.forEach((characterSh, index) => {
                var character = characterSh.val();
                districtArray.push(character.district_CHI);
                var characterString =
                    `<div target="_blank" class="resident__box" id="${character.district_CHI}" onclick="chooseCharacter(${characterSh.key})">` +
                    `<div class="resident__box__character" id="${character.user_name}">` +
                    `<img class="resident__box__character__image" src="image/${character.face}.png">` +
                    `<div class="resident__box__character__title">${character.user_name}</div>` +
                    `</div>` +
                    `</div>` +
                    `</a>`;
                $('#resident').append(characterString);
            });
            return true;
        },
        rej => {
            console.log(rej);
            return true;
        }
    );

    const districtList = new Set(districtArray);
    console.log('here is the districtList', districtList);
    var districtBtn =
        `<div class="actSortNav__btn" id="all-btn" onClick="sortByDistrict('全部', 'all')">
        <div class="actSortNav__text" id="all-text">
        全部
        </div>
        </div>`;
    $('#sortNav').append(districtBtn);
    districtList.forEach((district_CHI, districtIndex) => {
        console.log(district_CHI)
        districtBtn =
            `<div class="sortNav__btn" id="${districtIndex}-btn" onClick="sortByDistrict('${district_CHI}', '${districtIndex}')">
            <div class="sortNav__text" id="${districtIndex}-text">
            ${district_CHI}
        </div>
        </div>`;
        $('#sortNav').append(districtBtn);
    });
}

renderResident();


var tempClassName = "all";
function sortByDistrict(district_CHI, className) {
    console.log(district_CHI, className, tempClassName);
    document.getElementById(tempClassName + "-btn").className = 'sortNav__btn';
    document.getElementById(tempClassName + "-text").className = 'sortNav__text';
    document.getElementById(className + "-btn").className = 'actSortNav__btn';
    document.getElementById(className + "-text").className = 'actSortNav__text';
    $(".resident__box").fadeOut();
    // for (var i = 0; i < document.getElementsByClassName("resident__box").length; i++) {
    //     //document.getElementsByClassName('resident__box')[i].style.opacity = 0.3;
    //     //document.getElementsByClassName('resident__box')[i].style.pointerEvents = "none";
    //     //$(".resident__box").fadeOut();
    //     //document.getElementsByClassName('resident__box')[i].style.display = "none";
    // }
    if (district_CHI === '全部') {
        var residentBox = document.getElementsByClassName("resident__box");
        $(".resident__box").delay(300).fadeIn("slow");
        // for (var i = 0; i < residentBox.length; i++) {
        //     //residentBox[i].style.display = "inline-flex";
        //     //residentBox[i].style.pointerEvents = "auto";
        //     //residentBox[i].style.opacity = 1;
        // }
    }
    else {
        var residentBox = document.querySelectorAll("#" + district_CHI)
        $('#' + district_CHI).delay(300).fadeIn("slow");
        // for (var i = 0; i < residentBox.length; i++) {
        //     //residentBox[i].style.display = "inline-flex";
        //     // residentBox[i].style.pointerEvents = "auto";
        //     // residentBox[i].style.opacity = 1;
        // }
    }
    tempClassName = className;
}