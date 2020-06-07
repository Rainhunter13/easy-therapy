// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

 $( document ).ready(function() {
var family = document.getElementById("family");
var children = document.getElementById("children");
var stress = document.getElementById("stress");
var career = document.getElementById("career");
var experience = document.getElementById("experience");
var insta = document.getElementById("insta");
var facebook = document.getElementById("facebook");
var twitter = document.getElementById("twitter");
var telegram = document.getElementById("telegram");
var whatsapp = document.getElementById("whatsapp");
var kakaotalk = document.getElementById("kakaotalk");
var vimeo = document.getElementById("vimeo");
var share = document.getElementById("share");
var preview = document.getElementById("preview");

function bindEvents() {
  preview.onclick = function () {
  };
}
bindEvents();

$("#dialog").dialog({ modal: true, autoOpen: false });

$("#preview").click(function () {
  var radioValue = $("input[name='therapist']:checked").val();
  $("#dialog").html(
    "<a>Hello, I am Mia.</a>" +
      "<p> I would like to share my experience in HELP therapy center. " +
      "<a>I used the services of </a>" +
      radioValue +
      "<p></p>" +
      $("#experience").val()
  );
  $("#dialog").dialog("open");
});

$("img").click(function () {
  $("img").css("border", "none");
  // this border from other  image
  $(this).css("border", "5px solid grey");
  // add border to clicked image
});

$("#experience").on("keydown", function (e) {
  //var words = this.value.match(/\S+/g).length;
  var words = $.trim(this.value).length ? this.value.match(/\S+/g).length : 0;
  $("#display_count").text(words);
  if (words == 0) {
    $("#discount").text(0);
  } else if (words < 50) {
    $("#discount").text(10);
  } else if (words < 100) {
    $("#discount").text(15);
  } else if (words < 150) {
    $("#discount").text(20);
  } else {
    $("#discount").text(25);
  }
});

family.onclick = function () {
  family.checked = true;
  children.checked = false;
  stress.checked = false;
  career.checked = false;
};

$("#dialog2").dialog({ modal: true, autoOpen: false });

$("#share").click(function () {
  $("#dialog2").html(
    "<a> Congratulations!</a>" +
      "<p>You shared your experience." +
      "<p> Your promocode : AH9F23MP </p>"
  );
  $("#dialog2").dialog("open");
});

});
