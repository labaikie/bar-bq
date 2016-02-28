
$(function(){

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
    scoreBoard = currentPlayer.score;
    $('#score').text(scoreBoard);
    $('#orders, #parameters').css('background-color', currentPlayer.color);

    firstFive();

    var playTime = 60; // set game time
    var gameInterval = setInterval(timeGame, 1000);

    function timeGame() {

    $("#timer").html(playTime + " secs");

      if(playTime > 0){
        playTime -= 1;
      } else {
        clearInterval(gameInterval);
        scoreBoard -= 500 * $('.burned').length; // Burn Penalty
        $('#grill > img').remove();
        currentPlayer.score = scoreBoard;
        $('#changeDp').css("display", "block");
        $('#score').text(+scoreBoard);
        $('.current-score').eq(0).html(player1.name + "'s current score is " + player1.score);
        $('.current-score').eq(1).html(player2.name + "'s current score is " + player2.score);
      }
    }

  };

///////////////////////// END & RESET GAME ////////////////////////////

  $('#endGame').click(endGame);

  function endGame() {
    $('#endDp').css("display", "block");
    if(player1.score > player2.score) {
      $('.logo').eq(1).text(player1.name + " Won!");
    } else if(player1.score < player2.score) {
      $('.logo').eq(1).text(player2.name + " Won!");
    } else {
      $('.logo').eq(1).text("It's a tie!");
    }
    $('.ending-score').eq(0).html(player1.name + "'s ending score is " + player1.score);
    $('.ending-score').eq(1).html(player2.name + "'s ending score is " + player2.score);
  };

  $('#resetGame').click(function(){
    location.reload();
  })

////////////////////// POPULATE CURRENT ORDER /////////////////////////

  var currentOrder = [];

  function firstFive() {
    for(var i = 0; i < 5; i++){
      currentOrder[i] = menus[randomize(menus.length)];
    }
    show();
  };

  function randomize(menu) {
    return Math.floor(menu * Math.random());
  };

  function show() {
    for (var i = 0; i < $('.order').length; i++) {
      $('.order').eq(i).html(currentOrder[i].image);
    }
  };

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
        // console.log($(this).position())
        if ($(this).position().left <= $('#grill').width() && $(this).position().top >= $('#upper').height()) {
          sizzle.play();
        }
      }
    });

    var count = food.burntime
    var counter = setInterval(function() {
      timeGrill(img);
    }, 1000);

    function timeGrill(img) {
      if(img.position().left <= $('#grill').width() && img.position().top >= $('#upper').height()) {
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
          img.data('score', -500)
          clearInterval(counter);
          count = 0;
        }
      }
    }

    finishGrill();

  };

////////////////////////////// SCORE ////////////////////////////////

  var scoreBoard;

  function finishGrill(){

    $("#salad, #bread").droppable({
      accept: ".cooked",
      drop: function(event, ui) {
        var item = ui.draggable;
        for(var j = 0; j < currentOrder.length; j++) {
          if(currentOrder[j].side === this.id && currentOrder[j].main === item.attr('id')) {
            var score = item.data('score')
            scoreBoard += score;
            $('#score').text(scoreBoard);
            currentOrder.splice(j, 1);
            currentOrder.push(menus[randomize(menus.length)]);
            show();
            item.remove();
            break;
          } else if (j === currentOrder.length - 1) {
              var wrong = new Audio('sound/wrong.mp3');
              wrong.play();
          }
        }
      }
    })

    $("#trash").droppable({
      accept: ".burned",
      drop: function(event, ui) {
        var item = ui.draggable;
        var score = item.data('score')
        scoreBoard += score;
        $('#score').text(scoreBoard);
        item.remove();
      }
    })

  };

//////////////////////////// OBJECTS ////////////////////////////////

  var currentPlayer;

  var player1 = {
    score: 0,
    color: "#F5AA42"
  };

  var player2 = {
    score: 0,
    color: "#B0DB69"
  };

  function Menu(name,main,side) {
    this.name = name;
    this.main = main;
    this.side = side;
    this.image = "<img src='image/orders/" + this.name + ".png'>";
  };

  var burger = new Menu("burger","patty","bread")
  var hotdog = new Menu("hotdog","sausage","bread")
  var steaksalad = new Menu("steaksalad","steak","salad")
  var shrimpsalad = new Menu("shrimpsalad","shrimp","salad")
  var steaksandwich = new Menu("steaksandwich","steak","bread")

  var menus = [burger, hotdog, steaksalad, shrimpsalad, steaksandwich];

  function Food(name,score,pfscore,cooktime,pftime,burntime) {
    this.name = name;
    this.score = score;
    this.pfscore = pfscore;
    this.cooktime = cooktime;
    this.pftime = pftime;
    this.burntime = burntime;
  };

  var patty = new Food("patty",1000,1500,13,5,20);
  var sausage = new Food("sausage",1000,1500,10,5,15);
  var steak = new Food("steak",2000,2500,20,5,30);
  var shrimp = new Food("shrimp",3000,3500,5,3,10);

  var foods = [patty, sausage, steak, shrimp];

/////////////////////////////////////////////////////////////////////

});


