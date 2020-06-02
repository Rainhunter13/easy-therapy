

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
var db = firebase.firestore();
  // Your web app's Firebase configuration
  var appointments = db.collection('appointments');
  //console.log(appointments);
    appointments.doc('Mia->Karen').get().then(async function (doc) {
        if (!doc.exists){
            document.getElementById("mytable").deleteRow(0);
            table();
        }
        else{
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
  $('body').on('click', 'input.deleteDep', function() {   
    $(this).closest('tr').remove();
    alert( "You have canceled the tharapy session" );
    appointments.doc('Mia->Karen').delete();
    table();
                                              })
  })