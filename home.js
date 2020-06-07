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

// GLOBAL VARIABLES

var city = "Daejeon";
var therapists = db.collection("therapists").doc(city);
var tbl;
var sz;

var fSpecialization = "Specialization";
var fPrice = "Max. Price";
var fAgeMin = "0";
var fAgeMax = "100";
var fRating = "1";
var fName = "";

const url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyC8Kum3xeygioNie-92TSmXe7meVU7Ibho&q=";
const params = "&maptype=roadmap&language=en&zoom=";

// FILTERS APPLYING FUNCTION
async function update() {

  tbl = document.getElementById("tbl");
  for(var i = tbl.rows.length - 1; i >= 0; i--) {
      tbl.deleteRow(i);
  }
  sz = 0;

  await therapists.get().then(async function (doc) {
    data = doc.data();

    for (key in data) {

      var f1 = fSpecialization==="Specialization" || fSpecialization===data[key]["info"]["specialization"];
      var f2 = fPrice==="Max. Price" || parseInt(fPrice)>=parseInt(data[key]["description"]["price"]);
      var f3 = parseInt(fAgeMin)<=parseInt(data[key]["info"]["age"]) && parseInt(fAgeMax)>=parseInt(data[key]["info"]["age"]);
      var f4 = parseInt(fRating)<=parseInt(data[key]["info"]["rating"]);
      var f5 = fName==="" || fName===key;

      if (f1 && f2 && f3 && f4 && f5) {
        var r = tbl.insertRow(sz);

        var c = r.insertCell(0);
        $(c).addClass("cell");
        if (sz % 2 === 1) c.style.backgroundColor = "white"; else c.style.backgroundColor = "#e4e4e4";
        c.style.cursor = "pointer";

        var x = parseInt(data[key]["info"]["rating"]);
        var s = "";
        for (var i=1; i<=x; i++) {
          s += "&starf; ";
        }

        // c.innerHTML += "<img src=\"user_avatar.png\" alt=\"avatar\" width=\"130px\" height=\"130px\"" +
        //   "style='position: absolute;'>";

        // c.innerHTML += "<div style='position: absolute; left: 100px'>";
        c.innerHTML += "<b style='font-size: 25px'>" + key + ", " + data[key]["info"]["age"] + "</b>";
        c.innerHTML += "<br>" + data[key]["info"]["specialization"];
        c.innerHTML += "<br>" + data[key]["description"]["price"] + "$ per hour";
        c.innerHTML += "<br>" + data[key]["description"]["district"];
        c.innerHTML += "<br>" + "<b style='font-size: 20px'>" + "" + s + "</b>";
        c.innerHTML += "<br>" + "<a href='register.html' style='color: blue; text-decoration: underline; font-size: 20px'>Register</a>";
        // c.innerHTML += "</div>";

        c.onclick = function () {
          var map = document.getElementById("map");
          if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            this.style.border = "0px";
            map.src = url + "Daejeon" + params + "13";
          }
          else {
            var address = data[key]["address"]["lan"] + "," + data[key]["address"]["lat"];
            map.src = url + address + params + "15";
            $(this).addClass("selected");
            this.style.border = "2px solid blue";
          }
        };

        $(c).hover(
          function () {
            if (!$(this).hasClass("selected")) this.style.border = "1px solid blue"
          },
          function () {
            if (!$(this).hasClass("selected")) this.style.border = "0px";
          }
        );

        sz++;
      }

    }

    if (tbl.rows.length===0) {
      var rr = tbl.insertRow(0);
      var cc = rr.insertCell(0);
      $(cc).addClass("cell");
      cc.style.fontSize = "35px";
      cc.style.height = "450px";
      cc.style.verticalAlign = "center";
      cc.style.alignContent = "center";
      cc.style.textAlign = "center";
      cc.innerHTML = "We are sorry, no therapists match your parameters :(";
    }

  });

  var results = document.getElementById("results");
  results.innerHTML = sz.toString() + " result(s) found in Daejeon";

}


// DOCUMENT LOADED MAIN FUNCTION
$( document ).ready(function() {

  // MAKE THERAPIST LIST FROM FIREBASE WHEN REFRESHING
  update();

  // CHANGE CITY INFO ICON WHEN HOVER
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

  // FILTERS EVENT LISTENERS

  var specialization = document.getElementById("specialization");
  $(specialization).change(function () {
    if (this.value === "Specialization") fSpecialization = "Specialization";
    if (this.value === "Family Therapy") fSpecialization = "Family Therapist";
    if (this.value === "Children Therapy") fSpecialization = "Children Therapist";
    if (this.value === "Stress and Anxiety") fSpecialization = "Stress and Anxiety Therapist";
    if (this.value === "Career") fSpecialization = "Career Therapist";
    update();
  });

  var price = document.getElementById("price");
  $(price).change(function () {
    if (this.value === "Max. Price") fPrice = "Max. Price";
    if (this.value === "25$ per hour") fPrice = "25";
    if (this.value === "50$ per hour") fPrice = "50";
    if (this.value === "75$ per hour") fPrice = "75";
    if (this.value === "100$ per hour") fPrice = "100";
    update();
  });

  var age = document.getElementById("age");
  $(age).change(function () {
    if (this.value === "Age") {
      fAgeMin = "0";
      fAgeMax = "100";
    }
    if (this.value === "< 30 years old") {
      fAgeMin = "0";
      fAgeMax = "29"
    }
    if (this.value === "30-50 years old") {
      fAgeMin = "30";
      fAgeMax = "50"
    }
    if (this.value === "> 50 years old") {
      fAgeMin = "51";
      fAgeMax = "100"
    }
    update();
  });

  var rating = document.getElementById("rating");
  var r5 = document.getElementById("5stars");
  var r4 = document.getElementById("4stars");
  var r3 = document.getElementById("3stars");
  var r2 = document.getElementById("2stars");
  var r1 = document.getElementById("r1");
  $(rating).change(function () {
    if (this.value === "Min. Rating") fRating = "1";
    if (this.value.length === 9) fRating = "5";
    if (this.value.length === 7) fRating = "4";
    if (this.value.length === 5) fRating = "3";
    if (this.value.length === 3) fRating = "2";
    update();
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

  // SEARCH BY NAME
  var search_icon = document.getElementById("search_icon");
  search_icon.onclick = function () {
    fName = document.getElementById("search_input").value;
    update();
  };


});