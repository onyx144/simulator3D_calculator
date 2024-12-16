function progressWidth() {
    var e = 0;
    $(".calculator__step").each(function () {
      if (
        ((e += parseInt($(this).outerWidth())),
        $(this).hasClass("calculator__step--active"))
      )
        return !1;
    }),
      $(".calculator__progress").width(e);
  }
  function goNextSection(e, a) {
    $(".calculator__form").attr("sec-id", a),
      $(".calculator__step").removeClass("calculator__step--active"),
      $(".calculator__step").eq(e).addClass("calculator__step--active"),
      progressWidth();
    var t = $(".calculator__form .calculator__section").eq(a);
    $(".calculator__section").fadeOut(100),
      setTimeout(function () {
        $(".calculator__form").height(t.outerHeight()), t.fadeIn(100);
      }, 100),
      onSectionEnter(a),
      priceCalculating();
  }
  function onSectionEnter(e) {
    switch (e) {
      case 1:
        animateImgsChangeWall("steny"),
          animateImgsChangeObshivka("potolok"),
          animateImgsChangeObshivka("dver");
        break;
      case 2:
        animateImgsChangeShelves("shelves"),
          animateImgsChangeShelvesBacks("shelves_backs");
        break;
      case 3:
        animateImgsChangePech("pech");
        break;
      case 7:
        animateImgsChangeSelect("svet");
    }
  }
  function adjustFields() {
    $("select[name=pechType]").on("change", function () {
      2 == $(this).val()
        ? ($("select[name=pechStyle]").find("option[data-id=3]").hide(0),
          1 ==
            $("select[name=pechStyle]")
              .find("option[data-id=3]")
              .prop("selected") &&
            $("select[name=pechStyle]")
              .find("option[data-id=3]")
              .prop("selected", !1),
          $("input[name=konek_height]").parents(".calculator__col").show(0),
          1 == $("select[name=pechStyle]").val()
            ? $("input[name=oblicovka_pechi]").parents(".calculator__col").show(0)
            : $("input[name=oblicovka_pechi]")
                .parents(".calculator__col")
                .hide(0),
          $("input[name=pult]").parents(".calculator__col").hide(0))
        : ($("select[name=pechStyle]").find("option[data-id=3]").show(0),
          $("input[name=konek_height]").parents(".calculator__col").hide(0),
          $("input[name=oblicovka_pechi]").parents(".calculator__col").hide(0),
          $("input[name=pult]").parents(".calculator__col").show(0)),
        $("input[name=oblicovka_pechi]").prop("checked", !1);
    }),
      $("select[name=pechStyle]").on("change", function () {
        $("input[name=oblicovka_pechi]").prop("checked", !1),
          1 == $("select[name=pechStyle]").val()
            ? $("input[name=oblicovka_pechi]").parents(".calculator__col").show(0)
            : $("input[name=oblicovka_pechi]")
                .parents(".calculator__col")
                .hide(0);
      }),
      $("select[name=oblicovka_plitkoy]").on("change", function () {
        0 != $(this).val()
          ? (1 == $("select[name=gimalay_sol]").val() &&
              ($("select[name=gimalay_sol]")
                .find("option[value=2]")
                .prop("selected", !0),
              animateImgsChangeSelect("gimalay_sol")),
            $("select[name=gimalay_sol]")
              .find("option[value=1]")
              .prop("disabled", !0)
              .prop("selected", !1))
          : $("select[name=gimalay_sol]")
              .find("option[value=1]")
              .prop("disabled", !1);
      });
  }
  function onSelectChange() {
    $(".calculator__form select").on("change", function () {
      var e = $(this).attr("name");
      switch (e) {
        case "steny":
          animateImgsChangeWall("steny");
          break;
        case "potolok":
        case "dver":
          animateImgsChangeObshivka(e);
          break;
        case "shelves_shape":
          fixShelvesOptions(),
            animateImgsChangeShelves("shelves"),
            animateImgsChangeShelvesBacks("shelves_backs");
          break;
        case "shelves_material":
          animateImgsChangeShelves("shelves");
          break;
        case "shelves_backs":
          animateImgsChangeShelvesBacks("shelves_backs");
          break;
        case "pechType":
        case "pechStyle":
          animateImgsChangePech("pech");
          break;
        case "oblicovka_plitkoy":
          animateImgsChangeSelect("oblicovka_plitkoy");
          break;
        case "gimalay_sol":
          animateImgsChangeSelect("gimalay_sol");
          break;
        case "svet":
          animateImgsChangeSelect("svet");
          break;
        case "accessories":
          animateImgsChangeSelect("accessories");
          break;
        case "nightsky":
          animateImgsChangeCheckbox("nightsky");
      }
      priceCalculating();
    });
  }
  function fixShelvesOptions() {
    var e = $("select[name=shelves_shape] option:selected").data("id").toString(),
      a = $("select[name=shelves_material] option:selected")
        .data("id")
        .toString();
    "13" === e || "14" === e || "15" === e
      ? ($('select[name=shelves_material] option[data-id="2"]').hide(0),
        $('select[name=shelves_material] option[data-id="3"]').hide(0),
        $('select[name=shelves_material] option[data-id="9"]').show(0),
        ("2" !== a && "3" !== a) || $("select[name=shelves_material]").val("1.0"))
      : ($('select[name=shelves_material] option[data-id="2"]').show(0),
        $('select[name=shelves_material] option[data-id="3"]').show(0),
        $('select[name=shelves_material] option[data-id="9"]').hide(0),
        "9" === a && $("select[name=shelves_material]").val("1.0"));
  }
  function onInputChange(e) {
    $("input[name=" + e + "]").on("keyup", function (e) {
      [35, 36, 37, 38, 39, 40].in_array(e.keyCode) ||
        (inputValidate($(this)), priceCalculating());
    }),
      $("input[name=" + e + "]").on("change", function (e) {
        "" == $(this).val() && $(this).val(0);
      });
  }
  function inputValidate(e) {
    var a = $(e).val(),
      t = a.replace(/^0(.+)/, "$1");
    a !==
      (t = (t = (t = t.replace(/\,/g, ".")).replace(/[^0-9\.]/g, "")).replace(
        /^([^\.]*\.)|\./g,
        "$1",
      )) && $(e).val(t);
  }
  function onRadioChange(e) {
    $("input[name=" + e + "]").on("change", function () {
      "oblicovka_pechi" == e && animateImgsChangePech("pech"),
        "nightsky" == e && animateImgsChangeCheckbox("nightsky"),
        priceCalculating();
    });
  }
  function animateImgsChangeSelect(e) {
    var a = $("#" + e)
      .find("option:selected")
      .attr("data-img");
    $("." + e).removeClass("img__opacity"),
      $("img#" + a).addClass("img__zindex"),
      $("img#" + a).addClass("img__opacity");
  }
  function animateImgsChangeCheckbox(e) {
    var a = $("input[name=" + e + "]").attr("data-img");
    1 == $("input[name=" + e + "]").prop("checked")
      ? ($("img#" + a).addClass("img__zindex"),
        $("img#" + a).addClass("img__opacity"))
      : ($("img#" + a).removeClass("img__zindex"),
        $("img#" + a).removeClass("img__opacity"));
  }
  function animateImgsChangePech(e) {
    var a =
      "pech_" + $("select[name=pechType]").find("option:selected").val() + "_";
    (a += $("select[name=pechStyle]").find("option:selected").val()),
      2 == $("select[name=pechType]").val() &&
        1 == $("select[name=pechStyle]").val() &&
        $("input[name=oblicovka_pechi]").prop("checked") &&
        (a += "o"),
      $("." + e).removeClass("img__opacity"),
      $("img#" + a).addClass("img__zindex"),
      $("img#" + a).addClass("img__opacity");
  }
  function animateImgsChangeShelves(e) {
    var a = $("select[name=shelves_shape]")
        .find("option:selected")
        .attr("data-id"),
      t =
        "shelves_" +
        $("select[name=shelves_material]")
          .find("option:selected")
          .attr("data-id") +
        "_" +
        a;
    $("." + e).removeClass("img__opacity"),
      $("img#" + t).addClass("img__zindex"),
      $("img#" + t).addClass("img__opacity");
  }
  function animateImgsChangeShelvesBacks(e) {
    var a = 0,
      t = $("select[name=shelves_shape]").find("option:selected").attr("data-id");
    switch ((t = parseInt(t))) {
      case 2:
      case 5:
      case 10:
        a = 1;
        break;
      case 1:
      case 3:
      case 6:
      case 8:
      case 11:
      case 14:
      case 15:
        a = 2;
        break;
      case 4:
      case 7:
      case 13:
        a = 3;
        break;
      case 9:
      case 12:
        a = 4;
    }
    var n =
      "shelves_backs_" +
      $("select[name=shelves_backs]").find("option:selected").attr("data-id") +
      "_" +
      a;
    $("." + e).removeClass("img__opacity"),
      $("img#" + n).addClass("img__zindex"),
      $("img#" + n).addClass("img__opacity");
  }
  function animateImgsChangeWall(e) {
    var a = $("#" + e)
        .find("option:selected")
        .attr("data-img");
    var b = $("#" + e)
        .find("option:selected")
        .attr("data-img2");
    var dataNames = $("#" + e).attr("data-names");
    /*
    console.log('dataNames:', dataNames);
    console.log('b:', b);
    console.log($("." + dataNames));
    */
    // Убираем классы img__zindex у всех элементов
    $("." + dataNames).removeClass("img__zindex");
    $("." + e).removeClass("img__zindex");
    
    // Добавляем классы img__zindex и img__opacity для выбранных элементов
    $("img#" + a).addClass("img__zindex img__opacity");
    $("img#" + b).addClass("img__zindex img__opacity");
    
    // Находим <select> по id = dataNames и выбираем <option>, соответствующий b
    var selectElement = $("#" + dataNames);
    var matchedOption = selectElement.find(`option[data-img='${b}']`);
    
    if (matchedOption.length > 0) {
        matchedOption.prop("selected", true); // Устанавливаем как выбранный
        console.log("Выбрана опция:", matchedOption.text());
    } else {
        console.log("Опция с data-img2 =", b, "не найдена.");
    }
    
    // Таймер для сброса opacity у остальных элементов
    setTimeout(function () {
        $("." + e).each(function () {
            if ($(this).attr("id") != a) {
                $(this).removeClass("img__opacity");
            }
        });
    }, 200);
}

  function animateImgsChangeObshivka(e) {
    var a = $("#" + e)
      .find("option:selected")
      .attr("data-img");
    $("." + e).removeClass("img__zindex"),
      $("img#" + a).addClass("img__zindex"),
      $("img#" + a).addClass("img__opacity"),
      setTimeout(function () {
        $("." + e).each(function () {
          $(this).attr("id") != a && $(this).removeClass("img__opacity");
        });
      }, 200);
  }
  $("input[name=pech]").on("change", function () {
    priceCalculating();
});
  function priceCalculating() {
    secID = $(".calculator__form").attr("sec-id");
    var e = 12270 + 3040 + 65910 + 4500,
      a = parseFloat($("input[name=karkas_price]").val()),
      t =
        "" != $("input[name=sauna_length]").val()
          ? parseFloat($("input[name=sauna_length]").val())
          : 0,
      n =
        "" != $("input[name=sauna_width]").val()
          ? parseFloat($("input[name=sauna_width]").val())
          : 0,
      i =
        "" != $("input[name=sauna_height]").val()
          ? parseFloat($("input[name=sauna_height]").val())
          : 0,
      s = t * n,
      c = 4 * i,
      sectionPrice = (s + c);
      var l = sectionPrice + sectionPrice * 0.15;
      l *= a;
      
    if (((e += parseFloat(l)), secID >= 1)) {
      var o = $("select[name=steny]").val();
      var h = $("select[name=dver]").val();
      (obshivkaTotalPrice = parseFloat(o) + parseFloat(h)),
        (e += parseFloat(obshivkaTotalPrice));
    }
    if (secID >= 2) {
      var m =
        parseFloat($("select[name=shelves_shape]").val()) +
        parseFloat($("select[name=shelves_backs]").val());
      e += parseFloat(m);
      console.log('dedede');
    }
    if (secID >= 4) {
      // Обработчик изменения состояния инпутов "pech"
      var p = parseFloat($("input[name=pech]:checked").val());
      e += parseFloat(p);
  }
  
  // Продолжаем логику, если secID >= 5
  if (secID >= 5) {
      var r = 0;
      if (
        ($("input[name=pech]:checked").length > 0 &&
          (r = parseFloat(
            $("input[name=pech]:checked").attr("data-v") *
              $("select[name=kamni]").val(),
          )),
        1 == $("select[name=pechType]").val())
      )
        _ = $("input[name=pult]").prop("checked")
          ? parseFloat($("input[name=pult]").val())
          : 0;
      else
        var d = $("input[name=oblicovka_pechi]").prop("checked")
            ? parseFloat($("input[name=oblicovka_pechi]").val())
            : 0,
          v =
            "" != $("input[name=konek_height]").val()
              ? parseFloat($("input[name=konek_height]").val())
              : 0,
          _ =
            d + parseFloat(v * $("input[name=konek_height]").attr("data-price"));
      e += r + _;
    }
    if (secID >= 6) {
      var u = parseFloat(1.2 * $("select[name=oblicovka_plitkoy]").val() * i),
        g = parseFloat($("select[name=gimalay_sol]").attr("data-price")),
        k = 0;
      switch (parseInt($("select[name=gimalay_sol]").val())) {
        case 0:
          k = 0;
          break;
        case 1:
          k = 1.2 * i;
          break;
        case 2:
          k = parseFloat(i * t - 1.3);
          break;
        case 3:
          k = 2 * (n + t) * 0.6;
      }
      e += u + g * k;
    }
    if (secID >= 7) {
      // Добавляем стоимость светильников, аксессуаров и ночного неба
      e += parseFloat($("select[name=svet]").val());
      e += parseFloat($("select[name=accessories]").val());
      
      // Если ночное небо выбрано, добавляем его стоимость
      e += $("input[name=nightsky]").prop("checked")
        ? parseFloat($("input[name=nightsky]").val())
        : 0;
    }
    
    // Вычисляем дополнительную стоимость работ как процент от общей суммы
    var y = parseInt(e * parseFloat($("input[name=works]").val() / 100));
    
    // Обновляем атрибуты на странице
    $("#thatCalcPrice").attr("data-mat", parseInt(e));
    $("#thatCalcPrice").attr("data-works", y);
    
    // Если итоговая сумма меньше 0, устанавливаем 0
    //e = (e += y) < 0 ? 0 : e;
    // Анимация изменения цены
    animatePrice(parseInt(e));
  }
  function animatePrice(e) {
    var a = parseInt($("#thatCalcPrice").html());
    "" == a && (a = 0);
    var t = (e - a) / 50;
    for (i = 1; i <= 50; i++)
      (tempPrice = a + t * i),
        50 == i ? changePrice(e, i, 10) : changePrice(tempPrice, i, 10);
  }
  function changePrice(e, a, t) {
    setTimeout(function () {
      $("#thatCalcPrice").html(parseInt(e));
    }, a * t);
  }
  function ajaxGetPeches() {
    var e = $("select[name=pechType]").val(),
      a = $("select[name=pechStyle]").val(),
      t = 0;
    1 == e ? (t = parseInt(a)) : 2 == e && (t = 3 + parseInt(a)),
      $.ajax({ url: "/system/utils/calculator/getPeches.php?id=" + t }).done(
        function (e) {
          $(".calculator__pechi").html(e),
            goNextSection(3, 4),
            onRadioChange("pech"),
            priceCalculating();
        },
      );
  }
  function goLastSection() {
    var e = generateInfoResult();
    $(".zayavka__content").html(e),
      $(".calculator__step").removeClass("calculator__step--active"),
      $(".calculator__price").before(
        '<span class="calculator__step calculator__step--active">Заявка</span>',
      ),
      $(".calculator__price").remove(),
      progressWidth();
    var a = $(".calculator__form .calculator__section").eq(8);
    $(".calculator__section").fadeOut(100),
      setTimeout(function () {
        $(".calculator__form").height(a.outerHeight()), a.fadeIn(100);
      }, 100);
  }
  function generateInfoResult() {
    var e = "";
    return (
      (e += '<h3 style="margin: 0 0 5px;">Размеры</h3>'),
      (e += "<div>Длина: " + $("input[name=sauna_length]").val() + "м</div>"),
      (e += "<div>Ширина: " + $("input[name=sauna_width]").val() + "м</div>"),
      (e += "<div>Высота: " + $("input[name=sauna_height]").val() + "м</div>"),
      (e += '<h3 style="margin: 15px 0 5px;">Обшивка</h3>'),
      (e +=
        "<div>Стены: " +
        $("select[name=steny]").find("option:selected").html() +
        "</div>"),
      (e +=
        "<div>Потолок: " +
        $("select[name=potolok]").find("option:selected").html() +
        "</div>"),
      (e +=
        "<div>Дверь: " +
        $("select[name=dver]").find("option:selected").html() +
        "</div>"),
      (e += '<h3 style="margin: 15px 0 5px;">Полки</h3>'),
      (e +=
        "<div>" +
        $("select[name=shelves_shape]").find("option:selected").html() +
        "</div>"),
      (e +=
        "<div>Обшивка: " +
        $("select[name=shelves_material]").find("option:selected").html() +
        "</div>"),
      (e +=
        "<div>Спинка: " +
        $("select[name=shelves_backs]").find("option:selected").html() +
        "</div>"),
      (e += '<h3 style="margin: 15px 0 5px;">Печь</h3>'),
      (e +=
        "<div><b><i>" +
        $("input[name=pech]:checked").next("label").find(".pech__title").html() +
        "</i></b></div>"),
      (e +=
        "<div>Камни: " +
        $("select[name=kamni]").find("option:selected").html() +
        "</div>"),
      1 == $("select[name=pechType]").val()
        ? $("input[name=pult]").prop("checked") &&
          (e += "<div>Пульт управления</div>")
        : 2 == $("select[name=pechType]").val() &&
          ((e +=
            "<div>Дымоход: " + $("input[name=konek_height]").val() + "м</div>"),
          1 == $("select[name=pechStyle]").val() &&
            $("input[name=oblicovka_pechi]").prop("checked") &&
            (e += "<div>Облицовка печи</div>")),
      0 != $("select[name=oblicovka_plitkoy]").val() &&
        (e +=
          "<div>Облицовка за печкой: " +
          $("select[name=oblicovka_plitkoy]").find("option:selected").html() +
          "</div>"),
      (e += '<h3 style="margin: 15px 0 5px;">Дополнительно</h3>'),
      0 != $("select[name=gimalay_sol]").val() &&
        (e +=
          "<div>Гималайская соль: " +
          $("select[name=gimalay_sol]").find("option:selected").html() +
          "</div>"),
      (e +=
        "<div>Освещение: " +
        $("select[name=svet]").find("option:selected").html() +
        "</div>"),
      $("input[name=nightsky]").prop("checked") &&
        (e += "<div>Звездное небо</div>"),
      0 != $("select[name=accessories]").val() &&
        (e +=
          "<div>" +
          $("select[name=accessories]").find("option:selected").html() +
          "</div>"),
      (e +=
        '<h3 style="margin: 15px 0 0px;">Стоимость материалов: ' +
        $("#thatCalcPrice").attr("data-mat") +
        " р.</h3>"),
      (e +=
        '<h3 style="margin: 0px 0 10px;">Стоимость работ: ' +
        $("#thatCalcPrice").attr("data-works") +
        " р.</h3>"),
      (e += "<h2>ИТОГО: " + $("#thatCalcPrice").html() + " р.</h2>")
    );
  }
  function sendZayavka() {
    if (
      "" == $("input[name=zayavka_email]").val() &&
      "" == $("input[name=zayavka_phone]").val()
    )
      return (
        $("input[name=zayavka_email]").css({ "border-color": "red" }),
        $("input[name=zayavka_phone]").css({ "border-color": "red" }),
        $("input[name=zayavka_email], input[name=zayavka_phone]").focus(
          function () {
            $("input[name=zayavka_email], input[name=zayavka_phone]").removeAttr(
              "style",
            );
          },
        ),
        !1
      );
    grecaptcha.execute();
  }
  function sendFormSauna() {
    var e = $("input[name=zayavka_name]").val(),
      a = $("input[name=zayavka_email]").val(),
      t = $("input[name=zayavka_phone]").val(),
      n = $("textarea[name=zayavka_comment]").val(),
      i = {};
    $(".calculator__photos img.img__opacity").each(function () {
      void 0 === i[$(this).attr("id")] &&
        (i[$(this).attr("id")] = $(this).attr("src"));
    });
    var s = $(".zayavka__content").html();
    $.post(
      "/system/utils/calculator/calculator.zayavka.send.php",
      {
        type: "ajaxsend",
        name: e,
        email: a,
        phone: t,
        text: n,
        zayavka: s,
        images: i,
      },
      function (e) {
        1 == e &&
          $(".zayavka__form").html(
            "<h3>Заявка оформлена!</h3><div>Специалист свяжется с Вами в ближайшее время.</div><div><i>Информация по заявке отправлена на Вашу почту</i></div>",
          );
      },
    );
  }
  function onSubmitReCaptchaSauna(e) {
    sendFormSauna();
  }
  ready(function () {
    adjustFields(),
      onInputChange("sauna_length"),
      onInputChange("sauna_width"),
      onInputChange("sauna_height"),
      onInputChange("konek_height"),
      onSelectChange(),
      onRadioChange("pult"),
      onRadioChange("oblicovka_pechi"),
      onRadioChange("nightsky"),
      priceCalculating(),
      $("input[name=zayavka_phone]").mask("+7 (999) 999-99-99");
  }),
    loaded(function () {
      progressWidth();
    }),
    (Array.prototype.in_array = function (e) {
      for (var a = 0, t = this.length; a < t; a++) if (this[a] == e) return !0;
      return !1;
    });
  