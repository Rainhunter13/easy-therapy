const firebaseConfig = {
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

$( document ).ready(function() {

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
  );

  // MAKE THERAPIST LIST TABLE FROM FIREBASE
  var city = "Daejeon";
  var therapists = db.collection("therapists").doc(city);

  var tbl = document.getElementById("tbl");
  var sz = 0;

  (async () => {

    await therapists.get().then(async function (doc) {
      data = doc.data();

      for (key in data) {


        var r = tbl.insertRow(sz);
        var c = r.insertCell(0);
        $(c).addClass("cell");
        if (sz%2===1) c.style.backgroundColor = "white";
        c.style.cursor = "pointer";

        c.innerHTML += "<b style='font-size: 20px'>"+key + ", " + data[key]["info"]["age"] +"</b>";
        c.innerHTML += "<br>" + data[key]["info"]["specialization"];
        c.innerHTML += "<br>" + data[key]["description"]["price"] + "$ per hour";
        c.innerHTML += "<br>" + data[key]["description"]["district"];

        c.onclick = function () {
          alert("clicked");
        };

        sz++;


        // database filling (fake values)
        // var sp = ["Gung-Dong", "Dunsan-Dong", "Eoeun-Dong", "Doryong-Dong", "Daehwa-Dong", "Samseong-Dong"];
        // data[key]["description"]["district"] = sp[Math.floor(Math.random()*6)];
        // therapists.update({
        //   [key]: data[key]
        // })

      }

    });

    var note = document.getElementById("note");
    note.innerHTML = sz.toString() + note.innerHTML;






  })();

});