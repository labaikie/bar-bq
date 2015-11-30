
$(function(){

/////////////////////// RANDOM MENU CHALLENGE //////////////////////////

  $('#startGame').click(countDown);

/////////////////////// RANDOM MENU CHALLENGE //////////////////////////

  function randomOrder() {
    for(var i in $('.order')) {
      var imgArray = ["burger","hotdog","steaksalad","shrimpsalad"];
      var random = Math.floor(imgArray.length * Math.random());
      var htmlString = "<img src='image/orders/" + imgArray[random] +".png'>"
      $('.order').eq(i).html(htmlString);
    }
  }

//////////////////////////// START COUNT DOWN //////////////////////////

  function countDown() {

    var countdown;
    var countdown_number;

    function countdown_init() {
      countdown_number = 11;
      countdown_trigger();
    }

    function countdown_trigger() {
      if(countdown_number > 0) {
        countdown_number--;
        $('#timer').innerHTML = countdown_number;
        if(countdown_number > 0) {
          countdown = setTimeout('countdown_trigger()', 1000);
        }
      }
    }

    function countdown_clear() {
      clearTimeout(countdown);
    }

  }


////////////////////// TO GRILL DRAG AND DROP //////////////////////////
  $(".food").draggable({
    containment: "#play",
    snap: "#grill",
    cursor: "move",
    helper: foodHelper,
  });

  function foodHelper() {
    return '<img src = "image/ingredients/patty-helper.png">';
  }

// function grillInit() {
// }

// $("#grill").droppable({
//   drop: grillIt
// })

// function grillIt() {
//   return '<img src = "image/ingredients/patty-helper.png">';
//   alert("grilling");
// }

/////////////////////////////// TIMER //////////////////////////////////


/////////////////////////////// SCORE /////////////////////////////////
  $('#scoreGame').on('click', scoreUp);

  function scoreUp() {
    $('#score').text(+$('#scoredItem').val());
  };

///////////////////////////////////////////////////////////////////////

});




  // function randomOrder() {
  //   $.get('orders.html', function(data) {
  //     var index = 0;
  //     $(".order").innerHTML(data);
  //     var array = [];
  //       $("img").each(function(){
  //         array.push($(this).attr("src"));
  //         index++;
  //       });
  //     var imgRandom = Math.floor(array.length * Math.random());
  //     var htmlString = "<img src='" + array[imgRandom] + "'>";
  //     $(".order").innerHTML(htmlString);
  //     $(".order").show();
  //   });
  // }
