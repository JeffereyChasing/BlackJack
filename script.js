
var da = 0;
var sa = 0;
var d = 0;
var s = 0;
var hand;
var stop = true;


function initiate() {
  var number = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
  var type = ["D", "S", "H", "C"]
  deck = []
  for (let j = 0; j < 4; j++) {
    //first for-loop is to iterate 4 time to simulate the 4 decks of cards combined
    //since people usually play blackjack with multiple decks
    for (let i = 0; i < type.length; i++) {
      //second for-lopp is to get all the types
      for (let k = 0; k < number.length; k++) {
        //third for-loop is to get all the numbers
        deck.push(number[k] + type[i])
        //add it to the deck
      }
    }
  }
}



function shuffle() {
  for (let i = 0; i < deck.length; i++) {
    newposition = Math.floor(Math.random() * 52);
    // the range of the random number is therefore between 0 and 52
    let k = deck[i];
    deck[i] = deck[newposition];
    deck[newposition] = k;
    //swap the card
  }
}

function burn() {
  deck.pop();
}
//remove the first card (Blackjack rule)


function a(c) {
  if (c[0] == "A") {
    return 1;
  } else {
    return 0;
  }
}


function cardvalue(hand) {
  if (isNaN(hand[0]) != true) {
    return parseInt(hand[0]);
  } else {
    if (hand[0] == "A") {
      return 11;
    } else {
      return 10;
    }
  }
}
//design a function to get the value of the card

function reduce(s, sa) {
  while (s > 21 && sa > 0) {
    s = s - 10;
    sa = sa - 1;
  }
  return s;
}

function hit() {
  if (!stop) {
    return;
  } else {
    var imgg1 = document.createElement("img");
    var card1 = deck.pop();
    imgg1.src = card1 + ".jpg";
    s += cardvalue(card1);
    sa += a(card1);
    document.getElementById("hc").append(imgg1);
  }

  if (reduce(s, sa) > 21) {
    stop = false;
  }
}



function stay() {
  d = reduce(d, da);
  s = reduce(s, sa);
  stop = false;
  document.getElementById("hand").src = hand + ".jpg";
}




function deal() {
  while (d < 17) {
    var imgg = document.createElement("img");
    var card = deck.pop();
    imgg.src = card + ".jpg";
    d += cardvalue(card);
    da += a(card);
    d = reduce(d,da);
    document.getElementById("dc").append(imgg);
  }
}




function decider() {
  var result = "";
  if (s > 21) {
    result = "Sorry, you just lost"
  } else if (d > 21) {
    result = "Yeah, you won"
  } else if (s == d) {
    result = "Tie"
  } else if (s > d) {
    result = "Yeah, you won"
  } else if (d > s) {
    result = "Sorry, you just lost"
  }
  document.getElementById("rr").innerText = result;
  document.getElementById("dd").innerText = d;
  document.getElementById("hh").innerText = s;

}









function Game() {
  hand = deck.pop();
  d += cardvalue(hand);
  da += a(hand);
  var imgg = document.createElement("img");
  var card = deck.pop();
  imgg.src = card + ".jpg";
  d += cardvalue(card);
  da += a(card);
  document.getElementById("dc").append(imgg);
  //dealer first two card

  for (let me = 0; me < 2; me++) {
    var imgg1 = document.createElement("img");
    var card1 = deck.pop();
    imgg1.src = card1 + ".jpg";
    s += cardvalue(card1);
    sa += a(card1);
    document.getElementById("hc").append(imgg1);
  }
  document.getElementById("hb").addEventListener("click", hit);
  document.getElementById("sb").addEventListener("click", stay);
  document.getElementById("sb").addEventListener("click", deal);
  document.getElementById("sb").addEventListener("click", decider);

}




window.onload = function() {
  initiate();
  shuffle();
  Game();
}
//window.onload function runs function as soon as the webpage is loaded