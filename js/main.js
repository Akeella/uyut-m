if ($("#call-me-form")[0]) {
  $("#call-me-form")[0].onsubmit = async function (e) {
    e.preventDefault();
    let fd = new FormData($("#call-me-form")[0]);
    $.ajax({
      type: "POST",
      cache: false,
      processData: false,
      contentType: false,
      data: fd,
      url: "/ajax/php/call_me.php",
      success: function (data) {
        if (data) {
          data = JSON.parse(data);
          if (data.success) {
            alert('Ваше сообщение было отправлено');
            window.location.replace("/call-me.html");
          } else {
            alert("Что-то пошло не так, попробуйте снова");
            window.location.replace("/call-me.html");
          }
        }
      },
      error: function () {
        alert("Что-то пошло не так, попробуйте снова");
        window.location.replace("/call-me.html");
      },
    });
  };
};

$('.3d-form').submit(function (e) {
  e.preventDefault();
  let fd = new FormData($('.3d-form')[0]);
  $.ajax({
    type: "POST",
    cache: false,
    processData: false,
    contentType: false,
    data: fd,
    url: "/ajax/php/3d.php",
    success: function (data) {
      console.log(data);
      if (data) {
        data = JSON.parse(data);
        if (data.success) {
          alert('Ваша заявка была отправлена');
          window.location.replace("/besplatnyij-3d-dizajn-proekt.html");
        } else {
          alert("Что-то пошло не так, попробуйте снова");
          window.location.replace("/besplatnyij-3d-dizajn-proekt.html");
        }
      }
    },
    error: function () {
      alert("Что-то пошло не так, попробуйте снова");
      window.location.replace("/besplatnyij-3d-dizajn-proekt.html");
    },
  });
})