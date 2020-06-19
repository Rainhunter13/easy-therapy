  $( document ).ready( function() {
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
var day=10; 
var month=5;
var year=2020; 
var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");
console.log(currentMonth, currentYear);

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var monthAndYear = document.getElementById("monthAndYear");
function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
function show(month, year,day) {

  let firstDay = (new Date(year, month)).getDay();

  var tbl = document.getElementById("calendar-body"); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
      // creates a table row
      let row = document.createElement("tr");

      //creating individual cells, filing them up with data.
      for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
              var cell = document.createElement("td");
              var cellText = document.createTextNode("");
              cell.appendChild(cellText);
              row.appendChild(cell);
          }
          else if (date > daysInMonth(month, year)) {
              break;
          }

          else {
              var cell = document.createElement("td");
              var cellText = document.createTextNode(date);
              if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                  //cell.classList.add("bg-info");
              } // color today's date
              cell.appendChild(cellText);
              row.appendChild(cell);
              if (day===date){
                cell.style.color="white";
                cell.style.border="3px";
                cell.style.fontWeight="bold";
                cell.bgColor = '#43a5fc';
                cell.innerHTML="10 " + ' <i class="fas fa-clock"></i>';
              }
              date++;
          }


      }

      tbl.appendChild(row); // appending each row into calendar body.
  }
}
var db = firebase.firestore();
  // Your web app's Firebase configuration
  var appointments = db.collection('appointments');
  //console.log(appointments);
    appointments.doc('Mia->Karen').get().then(async function (doc) {
        if (!doc.exists){
            document.getElementById("mytable").deleteRow(0);
            table();
            show(month,year,0);
        }
        else{
        show(month,year,day);
        data = doc.data();
        var name=data["accountName"];
        var therapist=data["therapistName"];
        var date=data["date"] ;
        var nottime=data["notificationTime"];
        var time=data["time"];
        var notify=data["notify"];
        document.getElementById("therapist").innerHTML=therapist;
        document.getElementById("date").innerHTML=date;
        document.getElementById("time").innerHTML=time;
        }
  });
  function table(){
    var myTable = document.getElementById("mytable");
    var numRows = myTable.rows.length;
     if(numRows===0){
      var newRow = myTable.insertRow(numRows);
      var newCell1 = newRow.insertCell(0);
      var newCell2 = newRow.insertCell(1);
      var newCell3 = newRow.insertCell(2);
      newCell2.innerHTML="No upcoming visits";
      }}
  table();

    function myFunction() {
      var modal = document.getElementById('try');
      modal.onclick= function() {
      var txt;
      var r = confirm("Are you sure to delete your appointment?");
      if (r == true) {
        show(month,year,0);
        $(this).closest('tr').remove();
        table();
        appointments.doc('Mia->Karen').delete();
      } else {
      }
    }                                 
  }
  myFunction();

  function next() {
    var next = document.getElementById("next");
    next.onclick = function() {
      currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
      currentMonth = (currentMonth + 1) % 12;
      appointments.doc('Mia->Karen').get().then(async function (doc) {
        if (doc.exists){
      if (currentMonth===5 && currentYear===2020)
      {show(month,year,day);
      }
      else { showCalendar(currentMonth, currentYear);}}
      else { showCalendar(currentMonth, currentYear);}
    })
     
    }
  }
  next();
  
  function previous() {
    var prev = document.getElementById("previous");
    prev.onclick = function() {
      currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
      currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
      appointments.doc('Mia->Karen').get().then(async function (doc) {
        if (doc.exists){
      if (currentMonth===5 && currentYear===2020)
      {show(month,year,day);
      }
      else { showCalendar(currentMonth, currentYear);}}
      else { showCalendar(currentMonth, currentYear);}
    })
     }
  }
  previous();
  
function jump() {
  selectMonth.onchange = function() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    appointments.doc('Mia->Karen').get().then(async function (doc) {
      if (doc.exists){
    if (currentMonth===5 && currentYear===2020)
    {show(month,year,day);
    }
    else { showCalendar(currentMonth, currentYear);}}
    else { showCalendar(currentMonth, currentYear);}
  })}
    selectYear.onchange = function() {
      currentYear = parseInt(selectYear.value);
      currentMonth = parseInt(selectMonth.value);
      appointments.doc('Mia->Karen').get().then(async function (doc) {
        if (doc.exists){
      if (currentMonth===5 && currentYear===2020)
      {show(month,year,day);
      }
      else { showCalendar(currentMonth, currentYear);}}
      else { showCalendar(currentMonth, currentYear);}
    })
    }
}
jump();
  function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    var tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {
                var cell = document.createElement("td");
                var cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

  })