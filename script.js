
$(function(){

///////////////////////////// PLAYER OBJECT ////////////////////////////

  var player1 = {
    score: 0,
    color: "#F5AA42"
  };

  var player2 = {
    score: 0,
    color: "#BEED72"
  };

  var currentPlayer;

//////////////////////// START & CONTINUE GAME /////////////////////////

  $('#startGame, #continueGame').click(startGame);

  function startGame(){

    $('#startDp, #endDp, #changeDp').css("display", "none");

    player1.name = $('input').eq(0).val();
    player2.name = $('input').eq(1).val();

    if (currentPlayer == player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }

    $('#currentPlayer').html(currentPlayer.name);
    $('#score').html(currentPlayer.score);

    firstFive();   // populates first five random orders

    var playTime = 60;
    var gameInterval = setInterval(timeGame, 1000);

    function timeGame() { // game time set

    $("#timer").html(playTime + " secs");

      if(playTime > 0){
        playTime -= 1;
      } else {
        clearInterval(gameInterval);
        playTime = 0;
        $('#grill > img').remove();
        currentPlayer.score = Number(scoreBoard);
        $('#changeDp').css("display", "block");
        $('.current-score').eq(0).html(player1.name + "'s current score is " + player1.score);
        $('.current-score').eq(1).html(player2.name + "'s current score is " + player2.score);
      }
    }
  }

///////////////////////////// END GAME /////////////////////////////

  $('#endGame').click(endGame);

  function endGame() {
    $('#endDp').css("display", "block");
    if(player1.score > player2.score) {
      $('#endDp > div').text(player1.name + " Won!");
    } else if(player1.score < player2.score) {
      $('#endDp > div').text(player2.name + " Won!");
    } else {
      $('#endDp > div').text("It's a tie!");
    }
  }


////////////// Populate Random Menu called @ startGame /////////////////

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

/////////////////////// SELECT FOOD & GRILL ///////////////////////////

  $('.food').click(startGrill);

  function startGrill(){

    for (var i = 0; i < foods.length; i++) {
      if(foods[i].name === this.id) {
        var food = foods[i];
        break;
      }
    }

    $('#grill').append("<img src='image/ingredients/" + food.name +"0.png'>");

    var sizzle = new Audio('sound/sizzle.mp3');
    sizzle.play();

    var img = $('#grill img').last();

    img.draggable({
      cursor: "move",
      containment: "#lower",
      snap: "#completion",
      stop: function(event, ui){
        sizzle.play()}
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
        img.attr('class', 'cooked')
        img.attr('id', food.name)
        img.data('score', food.score)
      } else if(count <= food.pftime && count > 0) {
        img.attr('src','image/ingredients/'+ food.name + '2.png')
        img.data('score', food.pfscore)
      } else {
        img.attr('src','image/ingredients/'+ food.name + '3.png')
        img.attr('class','burned')
        img.data('score', 0)
        clearInterval(counter);
        count = 0;
      }
    }
    finishGrill();
  }

////////////////////////////// SCORE ////////////////////////////////

  var scoreBoard = 0;

  function finishGrill(){

    $("#salad, #bread").droppable({
        accept: ".cooked",
        drop: function(event, ui) {
          for(var j = 0; j < currentOrder.length; j++) {
            if(currentOrder[j].side === this.id && currentOrder[j].main === ui.draggable.attr('id')) {
              var score = ui.draggable.data('score')
              scoreBoard = scoreBoard + score;
              $('#score').text(scoreBoard);
              currentOrder.splice(j, 1);
              currentOrder.push(menus[Math.floor(menus.length * Math.random())]);
              for(var i = 0; i < $('.order').length; i++){
                $('.order').eq(i).html(currentOrder[i].image);
              }
              ui.draggable.remove();
              break;
              }
            else if (j === currentOrder.length - 1) { //
              alert("Not an order");
            }
          }
        }
    });

    $("#trash").droppable({
        accept: ".burned",
        drop: function(event, ui) {
          var score = -500;
          scoreBoard = scoreBoard + score;
          $('#score').text(scoreBoard);
          ui.draggable.remove();
        }
    });
  }

//////////////////////////// OBJECTS ////////////////////////////////

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

/////////////////////////////////////////////////////////////////////

});


