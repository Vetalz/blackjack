import Card from './Card';
import Player from "./Player";
class Game {
  players = [];
  currentPlayer;
  result = null;
  cardDeck = [];
  endGame = false;
  cardSuitVariant = ['diamond', 'heart', 'spade', 'club'];
  cardValueVariant = [['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7], ['8', 8], ['9', 9], ['10', 10],
    ['J', 10], ['Q', 10], ['K', 10], ['A', 11]];

  constructor() {
    this.addPlayer('Alexander');
    this.addPlayer('Pavel');
    this.addPlayer('Victoria');
    this.getCardDeck();
    this.shuffle();
    this.startGiveCards();
  }

  addPlayer(name) {
    const id = this.players.length;
    this.players.push(new Player(id, name, []));
  }

  getCardDeck() {
    for (const variant of this.cardSuitVariant) {
      for (const value of this.cardValueVariant) {
        this.cardDeck.push(new Card(variant, value[0], value[1]));
      }
    }
  }

  shuffle() {
    let current = this.cardDeck.length;
    let random;
    while (current !== 0) {
      random = Math.floor(Math.random() * current);
      current--;

      [this.cardDeck[current], this.cardDeck[random]] = [
        this.cardDeck[random], this.cardDeck[current]
      ];
    }
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