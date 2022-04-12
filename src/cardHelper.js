import Card from "./Card";

function getCardDeck() {
  let cardDeck = [];
  const cardSuitVariant = ['diamond', 'heart', 'spade', 'club'];
  const cardValueVariant = [['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7], ['8', 8], ['9', 9], ['10', 10],
    ['J', 10], ['Q', 10], ['K', 10], ['A', 11]];

  for (const variant of cardSuitVariant) {
    for (const value of cardValueVariant) {
      cardDeck.push(new Card(variant, value[0], value[1]));
    }
  }
  return shuffle(cardDeck);
}

function shuffle(cardDeck) {
  let current = cardDeck.length;
  let random;
  while (current !== 0) {
    random = Math.floor(Math.random() * current);
    current--;

    [cardDeck[current], cardDeck[random]] = [
      cardDeck[random], cardDeck[current]
    ];
  }
  return cardDeck;
}

export default getCardDeck;