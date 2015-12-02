
$(function(){

//////////////////////////// STRART GAME //////////////////////////////

  $('#startGame').click(startGame);

  function startGame(){
    firstFive();   // populates first five random orders
    timeGame();     // starts game count down
  }

/////////////////////// RANDOM MENU CHALLENGE //////////////////////////

  var currentOrder = [];

  function firstFive() {
    for(var i = 0; i < 5; i++){
      var random = Math.floor(menus.length * Math.random());
      currentOrder[i] = menus[random];
    }
    for(var i = 0; i < $('.order').length; i++){
      $('.order').eq(i).html(currentOrder[i].image);
    }
  }
  console.log(currentOrder);
///////////////////////////////// TIMER ///////////////////////////////

  function timeGame() {
    var count = 60;
    var gameInterval = setInterval(countDown, 1000);
    function countDown() {
      if(count > 0){
        count -= 1;
      } else {
        clearInterval(gameInterval);
        count = 0;
        alert("Time's Up!");
      }
      $("#timer").html(count + " secs");
    }
  }

////////////////////// SELECT ITEMS & GRILL//////////////////////////

  $('.food').click(startGrill);

  function startGrill(){

    for (var i = 0; i < foods.length; i++) {
      if(foods[i].name === this.id) {
        var food = foods[i];
        break;
      }
    }

    $('#grill').append("<img src='image/ingredients/" + food.name +"0.png'>");
    // ADD SIZZLE

    var img = $('#grill img').last();

    img.draggable({
      cursor: "move",
      containment: "#lower",
      snap: "#completion"
    });

    var count = food.burntime
    var counter = setInterval(function() {
      timeGrill(img);
    }, 1000);

    function timeGrill(img) {
      count -= 1;
      if(count > food.cooktime) {
      } else if(count <= food.cooktime && count > food.pftime) {
        img.attr('src','image/ingredients/'+ food.name + '1.png')
        img.attr('id', 'cooked')
        img.data('score', food.score)
      } else if(count <= food.pftime && count > 0) {
        img.attr('src','image/ingredients/'+ food.name + '2.png')
        img.attr('id', 'cooked')
        img.data('score', food.pfscore)
      } else {
        img.attr('src','image/ingredients/'+ food.name + '3.png')
        img.attr('id','burned')
        img.data('score', 0)
        clearInterval(counter);
        count = 0;
      }
    }
    finishGrill();
  }

////////////////////////////// SCORE ////////////////////////////////

  function finishGrill(){

    var scoreBoard = 0;
    console.log(currentOrder)

    $("#salad, #bread").droppable({
        accept: "#cooked",
        drop: function(event, ui) {
          var score = ui.draggable.data('score')
          scoreBoard = scoreBoard + score;
          $('#score').text(scoreBoard);
          ui.draggable.remove();
          $(this).append(ui.draggable);
        }
    });

    $("#trash").droppable({
        accept: "#burned",
        drop: function(event, ui) {
          ui.draggable.remove();
          $(this).append(ui.draggable);
        }
    });
  }

///////////////////////////////OBJECTS/////////////////////////////////

  function Menu(name,main,side) {
    this.name = name;
    this.main = main;
    this.side = side;
    this.image = "<img src='image/orders/" + this.name + ".png'>";
  }

  var burger = new Menu("burger","patty","bread")
  var hotdog = new Menu("hotdog","sausage","bread")
  var steaksalad = new Menu("steaksalad","steak","salad")
  var shrimpsalad = new Menu("shrimpsalad","shrimp","salad")

  var menus = [burger, hotdog, steaksalad, shrimpsalad];

  function Food(name,score,pfscore,cooktime,pftime,burntime) {
    this.name = name;
    this.score = score;
    this.pfscore = pfscore;
    this.cooktime = cooktime;
    this.pftime = pftime;
    this.burntime = burntime;
  }

  var patty = new Food("patty",1000,1500,13,5,20);
  var sausage = new Food("sausage",1000,1500,10,5,15);
  var steak = new Food("steak",2000,2500,20,5,30);
  var shrimp = new Food("shrimp",3000,3500,5,3,10);

  var foods = [patty, sausage, steak, shrimp];

//////////////////////////////////  //////////////////////////////////

//////////////////////////////////  //////////////////////////////////

///////////////////////////////  /////////////////////////////////

});


