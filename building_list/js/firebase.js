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
        res.forEach((districtSh, buildingIndex) => {
            let districtInfo = districtSh.child("0").val();
            console.log(districtInfo.district_chi, districtSh.key);
            var districtTitleString =
                `<div class="district__image__box" background-image: url("paper.gif"); onClick="chooseDistrict('${districtSh.key}')">
                <div class="district__image__box__content">
                    <img class="district__image__box__image" src="image/${districtSh.key}.jpg">
                    <div class="district__image__box__toptext">查看更多</div>
                    <div class="district__image__box__shadow"></div>
                    <div class="district__image__box__text">${districtInfo.district_chi}</div>
                </div>
                </div>`;
            $('#district__image').append(districtTitleString);
        })
    },
    rej => {
        console.log(rej);
    }
);