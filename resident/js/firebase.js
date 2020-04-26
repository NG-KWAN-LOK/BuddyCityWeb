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
var userDataRef = firebase.database().ref("resident");
userDataRef.once("value").then(
    res => {
        res.forEach((characterSh, index) => {
            var character = characterSh.val();
            var characterString =
                `<div target="_blank" class="resident__box" id="characterId=${characterSh.key}" onclick="chooseCharacter(${characterSh.key})">` +
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