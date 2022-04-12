import Player from "./Player";
import getCardDeck from "./cardHelper";

class Game {
  players = [];
  currentPlayer;
  result = null;
  endGame = false;

  constructor() {
    this.addPlayer('Alexander');
    this.addPlayer('Pavel');
    this.addPlayer('Victoria');
    this.cardDeck = getCardDeck();
    this.startGiveCards();
  }

  addPlayer(name) {
    const id = this.players.length;
    this.players.push(new Player(id, name, []));
  }

  startGiveCards() {
    let countStartCard = 2;

    for(let i=1; i <= countStartCard; i++) {
      for (const player of this.players) {
        this.giveCard(player);
      }
    }
  }

  giveCard(player) {
    player.cards.push(this.cardDeck.shift());
    player.counting();

    if (player.isOver) {
      this.nextMove(player);
    }
  }

  nextMove(player) {
    this.checkResult();

    if (this.result === null) {
      this.currentPlayer = null;
      let index = player.id;

      if (index + 1 > this.players.length - 1) {
        index = -1;
      }

      for (let i=index+1; i<this.players.length; i++) {
        if (this.players[i].isOver || this.players[i].isStand) {
          continue;
        }
        this.currentPlayer = this.players[i];
        break;
      }
    }
  }

  stopGame(player) {
    player.isStand = true;
    this.nextMove(player);
  }

  checkResult() {
    let maxScore = 0;
    let playersFall = [];
    let playersStand = [];

    for (const player of this.players) {
      if (player.isOver) {
        playersFall.push(player);
      }
      if (player.isStand) {
        playersStand.push(player);
      }
    }

    if (playersFall.length === this.players.length) {
      this.result = 'Draw';
      return this.result;
    }

    if (playersFall.length + playersStand.length === this.players.length) {
      for (const player of playersStand) {
        if (player.score > maxScore) {
          maxScore = player.score;
          this.result = player.name;
          continue;
        }

        if (player.score === maxScore) {
          this.result = 'Draw';
        }
      }
    }

    return this.result;
  }
}

export default Game;