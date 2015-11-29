
$(function(){

/////////////////////// RANDOM MENU CHALLENGE //////////////////////////

  $('.order').click(randomOrder);

  function randomOrder() {
    var imgArray = ["burger","hotdog","steaksalad","shrimpsalad"];
    var random = Math.floor(imgArray.length * Math.random());
    var htmlString = "<img src='image/orders/" + imgArray[random] +".png'>"
    $('.order').each(function(){
      $(this).html(htmlString);
    });
  }

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

/////////////////////////////////////////////////////////////////////

});
