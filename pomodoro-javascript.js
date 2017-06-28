$(document).ready(function(){
  var buzzer = $("#buzzer")[0];
  var count = parseInt($("#workTime").html());
  var breakTime = parseInt($("#breakTime").html());

$("#reset, #currentStatus, #allTime").hide();

  $("#play").click(function() {
    var counter = setInterval(timer, 1000);//unit of countdown is sec or 10000
    count *= 60;//turns 25 sec to 25 min
    function timer(){//coundown function
     $("#workDiv, #breakDiv").hide();
     $("#play").hide();
     $("#allTime, #currentStatus").show();
     $("#currentStatus").text("work time");
     count--
      if (count===0){
        buzzer.play();
        breakTime *= 60;
        var startBreak = setInterval(breaktimer,1000);//runs breaktimer
        clearInterval(counter);//stops counter
      }

      if(count%60>=10){ //formats time and prints it to the clock
             $("#time").html(Math.floor(count/60));//converts secs to mins
             $("#seconds").html(":" + count%60);
             }else{
             $("#time").html(Math.floor(count/60));//if sec is less than 10
             $("#seconds").html(":0" + count%60);//adds a 0
             }


    function breaktimer(){
        $("#currentStatus").text("break time");
        breakTime--
       // $("#time").html(breakTime);//shows rest time on timer
        if (breakTime === 0){
          buzzer.play();
          $("#reset").show();
          $("#currentStatus, #allTime").hide();
          clearInterval(startBreak);//stops timer at 0
            }

      if(breakTime%60>=10){ //formats time and prints it to the clock
             $("#time").html(Math.floor(breakTime/60));//converts secs to mins
             $("#seconds").html(":" + breakTime%60);
             }else{
             $("#time").html(Math.floor(breakTime/60));//if sec is less than 10
             $("#seconds").html(":0" + breakTime%60);//adds a 0
             }
          }

        }
  });

  //RESET BUTTON for messing with side arrows
  $("#reset").on("click", function() {
     count = 25;
     breakTime = 5;
    $("#time").text(count);
    $("#workTime").text(count);
    $("#breakTime").text(breakTime);
    $("#workDiv, #breakDiv, #play").show();
    $("#reset").hide();
      });

  //ARROW BUTTONS
  $("#plusWork").on("click", function() {//increases worktime
     if (count >= 0) {
       count++
     }
    $("#workTime").text(count); //sets worktime on left
    $("#time").text(count); //sets worktime in center
      });

  $("#minusWork").on("click", function() {//decreases worktime
     if (count > 1) {
       count--
     }
    $("#workTime").text(count); //sets worktime on left
    $("#time").text(count); //sets worktime in center
      });

  $("#plusBreak").on("click", function() {//increases breaktime
     if (breakTime >= 0) {
       breakTime++
     }
    $("#breakTime").text(breakTime); //sets breaktime on right
      });

  $("#minusBreak").on("click", function() {//decreases breaktime
     if (breakTime > 1) {
       breakTime--
     }
    $("#breakTime").text(breakTime); //sets breaktime on right
      });


});
