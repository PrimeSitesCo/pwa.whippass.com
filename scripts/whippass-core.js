/* Auto-complete*/

/* SetGet biscuits */
function set_creamer(biscuit, cream) {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem(biscuit, cream);
  }
}
function get_creamer(biscuit) {
  var cream = "";
  if (typeof(Storage) !== "undefined") {
    cream = localStorage.getItem(biscuit);
  }
  return cream;
}
/* Control Standard/Advanced forms */
$(document).ready(function() {  
  if (get_creamer("whip_form_hide") == "form-stn-pwdhash") {
    $('.form-stn-pwdhash').hide();
    $("#form-cam-pwdhash").prop("checked", true);
  } else {
    $('.form-cam-pwdhash').hide();
  }
  $('#form-cam-pwdhash').click(function() {
    $('.form-stn-pwdhash').slideUp('slow');  
    $('.form-cam-pwdhash').slideDown('slow');  
    $(".camsyncDomain").val($(".syncDomain").val());
    $(".camsyncWhip").val($(".syncWhip").val());
    set_creamer("whip_form_hide", "form-stn-pwdhash");
  });  
  $('#form-stn-pwdhash').click(function() {
    $('.form-cam-pwdhash').slideUp('slow');  
    $('.form-stn-pwdhash').slideDown('slow');  
    $(".syncDomain").val($(".camsyncDomain").val());
    $(".syncWhip").val($(".camsyncWhip").val());
    set_creamer("whip_form_hide", "form-cam-pwdhash");
  });   
});  

/* Post values to db */
$(document).ready(function(){
  $('#cam_hashedPassword').focus(function(){
	var whippedUserElem = document.getElementById("whipped_user");
    if (whippedUserElem && whippedUserElem.value !== '') {
      var userID = $('#whipID').val();
      var advanced_vars = ["#salt", "#iterations"];
      for (index = 0; index < advanced_vars.length; ++index) {
       var thisvar = (advanced_vars[index])
        var metaValue= $(thisvar).val();
        var metaKey=  $(thisvar).attr('id');
        $.post("whippass-meta-update.php",{
          user : userID,
          metavalue : metaValue,
          metakey : metaKey,
        },
        function(result){
          //console.log("Data Updated");
        });
      }
	}
  });
});
$(document).ready(function()  {
  $('input[title]').qtip({
    show: {
			event: 'focus',
			solo: true,
         },
	hide: 'blur',
    position: {
      my: 'bottom left',  
      at: 'top right',
      viewport: $(window),
    },
    style: {
      classes: 'qtip-bootstrap whip-tip',
      width: 250,
	  tip: {
            width: 8,
            height: 16
        },
    }
  });
});
$(document).ready(function() {
  var enableTips = true;
  if (get_creamer("whip_tips_enabled") == "false") { enableTips = false; }
  $("#whiptips").prop('checked', enableTips);
  $('input[title]').qtip('disable', !enableTips);

  $('#whiptips').change(function () {
    var enableTips = (($('#whiptips').prop('checked')) ? "true" : "false");
    $('input[title]').qtip('disable', ((enableTips == "true") ? false : true));
    set_creamer("whip_tips_enabled", enableTips);
  });
});
