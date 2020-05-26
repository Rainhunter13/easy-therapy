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
  var ref = db.collection("users").doc("test");
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

});