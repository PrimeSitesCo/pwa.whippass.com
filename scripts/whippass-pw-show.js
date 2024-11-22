/* Control password show/hide */
$("body").on('click', '.toggle-password', function() {
  $(".toggle-password").toggleClass("fa-eye fa-eye-slash");
  var pwd_input = $("#sitePassword");
  var cam_pwd_input = $("#cam_sitePassword");
  if (pwd_input.attr("type") === "password" || cam_pwd_input.attr("type") === "password") {
    pwd_input.attr("type", "text");
    cam_pwd_input.attr("type", "text");
    $("#pwd_show_hide").text("hide");
    $("#cam_pwd_show_hide").text("hide");
  } else {
    pwd_input.attr("type", "password");
    cam_pwd_input.attr("type", "password");
    $("#pwd_show_hide").text("show");
    $("#cam_pwd_show_hide").text("show");
  }
});