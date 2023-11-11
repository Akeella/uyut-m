window.onload = function () {
   $(".row-eq-height").each(function () {
      var id = 0;
      var max_heights = [];
      $(this)
         .find(".col-md-4")
         .each(function () {
            if (!max_heights[Math.floor(id / 3)])
               max_heights[Math.floor(id / 3)] = 0;
            if ($(this).height() > max_heights[Math.floor(id / 3)])
               max_heights[Math.floor(id / 3)] = $(this).height();
            console.log(
               Math.floor(id / 3) +
               " " +
               $(this).height() +
               " " +
               max_heights[Math.floor(id / 3)]
            );
            id++;
         });
      id = 0;
      $(this)
         .find(".col-md-4")
         .each(function () {
            $(this).css("height", max_heights[Math.floor(id / 3)] + "px");
            id++;
         });
      for (var i = 0; i < max_heights.length; i++)
         console.log(max_heights[i]);
   });
};

$(document).ready(function () {

   $(".phonemask").mask("+7(999)999-99-99");

   function abc(n) {
      return (n + "")
         .split("")
         .reverse()
         .join("")
         .replace(/(\d{3})/g, "$1 ")
         .split("")
         .reverse()
         .join("")
         .replace(/^ /, "");
   }

   $(".opener").on("click", function () {
      $(this).parent().toggleClass("open");
      return false;
   });

   $("input.amount").on("change paste keyup", function () {
      let base_price = $(this)
         .parents(".price-collapse-wrap")
         .find(".base-price")
         .html()
         .replace(" ", "");
      let $end_price = $(this)
         .parents(".price-collapse-wrap")
         .find(".end-price");
      let all = base_price * $(this).val();
      $end_price.html(abc(all));
   });
});

