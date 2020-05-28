// FIREBASE CONFIGURATION
var firebaseConfig = {
  apiKey: "AIzaSyDlsoAqDJA213Z40hLcSLcDOYuHeMphUWE",
  authDomain: "dp4heat.firebaseapp.com",
  databaseURL: "https://dp4heat.firebaseio.com",
  projectId: "dp4heat",
  storageBucket: "dp4heat.appspot.com",
  messagingSenderId: "75419734917",
  appId: "1:75419734917:web:fc352a3abda9bc74506aec"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

$( document ).ready( function() {

  // FIREBASE TEST
  var ref = db.collection("users").doc("test")
  ref.get().then(function (doc) {
    data = doc.data();
    for (key in data) {
      console.log(key);
    }
  });

  // SEARCH BY FILTERS
  var search_icon = document.getElementById("search_icon");
  search_icon.onclick = function () {
    alert("works");
  };

  // RATING FILTER CONTROL (STARS SIZE IS A BULL SHIT)
  var rating = document.getElementById("rating");
  var r5 = document.getElementById("5stars");
  var r4 = document.getElementById("4stars");
  var r3 = document.getElementById("3stars");
  var r2 = document.getElementById("2stars");
  var r1 = document.getElementById("r1");
  $(rating).change(function () {
    if (r5.selected || r4.selected || r3.selected || r2.selected) {
      rating.style.paddingBottom = "7.5px";
      rating.style.fontSize = "20px";
      rating.style.width = "167.5px";
    }
    if (r1.selected) {
      rating.style.paddingBottom = "2px";
      rating.style.fontSize = "25px";
    }
  });

  // CHANGE CITY INFO ICON
  var info = document.getElementById("info");
  var changeCity = document.getElementById("changeCity");
  $(info).hover(
    function () {
      $(info).addClass("on");
      setTimeout(() => {
        if ($(info).hasClass("on")) changeCity.style.display = "block";
      }, 500);
    },
    function () {
      $(info).removeClass("on");
      changeCity.style.display = "none";
    }
  )

});