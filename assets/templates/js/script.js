function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function popup() {
  if (getCookie("sales-popup") == "true") {
      $("#sales-popup").hide();
      $(".sales-popup__isOpen").hide();
  }

  if (getCookie("sales-popup") == undefined) {
      $("#sales-popup").show();
      $("body").prepend(`<div class="sales-popup__isOpen"></div>`);

      startTimer();

      $(".sales-popup__close").click(function () {
          $("#sales-popup").hide();
          $(".sales-popup__isOpen").hide();
          setTimeout(() => {
              popup();
          }, 180000);
      });
  }
}

function startTimer() {
  const addMinutes = 30;
  const date = new Date();

  const deadline = +getCookie("site-visit-time") + addMinutes * 60000;

  console.log(date.getTime());
  console.log(date.getUTCDate());
  console.log(+getCookie("site-visit-time"));

  let timerId = null;

  function countdownTimer() {
      const diff = deadline - new Date();
      if (diff <= 0) {
          clearInterval(timerId);
          $("#sales-popup").hide();
          $(".sales-popup__isOpen").hide();

          const date = new Date();
          date.setFullDay(date.getFullDay() + 1);
          document.cookie = `sales-popup=true;Expires=${date}`;
      }

      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

      $days.textContent = days < 10 ? "0" + days : days;
      $hours.textContent = hours < 10 ? "0" + hours : hours;
      $minutes.textContent = minutes < 10 ? "0" + minutes : minutes;
      $seconds.textContent = seconds < 10 ? "0" + seconds : seconds;
  }

  const $days = document.querySelector(".timer__days");
  const $hours = document.querySelector(".timer__hours");
  const $minutes = document.querySelector(".timer__minutes");
  const $seconds = document.querySelector(".timer__seconds");

  countdownTimer();

  timerId = setInterval(countdownTimer, 1000);
}

function checkCookies() {
  if (getCookie("cookie-accept") == "true") {
      $("#cookieNotification").hide();
  }

  if (getCookie("cookie-accept") == undefined) {
      $("#cookie-accept-btn").click(function () {
          $("#cookieNotification").hide();
          const date = new Date();
          date.setFullYear(date.getFullYear() + 1);
          document.cookie = `cookie-accept=true;Expires=${date};path=/`;
      });
  }

  if (!window.location.href.toString().includes("3d")) {
      if (getCookie("site-visit") == "true") {
          const date = new Date();
          if (date.getTime() > getCookie("visit-timeout")) {
              popup();
              document.cookie = `visit-timeout=${date.getTime() + 3 * 60000}`;
          }
      }

      if (getCookie("site-visit") == undefined) {
          const date = new Date();
          let timeoutMinutes = 1;

          document.cookie = `site-visit=true`;
          document.cookie = `site-visit-time=${date.getTime()}`;
          document.cookie = `visit-timeout=${date.getTime() + timeoutMinutes * 60000}`;
      }
  }
}

window.onload = function () {

  $("#header").load(
      "/inc/header.html",
      function (response, status, xhr) {
          $(".main_mnu_button").click(function () {
              $("#burger-icon").toggleClass("fa-bars fa-times");
              $("nav  ul").slideToggle();
          });
      }
  );

  $("#footer").load("/inc/footer.html", function (response, status, xhr) {
      $("#sales-popup").hide();

      checkCookies();

      const date = new Date();
      $(
          "#copyright-text"
      )[0].innerText = `© Copyright 2012 - ${date.getFullYear()}, Все права защищены`;

      const sales_popup_form = document.getElementById("sales-popup-form");
      sales_popup_form.onsubmit = async function (e) {
          e.preventDefault();

          $("#sales-popup").hide();
          $(".sales-popup__isOpen").hide();

          const date = new Date();
          date.setDate(date.getDate() + 7);
          document.cookie = `sales-popup=true;Expires=${date}`;

          let response = await fetch("/ajax/php/popup.php", {
              method: "POST",
              body: new FormData(sales_popup_form),
          });

          let result = await response.json();
          console.log(result);
      };
  });

  $(".want-custom").click(function () {
      var $title = $(this).parent().parent().find(".want-custon-title");
      if (!$title.length) {
          $(this)
              .parent()
              .parent()
              .append(
                  '<span class="want-custon-title">' +
                      $(this).attr("title") +
                      "</span>"
              );
      } else {
          $title.remove();
      }
  });
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
                  alert("Успешно! Скоро мы вам перезвоним");
                  window.location.replace("/call-me.html");
              },
              error: function () {
                  alert("Что-то пошло не так, попробуйте снова");
                  window.location.replace("/call-me.html");
              },
          });
          return false;
      };
  };
};