
$( document ).ready( function() {

  
  

  var db = firebase.firestore();
  var appointments = db.collection('appointments');

  var newAppCell = document.getElementById('newApp');
  
  var modal = document.getElementById("myModal");

  var modal_body = document.getElementsByClassName('modal-body')[0];

  var spanClose = document.getElementsByClassName("close")[0];
  
  var confirm_button = document.getElementById('confirm_button');

  var delete_button = document.getElementById('delete_button');


  appointments.doc('Mia->Karen').get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      newAppCell.style = "";
      newAppCell.className = "yourapt";
      newAppCell.appendChild(document.createTextNode('Your Appointment'));
      $('.before_confirm').hide();
    } else {
      $('.after_confirm').hide();
    }


    // ------------------------------------------------------------

    newAppCell.onclick = function(){
      modal.style.display = "block";
      newAppCell.style = "border: 3px dotted black;";
     }
  
    spanClose.onclick = function(){
      modal.style.display = "none";
      newAppCell.style = ""
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        newAppCell.style = ""
      }
    }
  
    $('#notify_checkbox').click(function(){
      if($(this).is(":checked")){
        document.getElementById('notification_time').removeAttribute('disabled');
      }
      else{
        document.getElementById('notification_time').setAttribute('disabled', 'disabled');
      }
    });
  
    
  
  
    confirm_button.onclick = function() {
      
      var notifTime = $("#notification_time option:selected").val();
  
      appointments.doc('Mia->Karen').set({
        accountName: 'Mia',
        therapistName: 'Karen Johnson',
        date: '2020/06/10',
        time: '13:00',
        notify: true,
        notificationTime: notifTime
      }).then(function(){
        modal.style.display = "none";
        newAppCell.style = "";
        newAppCell.className = "yourapt";
        newAppCell.appendChild(document.createTextNode('Your Appointment'));
        $('.before_confirm').hide();
        $('.after_confirm').show();

        $('#thanks_message').fadeIn(1000).delay(1000).fadeOut(3000);

      });
      
      
    }
  
    delete_button.onclick = function() {
      
      appointments.doc('Mia->Karen').delete().then(function(){
        modal.style.display = "none";
        newAppCell.style = "";
        newAppCell.className = "free";
        newAppCell.innerHTML = "";
        
        $('.before_confirm').show();
        $('.after_confirm').hide();

        $('#delete_message').fadeIn(1000).delay(1000).fadeOut(3000);
      });
      
      
    }

    // ------------------------------------------------------------------------
    
  }
  );


  

  
  });