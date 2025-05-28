$(document).ready(function () {
  // 실습 1
  var i = 0;
  $("div.out").mouseover(function () {
    $("div.out p:first").text("mouse over");
    $("div.out p:last").text(++i);
  });
  $("div.out").mouseout(function () {
    $("div.out p:first").text("mouse out");
  });

  // 실습 2 ~
  $("#b1").on(
    "click",
    {
      url: "http://www.google.com",
      winattributes: "resize=1, scrollbars=1, status=1",
    },
    max_open
  );
  function max_open(event) {
    var maxwindow = window.open(event.data.url, "", event.data.winattributes);
    maxwindow.moveTo(0, 0);
    maxwindow.resizeTo(screen.availWidth, screen.availHeight);
  }

  function flash() {
    $("#off_test").show().fadeOut("slow");
  }

  $("#bind").click(function () {
    $("body").on("click", "#theone", flash).find("#theone").text("Can Click!");
  });

  $("#unbind").click(function () {
    $("body").off().find("#theone").text("Does Nothing…");
  });

  $("#trigger_test button:first").click(function () {
    update($("#trigger_test span:first"));
  });

  $("#trigger_test button:last").click(function () {
    $("#trigger_test> button:first").trigger("click");
    update($("#trigger_test span:last"));
  });

  function update(j) {
    var n = parseInt(j.text(), 10);
    j.text(n + 1);
  }
  // 실습 5
  $("#image").click(function () {
    changeImg($("#image"));
  });

  function changeImg() {
    var currentImg = $("#image").attr("src");

    if (currentImg === "../img/junseo_fifth.jpg") {
      $("#image").attr("src", "../img/cat_me.jpg");
    } else {
      $("#image").attr("src", "../img/junseo_fifth.jpg");
    }
  }

  // 실습 6
  var albumIndex = 0;
  var imgArray = [
    "../img/junseo.jpg",
    "../img/junseo_second.jpg",
    "../img/junseo_third.jpg",
    "../img/junseo_fourth.jpg",
    "../img/junseo_fifth.jpg",
  ];

  $("#imgAlbum").attr("src", imgArray[albumIndex]);
  $("#imgAlbum").click(function () {
    albumIndex = (albumIndex + 1) % imgArray.length;
    $("#imgAlbum").attr("src", imgArray[albumIndex]);
  });

  $(".main-menu").mouseover(function () {
    $(this).css({ fontSize: "20px", backgroundColor: "green" });
  });

  $(".main-menu").mouseout(function () {
    $(this).css({ fontSize: "", background: "none" });
  });

  // 실습 8
  $("#add_img").click(function () {
    $("#note_form").addClass("popup");
    change_position($(".popup"));
    $("#note_form").slideDown(1000);
  });

  $("#add_note").click(function () {
    $("#note").append("<div>제목: " + $("#note_title").val() + "</div>");
    $("#note").append("<div>날짜: " + $("#note_date").val() + "</div>");
    $("#note").append("<div>내용: " + $("#note_content").val() + "</div>");
    $("#note_form").slideUp(1000);
  });

  $(window).resize(function () {
    change_position($(".popup"));
  });

  function change_position(obj) {
    var l = ($(window).width() - obj.width()) / 2;
    var t = ($(window).height() - obj.height()) / 2;
    obj.css({ top: t, left: l });
  }

  $("#moving_button").click(function () {
    if ($("#moving_box").width() <= $("#animation_test").width()) {
      $("#moving_box").animate({
        right: "0px",
        height: "+=50px",
        width: "+=50px",
      });
      $("#animation_test").animate({
        height: "+=50px",
      });
    }
  });

  $(".accordion").each(function () {
    var dl = $(this);
    var alldd = dl.find("dd");
    var alldt = dl.find("dt");
    function closeAll() {
      alldd.addClass("closed");
      alldt.addClass("closed");
    }
    function open(dt, dd) {
      dt.removeClass("closed");
      dd.removeClass("closed");
    }
    closeAll();
    alldt.click(function () {
      var dt = $(this);
      var dd = dt.next();
      closeAll();
      open(dt, dd);
    });
  });

  var interval = 3000;
  $(".slideshow").each(function () {
    var container = $(this);
    function swtichImg() {
      var imgs = container.find("img");
      var first = imgs.eq(0);
      var second = imgs.eq(1);
      first.appendTo(container).fadeOut(2000);
      second.fadeIn();
    }
    function startTimer() {
      timer = setInterval(swtichImg, interval);
    }
    function stopTimer() {
      clearInterval(timer);
    }

    container.hover(stopTimer, startTimer);
    startTimer();
  });

  $("#getText1").on("click",function(){
    $("#textbox").text("글자 입력 테스트");
    var req = $.ajax({url:"data.txt", dataType:"json"});
    req.done(function(data,status){
      // var students = JSON.parse(data);
      for(var i = 0; i<data.length; i++){
        var str = "<br>" + data[i].name ;
        $("#textbox").append(str);
      }
    });
  });

  $("#getText2").on("click",function(){
    var tb = $("<table/>");
    var req = $.ajax({url:"data.txt", dataType:"json"});

    var row=$("<tr/>").append(
        $("<th/>").text("이름"),
        $("<th/>").text("아이디"),
        $("<th/>").text("학과"),
        $("<th/>").text("수강과목")
      );

    tb.append(row);
    req.done(function(data,status){
      // var students = JSON.parse(data);
      for(var i = 0; i<data.length; i++){
        var phone = data[i].phone;
        var row=$("<tr/>").append(
        $("<td/>").text(data[i].name),
        $("<td/>").text(data[i].id),
        $("<td/>").text(data[i].department),
        $("<td/>").text(data[i].class)
      );
        tb.append(row);
      }
      $("#textbox").append(tb);
    });

  });
});
