
$( document ).ready( function() {


  $('.stars a').on('click', function(){
    $('.stars span, .stars a').removeClass('active');
  
    $(this).addClass('active');
    $('.stars span').addClass('active');
  });
     
  var coll = document.getElementsByClassName("collaps");
  var colll = document.getElementsByClassName("collapsib");
  
  var i;
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
  for (i = 0; i < colll.length; i++) {
    colll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
  $("button").click(function() {
    $("button").removeClass("active");
    $(this).addClass("active");
    
  });
   
  //const collection = db.collection('user_dat');
  var day=10;
var month=5;
var year=2020;
  function search(month,yaer,day) {
    var next = document.getElementById("search");
    next.onclick = function() {
      showCalendar(month, year);
      show(month,year,day);}
  }
  search(month,year,day); 


var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");
console.log(currentMonth, currentYear);

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
  var next = document.getElementById("next");
  next.onclick = function() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);}
}
next();

function previous() {
  var prev = document.getElementById("previous");
  prev.onclick = function() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);}
}
previous();
function jump() {
  selectMonth.onchange = function() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);}
    selectYear.onchange = function() {
      currentYear = parseInt(selectYear.value);
      currentMonth = parseInt(selectMonth.value);
      showCalendar(currentMonth, currentYear);}
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
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

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
                  cell.classList.add("bg-info");
              } // color today's date
              cell.appendChild(cellText);
              row.appendChild(cell);
              if (day===date){
                cell.style.color="white";
                cell.style.fontWeight="bold";
                cell.bgColor = '#43a5fc';
              }
              date++;
          }


      }

      tbl.appendChild(row); // appending each row into calendar body.
  }
}

// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}



  })