$(function () {
   //SVG Fallback
   // if(!Modernizr.svg) {
   //     $("img[src*='svg']").attr("src", function() {
   //         return $(this).attr("src").replace(".svg", ".png");
   //     });
   // };
   if ($("#filter-wrapper")) {
      $("#filter-wrapper").mixItUp({});
   }

   $(".popup-form").animated("bounceInDown", "fadeInDown");

   $(".accordeon dd")
      .hide()
      .prev()
      .click(function () {
         $(this)
            .parents(".accordeon")
            .find("dd")
            .not(this)
            .slideUp()
            .prev()
            .removeClass("active");
         $(this)
            .next()
            .not(":visible")
            .slideDown()
            .prev()
            .addClass("active");
      });

   $(".tab-content").not(":first").addClass("hiden");
   $(".tab:not(a)")
      .click(function () {
         $(".tab")
            .removeClass("active")
            .eq($(this).index())
            .addClass("active");
         $(".tab-content")
            .addClass("hiden")
            .eq($(this).index())
            .removeClass("hiden");
      })
      .eq(0)
      .addClass("active");

   $(".popup-gallery").magnificPopup({
      delegate: "a",
      type: "image",
      tLoading: "Загрузка изображения #%curr%...",
      mainClass: "mfp-fade mfp-img-mobile",
      gallery: {
         enabled: true,
         navigateByImgClick: true,
         preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
      },
      image: {
         tError: '<a href="%url%">Изображение #%curr%</a> не загружено.',
         titleSrc: function (item) {
            return "";
         },
      },
   });

   var top_show = 150; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
   var delay = 1000; // Задержка прокрутки
   $(document).ready(function () {
      $(window).scroll(function () {
         // При прокрутке попадаем в эту функцию
         /* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
         if ($(this).scrollTop() > top_show) $("#top").fadeIn();
         else $("#top").fadeOut();
      });
      $("#top").click(function () {
         // При клике по кнопке "Наверх" попадаем в эту функцию
         /* Плавная прокрутка наверх */
         $("body, html").animate(
            {
               scrollTop: 0,
            },
            delay
         );
      });
   });

   $(".popup-gallery2").magnificPopup({
      delegate: "a",
      type: "image",
      tLoading: "Загрузка изображения #%curr%...",
      mainClass: "mfp-fade mfp-img-mobile",
      gallery: {
         enabled: true,
         navigateByImgClick: true,
         preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
      },
      image: {
         tError: '<a href="%url%">Изображение #%curr%</a> не загружено.',
         titleSrc: function (item) {
            return "";
         },
      },
   });

   $(".popup-with-form").magnificPopup({
      type: "inline",
      preloader: false,
      focus: "#name",
      mainClass: "mfp-fade",
      // When elemened is focused, some mobile browsers in some cases zoom in
      // It looks not nice, so we disable it:
      callbacks: {
         beforeOpen: function () {
            if ($(window).width() < 700) {
               this.st.focus = false;
            } else {
               this.st.focus = "#name";
            }
         },
      },
   });

   $(".popup").magnificPopup({
      type: "image",
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: "mfp-fade mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
      image: {
         verticalFit: true,
      },
      zoom: {
         enabled: true,
         duration: 300, // don't foget to change the duration also in CSS
      },
   });

   $("#top_viz,.ask, .ask + .darken").click(function () {
      if ($(this).hasClass("ask")) {
         if (!$(this).hasClass("toggled")) $(".ask").toggleClass("toggled");
      } else $(".ask").toggleClass("toggled");
   });

   //Каруселька
   //Документация: http://owlgraphic.com/owlcarousel/
   $(".four-carousel").owlCarousel({
      loop: true,
      margin: 20,
      autoplay: true,
      nav: true,
      navText: [
         '<span><i class="fa fa-angle-left" aria-hidden="true"></i></span>',
         '<span><i class="fa fa-angle-right" aria-hidden="true"></i></span>',
      ],
      autoplayTimeout: 6000,
      pagination: true,
      responsive: {
         0: {
            items: 1,
         },
         600: {
            items: 2,
         },
         800: {
            items: 3,
         },
         1000: {
            items: 4,
         },
      },
   });

   //Каруселька
   //Документация: http://owlgraphic.com/owlcarousel/
   $(".owl-carousel2").owlCarousel({
      loop: true,
      autoplay: true,
      margin: 20,
      nav: true,
      center: true,
      navText: [
         '<span><i class="fa fa-angle-left" aria-hidden="true"></i></span>',
         '<span><i class="fa fa-angle-right" aria-hidden="true"></i></span>',
      ],
      autoplayTimeout: 6000,
      pagination: true,
      responsive: {
         0: {
            items: 1,
         },
         600: {
            items: 2,
         },
         1000: {
            items: 3,
         },
      },
   });

   //Каруселька
   //Документация: http://owlgraphic.com/owlcarousel/
   $(".owl-carousel3").owlCarousel({
      loop: true,
      margin: 10,
      autoplay: true,
      nav: true,
      navText: [
         '<span><i class="fa fa-angle-left" aria-hidden="true"></i></span>',
         '<span><i class="fa fa-angle-right" aria-hidden="true"></i></span>',
      ],
      autoplayTimeout: 6000,
      pagination: true,
      responsive: {
         0: {
            items: 1,
         },
         600: {
            items: 1,
         },
         1000: {
            items: 1,
         },
      },
   });

   try {
      $(".slider-for").slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: false,
         fade: true,
         asNavFor: ".slider-nav",
      });
      $(".slider-nav").slick({
         slidesToShow: 3,
         asNavFor: ".slider-for",
         prevArrow: $(".slider .next"),
         nextArrow: $(".slider .prev"),
         focusOnSelect: true,
         vertical: true,
         verticalSwiping: true,
      });
   } catch (e) { }
   //Кнопка "Наверх"
   //Документация:
   //http://api.jquery.com/scrolltop/
   //http://api.jquery.com/animate/
   $("#top").click(function () {
      $("body, html").animate(
         {
            scrollTop: 0,
         },
         800
      );
      return false;
   });

   //E-mail Ajax Send
   //Documentation & Example: https://github.com/agragregra/uniMail
   $(".formss:not(.3d-form)").submit(function () {
      //Change
      var th = $(this);
      $.ajax({
         type: "POST",
         url: "assets/templates/mail.php", //Change
         data: th.serialize(),
      }).done(function () {
         $(".done-w").fadeIn();
         setTimeout(function () {
            // Done Functions
            $(".done-w").fadeOut();
            $.magnificPopup.close();
            th.trigger("reset");
         }, 3000);
      });
      return false;
   });

   //Chrome Smooth Scroll
   try {
      $.browserSelector();
      if ($("html").hasClass("chrome")) {
         $.smoothScroll();
      }
   } catch (err) { }

   $("img, a").on("dragstart", function (event) {
      event.preventDefault();
   });

   try {
      ymaps.ready(init);

      function init() {
         var myMap = new ymaps.Map("ya-map", {
            center: [55.762407, 37.636138],
            zoom: 17,
         });

         var myPlacemark = new ymaps.Placemark(
            [55.762444, 37.635593],
            {
               hintContent: "",
            },
            {
               iconImageHref: "img/sprite/place-big.png",
               iconImageSize: [15, 20],
               iconImageOffset: [0, -20],
            }
         );
         myMap.geoObjects.add(myPlacemark);
      }
   } catch (e) { }

   //selectssss
   $("select").each(function () {
      var $this = $(this),
         numberOfOptions = $(this).children("option").length;

      $this.addClass("select-hidden");
      $this.wrap('<div class="select"></div>');
      $this.after('<div class="select-styled"></div>');

      var $styledSelect = $this.next("div.select-styled");
      $styledSelect.text($this.children("option").eq(0).text());

      var $list = $("<ul />", {
         class: "select-options",
      }).insertAfter($styledSelect);

      for (var i = 0; i < numberOfOptions; i++) {
         $("<li />", {
            text: $this.children("option").eq(i).text(),
            rel: $this.children("option").eq(i).val(),
         }).appendTo($list);
      }

      var $listItems = $list.children("li");

      $styledSelect.click(function (e) {
         e.stopPropagation();
         $("div.select-styled.active")
            .not(this)
            .each(function () {
               $(this)
                  .removeClass("active")
                  .next("ul.select-options")
                  .hide();
            });
         $(this).toggleClass("active").next("ul.select-options").toggle();
      });

      $listItems.click(function (e) {
         e.stopPropagation();
         $styledSelect.text($(this).text()).removeClass("active");
         $this.val($(this).attr("rel"));
         $list.hide();
         //console.log($this.val());
      });

      $(document).click(function () {
         $styledSelect.removeClass("active");
         $list.hide();
      });
   });

   $("iframe")
      .contents()
      .find(".ksk-section-title.blue")
      .css("background", "red !important");

   var walls = $("#walls");
   var a_walls = [
      walls.find(".metrics-wall:nth-child(1)"),
      walls.find(".metrics-wall:nth-child(2)"),
      walls.find(".metrics-wall:nth-child(3)"),
      walls.find(".metrics-wall:nth-child(4)"),
   ];

   $(".metrics-bg, .metrics-plus").click(function () {
      $(this).parent().toggleClass("toggled");
      if ($(this).parent().hasClass("toggled")) {
         $(this).parent().find("input").attr("required", "required");
      } else {
         $(this).parent().find("input").removeAttr("required");
      }
      selecttor($(this).parent().parent().find(".toggled").size());
   });

   var selected = null;
   setInterval(function () {
      var sel = $("#2").find(":selected").val();
      if (selected != sel) metrics((selected = sel));
   }, 10);

   function metrics(amount) {
      for (var i = 0; i < a_walls.length; i++) {
         if (i < amount) {
            if (!a_walls[i].hasClass("toggled")) {
               a_walls[i].addClass("toggled");
               a_walls[i].find("input").attr("required", "required");
            }
         } else if (a_walls[i].hasClass("toggled")) {
            a_walls[i].removeClass("toggled");
            a_walls[i].find("input").removeAttr("required");
         }
      }
   }

   function selecttor(amount) {
      $("#2 + .select-styled").text($("#2 option").eq(amount).text());
   }
});

// HOME_AKTSII ACCORDION
$(document).ready(function () {
   $("#home_aktsii_btn").click(function () {
      $("#home_aktsii_block").slideToggle();

      return false;
   });
});

$(document).on("click.bs.dropdown.data-api", ".price-door", function (e) {
   e.stopPropagation();
});

/* sg */
$(document).ready(function () {
   $(".popup-youtube").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
   });
   $(".tvprojects-carousel").owlCarousel({
      loop: true,
      margin: 50,
      autoplay: true,
      nav: true,
      navText: [
         '<span><i class="fa fa-angle-left" aria-hidden="true"></i></span>',
         '<span><i class="fa fa-angle-right" aria-hidden="true"></i></span>',
      ],
      autoplayTimeout: 6000,
      pagination: true,
      responsive: {
         0: {
            items: 2,
            margin: 10,
         },
         480: {
            items: 3,
         },
         600: {
            items: 4,
         },
         1000: {
            items: 5,
         },
         1200: {
            items: 6,
         },
      },
   });
});
/* end sg */
