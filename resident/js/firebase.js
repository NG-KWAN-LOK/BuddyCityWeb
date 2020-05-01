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

var userDataRef = firebase.database().ref("building");
userDataRef.once("value").then(
    res => {
        var districtBtn =
            `<div class="actSortNav__btn" id="all-btn" onClick="sortByDistrict('全部', 'all')">
        <div class="actSortNav__text" id="all-text">
        全部
        </div>
        </div>`;
        $('#sortNav').append(districtBtn);
        res.forEach((districtSh, buildingIndex) => {
            let districtInfo = districtSh.child("0").val();
            console.log(districtInfo.district_chi, districtSh.key);
            districtBtn =
                `<div class="sortNav__btn" id="${districtSh.key}-btn" onClick="sortByDistrict('${districtInfo.district_chi}', '${districtSh.key}')">
                    <div class="sortNav__text" id="${districtSh.key}-text">
                    ${districtInfo.district_chi}
                </div>
                </div>`;
            $('#sortNav').append(districtBtn);
        })
        var districtBtn =
            `<div class="sortNav__btn" id="park-btn" onClick="sortByDistrict('公園', 'park')">
        <div class="sortNav__text" id="park-text">
        公園
        </div>
        </div>`;
        $('#sortNav').append(districtBtn);
    },
    rej => {
        console.log(rej);
    }
);

var userDataRef = firebase.database().ref("resident");
userDataRef.once("value").then(
    res => {
        var districtBtn;
        res.forEach((characterSh, index) => {
            var character = characterSh.val();
            var characterString =
                `<div target="_blank" class="resident__box" id="${character.district_CHI}" onclick="chooseCharacter(${characterSh.key})">` +
                `<div class="resident__box__character" id="${character.user_name}">` +
                `<img class="resident__box__character__image" src="image/${character.face}.png">` +
                `<div class="resident__box__character__title">${character.user_name}</div>` +
                `</div>` +
                `</div>` +
                `</a>`;
            $('#resident').append(characterString);
        })
    },
    rej => {
        console.log(rej);
    }
);

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

/*function sortByDistrict(district, className) {
    console.log(district, className, tempClassName);
    $("#resident").empty();
    document.getElementById(tempClassName + "-btn").className = 'sortNav__btn';
    document.getElementById(tempClassName + "-text").className = 'sortNav__text';
    document.getElementById(className + "-btn").className = 'actSortNav__btn';
    document.getElementById(className + "-text").className = 'actSortNav__text';
    var userDataRef = firebase.database().ref("resident");
    userDataRef.once("value").then(
        res => {
            res.forEach((characterSh, index) => {
                var character = characterSh.val();
                if (district === '全部') {
                    var characterString =
                        `<div target="_blank" class="resident__box" id="characterId=${characterSh.key}" onclick="chooseCharacter(${characterSh.key})">` +
                        `<div class="resident__box__character" id="${character.user_name}">` +
                        `<img class="resident__box__character__image" src="image/${character.face}.png">` +
                        `<div class="resident__box__character__title">${character.user_name}</div>` +
                        `</div>` +
                        `</div>` +
                        `</a>`;
                    $('#resident').append(characterString);
                }
                else if (character.district_CHI === district) {
                    var characterString =
                        `<div target="_blank" class="resident__box" id="characterId=${characterSh.key}" onclick="chooseCharacter(${characterSh.key})">` +
                        `<div class="resident__box__character" id="${character.user_name}">` +
                        `<img class="resident__box__character__image" src="image/${character.face}.png">` +
                        `<div class="resident__box__character__title">${character.user_name}</div>` +
                        `</div>` +
                        `</div>` +
                        `</a>`;
                    $('#resident').append(characterString);
                }
            })
        },
        rej => {
            console.log(rej);
        }
    );
    tempClassName = className;
}*/