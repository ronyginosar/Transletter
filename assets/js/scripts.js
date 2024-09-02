"use strict";
function createDynamicFont(t) {
    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 700,
        n = isInput(t) ? "input" : "span",
        i = t.get(0).innerText.split("");
    t.text("");
    var a = (e - 100) / (i.length - 1),
        r = 100;
    i.forEach(function (e) {
        t.append(createWrapperElement(e, n))
            .children()
            .last()
            .css("font-variation-settings", '"wdth" ' + r)
            .attr("data-var-val", r);
        r += a;
    });
}
function createRandomFont(t) {
    var n = isInput(t) ? "input" : "span",
        e = t.get(0).innerText.split("");
    t.text("");
    e.forEach(function (e) {
        t.append(createWrapperElement(e, n));
    }),
        t.children().each(function () {
            var e = $(this).css("font-variation-settings").split('"'),
                t = parseInt(e[2]);
            $(this).attr("data-var-val", t);
        });
}
function breakUpFont(n) {
    var i = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        e = n.get(0).innerText.split("");
    n.text("");
    var a = getRandomInt(100, 700);
    e.forEach(function (e) {
        var t = n.append(createWrapperElement(e, "span"));
        i &&
            (t
                .children()
                .last()
                .css("font-variation-settings", '"wdth" ' + a)
                .attr("data-var-val", a),
            hasText(t) ? t.addClass("inWidth") : t.addClass("minWidth"),
            (a = getRandomInt(100, 700)));
    });
}
function getRandomInt(e, t) {
    return (e = Math.ceil(e)), (t = Math.floor(t)), Math.floor(Math.random() * (t - e + 1)) + e;
}
function isInput(e) {
    return e.attr("data-input");
}
function createWrapperElement(e, t) {
    return "input" === t
        ? '<input type="text" class="changing-letter letter-wrapper" value="' + e + '"/>'
        : "div" === t
        ? '<div class="letter-outer-wrapper"><input type="text" class="changing-letter letter-wrapper" value="' + e + '"/><input class="free round" type="range" min=100 max=700 /></div>'
        : '<span class="letter-wrapper">' + e + "</span>";
}
$(".dynamic-font").each(function () {
    createDynamicFont($(this));
}),
    $(".dynamic-font-600").each(function () {
        createDynamicFont($(this), 600);
    }),
    $(".random-font").each(function () {
        createRandomFont($(this));
    }),
    $(".break-up-font").each(function () {
        breakUpFont($(this), $(this).attr("data-random"));
    });
var maxFont,
    timer,
    vw = $(window).width();
function vwChanges() {
    maxFont = 2700 < vw ? "1200px" : 1500 < vw ? "605px" : "550px";
}
function adjustWidth(e) {
    var t = "calc(100% / " + e.children().length + ")";
    $(e).children().width(t).off("resize");
}
function dealWithWidth() {
    console.log("dealt!");
    var t = $(".break-up-font");
    t.children().removeClass("inWidth"),
        t.children().fitText(0.06, { maxFontSize: maxFont }),
        setTimeout(function () {
            console.log(t);
            var e = t.children().css("font-size");
            t.css("font-size", e), t.children().addClass("inWidth");
        }, 500);
}
function toggleMenu() {
    $("nav ul").toggleClass("active"), $(".menu").toggleClass("active");
}
vwChanges(),
    $(".break-up-font").each(function () {
        adjustWidth($(this));
    }),
    2700 < vw ? $(".break-up-font").children().fitText(0.05, { maxFontSize: maxFont }) : $(".break-up-font").children().fitText(0.06, { maxFontSize: maxFont }),
    adjustTitleHeight(),
    $(".break-up-font").children().addClass("inWidth"),
    $(window).resize(function () {
        console.log("resized!"), dealWithWidth();
    }),
    $(".hamburger-btn").click(toggleMenu);
