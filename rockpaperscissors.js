var Display = {
  removeInputBox: function() {
    $( "#name-input" ).hide( "blind", 300 );
  },

  addPlayerName: function() {
    $( "#player header .name" ).text( game.player_name );
  },

  addComputerName: function() {
    $( "#computer header .name" ).text( game.computer_name );
  },

  addInstruction: function() {
    $( "#alert-box" ).html( "Choose <u>R</u>ock <u>P</u>aper or <u>S</u>cissors!" );
  },

  updatePoints: function() {
    $( "#player div.wins" ).text( game.wins.player );
    $( "#computer div.wins" ).text( game.wins.computer );
  }
};

function Game() {
  this.init();
  this.computer_name = "Alice";
  this.wins = {
    player: 0,
    computer: 0
  };
}

Game.prototype = {

  keysToHand: {
    114: "rock",
    82: "rock",
    112: "paper",
    80: "paper",
    115: "scissors",
    83: "scissors"
  },

  init: function() {
    this.bindNameInput();
  },

  bindNameInput: function() {
    $( "#name-input" ).submit( function( e ) {
      e.preventDefault();
      game.player_name = $( "#name-input input" ).val();
      Display.removeInputBox();
      Display.addPlayerName();
      Display.addComputerName();
      setTimeout(function(){
        Display.addInstruction();
      }, 300);
      game.bindKeypress();
    });
  },

  bindKeypress: function() {
    $(document).on('keypress', this.play.bind( this ));
  },

  unbindKeypress: function() {
    $( document ).off('keypress');
  },

  play: function( e ) {
    if ( Object.keys(this.keysToHand).indexOf( "" + e.which ) !== -1 ) {
      this.resetHandDisplay();
      this.setPlayerHand( e.which );
      this.chooseComputerHand();
      this.animateHands();
      var that = this;
      setTimeout( function(){
        that.showChoosenHands();
        that.addPoints();
        Display.updatePoints();
        that.bindKeypress();
      }, 1500);
    }
  },

  setPlayerHand: function( key ) {
    this.player_hand = this.keysToHand[key];
    this.unbindKeypress();
  },

  chooseComputerHand: function() {
    var hands = ["rock", "paper", "scissors"];
    this.computer_hand = hands[Math.floor(Math.random() * hands.length )];
  },

  animateHands: function() {
    this.bounceHands();
    this.bounceHands();
    this.bounceHands();
  },

  bounceHands: function() {
    $( ".hand" ).effect( "bounce", {
      distance: 30,
      times: 1,
    }, 500 );
  },

  showChoosenHands: function() {
    $( "#player-hand" ).removeClass( "rock" );
    $( "#computer-hand" ).removeClass( "rock" );
    $( "#player-hand" ).addClass( this.player_hand );
    $( "#computer-hand" ).addClass( this.computer_hand );
  },

  addPoints: function() {
    if ((this.player_hand === "rock" && this.computer_hand === "scissors") ||
        (this.player_hand === "paper" && this.computer_hand === "rock" ) ||
        (this.player_hand === "scissors" && this.computer_hand === "paper")) {
      this.wins.player += 1;
    } else if (this.player_hand === this.computer_hand) {
      return false;
    } else {
      this.wins.computer += 1;
    }
  },

  resetHandDisplay: function() {
    $( ".hand" ).attr( "class", "hand rock" );
  }
};

var game = new Game();
