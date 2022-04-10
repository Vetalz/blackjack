import Card from './Card';
import Player from "./Player";
class Game {
  players = [];
  currentPlayer;
  cardDeck = [];
  endGame = false;
  cardSuitVariant = ['diamond', 'heart', 'spade', 'club'];
  cardValueVariant = [['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7], ['8', 8], ['9', 9], ['10', 10],
    ['J', 10], ['Q', 10], ['K', 10], ['A', 10]];

  constructor() {
    this.addPlayer();
    this.addPlayer();
    this.getCardDeck();
    this.shuffle();
    this.startGiveCards();
  }

  addPlayer() {
    const id = this.players.length + 1;
    this.players.push(new Player(id, `Player ${id}`, []));
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
        this.giveCard(player)
      }
    }
  }

  giveCard(player) {
    player.cards.push(this.cardDeck.shift());
    player.counting()
  }

  stopGame(player) {
    player.isActive = false;
  }

  checkResult() {

  }
}


export default Game;