var startCounting = !0;
function adjustTitleHeight() {
    setTimeout(function () {
        var e = $(".free .main-title").children().first().css("font-size");
        $(".free .main-title").height((parseInt(e) / 4) * 3);
    }, 300);
}
function showError() {
    $(".error-msg").addClass("active");
}
function hideError() {
    $(".error-msg").removeClass("active");
}
function validateText(e) {
    var t = /^[ אבגדהוזחטיכלמנסעפצקרשתץןךףם]+$/.test(e),
        n = 0 < e.length;
    return t && n;
}
function updateLetterSlider(e) {
    var t = parseInt(e.attr("data-var-val")),
        n = 700 < t ? t + 100 : t,
        i = $(".by-letter .round-slider");
    i.roundSlider("setValue", n), i.siblings(".range-tooltip").text(t);
}
function updateRowSliders(n) {
    $(".by-row .inputs-wrapper input").each(function () {
        var e = $(this).attr("data-style");
        if (e) {
            var t = n.css(e);
            $(this).siblings(".range-tooltip").text(t), $(this).val(parseInt(t));
        }
    });
    var e = parseInt(n.attr("data-var-val")),
        t = 699 < e ? e + 100 : e,
        i = $(".by-row .round-slider");
    i.roundSlider("setValue", t), i.siblings(".range-tooltip").text(e);
}
function updateFreeSlider() {
    var e = parseInt($(".selected").eq(1).attr("data-var-val")),
        t = 699 < e ? e + 100 : e;
    $(".round-slider").roundSlider("setValue", t), $(".round-slider").parent().siblings(".range-tooltip").val(e);
}
function highlightSelected() {
    $(".selected").addClass("active");
}
function unlightSelected() {
    $(".selected").removeClass("active");
}
$(".by-row .text-row .row-input").each(function () {
    var e = $(this).css("font-variation-settings").split('"'),
        t = parseInt(e[2]);
    $(this).attr("data-var-val", t);
}),
    $(".change-letter input").on("input", function (e) {
        updateLetterRow(e);
    }),
    $(".wght-change-letter span, .wght-change-letter input").click(function () {
        $(this).siblings().removeClass("selected"), $(this).addClass("selected");
    }),
    $(".letters-page .letter-wrapper").on("click", function () {
        $(this).siblings().removeClass("selected"), $(this).addClass("selected");
    }),
    $("section.by-letter .text-row .letter-wrapper").on("click", function () {
        updateLetterSlider($(this));
    }),
    $("section.by-row .row-input").on("click", function () {}),
    $(".free-page-wrapper .letter-wrapper").on("click", function () {
        $(this).siblings().removeClass("selected"), $(this).addClass("selected"), updateFreeSlider();
    }),
    $(".wght-change-letter span, .wght-change-letter input").on("mousedown", function () {
        $(this).siblings().removeClass("selected"), $(this).addClass("selected");
    }),
    $(".by-row .text-row").click(function () {
        $(this).siblings().removeClass("selected"), $(this).addClass("selected"), updateRowSliders($(this).children("textarea"));
    }),
    $(".colors .color").click(function () {
        var e = $(this).attr("id");
        $(".text-row.selected textarea").attr("data-color", e);
    }),
    $("input.range-tooltip").on("input", function () {
        var e = $(this).siblings(".input-box").children(".round-slider"),
            t = 700 < parseInt($(this).val()) ? parseInt($(this).val()) + 100 : parseInt($(this).val());
        e.roundSlider("setValue", t), updateStyleFromRoundSlider({ value: $(this).val(), control: e });
    }),
    $(".free-btn").click(function () {
        var e = $(this).siblings("input").val();
        validateText(e)
            ? (hideError(),
              $(".main-title").html(e),
              breakUpFont($(".main-title"), !0),
              adjustWidth($(".main-title")),
              $(".main-title").children().fitText(0.06, { maxFontSize: maxFont }),
              adjustTitleHeight(),
              $(".main-title")
                  .children()
                  .each(function () {
                      var e = $(this);
                      hasText(e) ? e.addClass("inWidth") : e.addClass("minWidth");
                  }),
              $(".free-page-wrapper .letter-wrapper:first-of-type").addClass("selected"),
              updateFreeSlider(),
              $(".free-page-wrapper .letter-wrapper").on("click", function () {
                  $(this).siblings().removeClass("selected"), $(this).addClass("selected"), updateFreeSlider();
              }))
            : showError();
    }),
    $(".show-btn").on("click", function () {
        openControls();
    }),
    isPage("letters") && $(".input-box").hover(highlightSelected, unlightSelected),
    $(".free-input").keypress(function (e) {
        13 == e.keyCode && $(".free-btn").click();
    });
var bigSliderR,
    bigSliderW,
    mousetimeout = setTimeout(function () {
        show_screensaver();
    }, 1e3 * idletime),
    screensaver_active = !0,
    idletime = 900,
    idleTimeReload = 600;
