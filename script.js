
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
    this.count = this.burntime;
  }

  var patty = new Food("patty",1000,1500,10,17,20);
  var sausage = new Food("sausage",1000,1500,10,17,20);
  var steak = new Food("steak",2000,2500,20,25,30);
  var shrimp = new Food("shrimp",3000,3500,10,15,20);

  var foods = [patty, sausage, steak, shrimp];

//////////////////////////////////  //////////////////////////////////
////////////////////// SELECT ITEMS & GRILL//////////////////////////

  $('.food').click(startGrill);

  function startGrill(){

    for (var i = 0; i < foods.length; i++) {
      if(foods[i].name === this.id) {
        foods[i].count = foods[i].burntime;
        break;
      }
    }

    var foodItem = foods[i];

    $('#grill').append("<img src='image/ingredients/" + foodItem.name +"0.png'>");
    // ADD SIZZLE

    var img = $('#grill img').last();

    img.draggable({
      cursor: "move",
      containment: "#lower",
      snap: "#completion"
    });


    var counter = setInterval(function() {
      timeGrill(img);
    }, 1000);

    function timeGrill(img) {
      foodItem.count -= 1;
      if(foodItem.count > foodItem.cooktime) {
      } else if(foodItem.count <= foodItem.cooktime && foodItem.count > foodItem.pftime) {
        img.attr('src','image/ingredients/'+ foodItem.name + '1.png')
        img.attr('id', 'cooked')
        img.data('score', foodItem.score)
      } else if(foodItem.count <= foodItem.pftime && foodItem.count > 0) {
        img.attr('src','image/ingredients/'+ foodItem.name + '2.png')
        img.attr('id', 'cooked')
        img.data('score', foodItem.pfscore)
      } else {
        img.attr('src','image/ingredients/'+ foodItem.name + '3.png')
        img.attr('id','burned')
        img.data('score', 0)
        clearInterval(counter);
        foodItem.count = 0;
      }
    }
    finishGrill();
  }

////////////////////////////// SCORE ////////////////////////////////

  function finishGrill(){

    var scoreBoard = 0;

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

//////////////////////////////////  //////////////////////////////////


///////////////////////////////  /////////////////////////////////


});


