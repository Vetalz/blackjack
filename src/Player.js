class Player {
  isActive = true;
  score = 0;
  constructor(id, name, cards) {
    this.id = id;
    this.name = name;
    this.cards = cards;
  }

  counting() {
    let count = 0;
    for (const card of this.cards) {
      count += card.cardValue;
    }
    this.score = count;
    if (this.score > 21) {
      this.isActive = false;
    }
  }
}

export default Player;