function show_screensaver() {
    (screensaver_active = !0), clearTimeout(mousetimeout), showSaver(), hideControls();
}
function stop_screensaver() {
    (screensaver_active = !1), clearTimeout(mousetimeout), hideSaver();
}
function showSaver() {
    clearTimeout(mousetimeout), $(".screensaver").addClass("active");
}
function hideSaver() {
    clearTimeout(mousetimeout), $(".screensaver").removeClass("active");
}
function openControls() {
    $(".show-btn-wrapper").removeClass("active"), $(".controls").addClass("active");
}
function hideControls() {
    $(".show-btn-wrapper").addClass("active"), $(".controls").removeClass("active"), $(".free-input").val("טרנספורמציה"), $(".free-btn").click();
}
function updateLetterRow(e) {
    $(".letter-row .text-row p")
        .children()
        .each(function () {
            $(this).text(e.target.value);
        }),
        $(".letter-row .text-row .fixed-letters").hide(),
        setTimeout(function () {
            $(".letter-row .text-row .fixed-letters").show();
        }, 1);
}
function hasText(e) {
    return 0 < e.get(0).innerText.length;
}
function updateStyleFromRoundSlider(e) {
    var t,
        n = 700 < e.value ? 1400 - e.value : e.value,
        i = $(e.control);
    i.hasClass("by-row") ? (t = $(".text-row.selected textarea")) : i.hasClass("by-letter") ? (t = $(".by-letter .selected")) : i.hasClass("free") && (t = $(".selected")),
        isPage("letters") ? i.siblings(".range-tooltip").text(n) : i.parent().siblings(".range-tooltip").val(n),
        t.attr("data-var-val", n),
        updateStyleFromInput(t, i, n, !1);
}
function updateStyleFromInput(e, t, n) {
    var i = !(3 < arguments.length && void 0 !== arguments[3]) || arguments[3],
        a = getStyle(t);
    (n = void 0 === n ? getVal(t) : getVal(t, n)),
        e.css(a, n),
        i && t.siblings(".range-tooltip").text(n),
        setTimeout(function () {
            $("textarea").each(function () {
                (this.style.height = "auto"), (this.style.height = this.scrollHeight + "px");
            });
        }, 100);
}
function getStyle(e) {
    return e.attr("data-style");
}
function getVal(e, t) {
    void 0 === t && (t = e.val());
    var n = e.attr("data-unit");
    return "num" === n ? parseInt(t) : "wght" === n ? '"wdth" ' + t : "str" === n ? t : t + n;
}
function isPage(e) {
    return $("body").hasClass(e);
}
function showManual(e) {
    e.next().find(".manual").addClass("active");
}
function hideManual(e) {
    e.next().find(".manual").removeClass("active");
}
function changeChar() {
    (document.getElementById("charDiv_" + window.checkChar).style.animationName = "none"),
        (document.getElementById("wrapperDiv").style.animationName = "none"),
        (window.oldR = window.R),
        (window.R = 26 * Math.random()),
        (window.R = Math.round(window.R)),
        26 == window.R && (window.R = 25),
        (document.getElementById("charDiv_" + window.checkChar).innerText = window.charString.slice(window.R, window.R + 1)),
        setTimeout(function () {
            (document.getElementById("charDiv_" + window.checkChar).style.animationName = "otAnim"),
                (document.getElementById("wrapperDiv").style.animationName = "fontColor"),
                setTimeout(function () {
                    changeChar();
                }, 8e3);
        }, 50);
}
function your_order(e) {
    var t, a;
    return e
        ? ((t = e.split(" ")),
          (a = e.split(" ")),
          t.forEach(function (e) {
              var t = e;
              for (x = 0; x < t.length; x++) {
                  var n;
                  if (((n = t.charAt(x)), !isNaN(n))) {
                      var i = n - 1;
                      a.splice(i, 1, t);
                  }
              }
          }),
          a.join(" "))
        : "";
}
$(document).on("mousemove keypress keydown keyup scroll", function () {
    clearTimeout(mousetimeout),
        screensaver_active && stop_screensaver(),
        (mousetimeout = setTimeout(function () {
            show_screensaver();
        }, 1e3 * idletime));
}),
    $("textarea")
        .each(function () {
            this.setAttribute("style", "height:" + this.scrollHeight + "px;overflow-y:hidden;");
        })
        .on("input", function () {
            (this.style.height = "auto"), (this.style.height = this.scrollHeight + "px");
        }),
    0 < $(".round-slider-small").length &&
        $(".round-slider-small").roundSlider({ radius: 50, showTooltip: !1, width: 12, value: 75, handleSize: 0, handleShape: "square", min: 100, max: 1300, drag: updateStyleFromRoundSlider, change: updateStyleFromRoundSlider }),
    (bigSliderR = (vw = $(window).width()) < 2697 ? ((bigSliderW = 20), 75) : ((bigSliderW = 40), 150)),
    0 < $(".round-slider-big").length &&
        $(".round-slider-big").roundSlider({
            radius: bigSliderR,
            showTooltip: !1,
            width: bigSliderW,
            value: 100,
            handleSize: 0,
            handleShape: "square",
            min: 100,
            max: 1300,
            change: updateStyleFromRoundSlider,
            drag: updateStyleFromRoundSlider,
        }),
    $("input.linked.by-row").on("input", function () {
        updateStyleFromInput($(".text-row.selected textarea"), $(this));
    }),
    $(".text-row.wght-change-letter .letter-wrapper:first-of-type").addClass("selected"),
    updateLetterSlider($(".text-row.wght-change-letter .letter-wrapper:first-of-type")),
    $(".free-page-wrapper .letter-wrapper:first-of-type").addClass("selected"),
    $(".by-row .text-row:first-of-type").addClass("selected"),
    updateRowSliders($(".by-row .text-row:first-of-type .row-input")),
    $(".divider .tiny").hover(
        function () {
            showManual($(this).parent());
        },
        function () {
            hideManual($(this).parent());
        }
    ),
    (window.charString = "אבגדהוזחטיכלמנסעפצקרשתףםןץ"),
    (window.R = 1),
    (window.checkChar = 1),
    setTimeout(function () {
        changeChar();
    }, 8050);
