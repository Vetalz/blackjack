import "core-js/stable";
import "regenerator-runtime/runtime";

import Game from './Game';
import './index.scss';

let game = new Game();

let body = document.getElementById('body');
let buttonHit = document.getElementById('hit');
let buttonHit2 = document.getElementById('cardReverse');
let buttonStand = document.getElementById('stand');

buttonHit.addEventListener('click', () => addCard(game.currentPlayer));
buttonHit2.addEventListener('click', () => addCard(game.currentPlayer));
buttonStand.addEventListener('click', () => playerStand(game.currentPlayer));
startRender();

function startRender() {
  let divPlayers = document.getElementById('players');
  divPlayers.textContent = '';
  for (const player of game.players) {
    let elPlayer = document.createElement('div');
    let elCards = document.createElement('div');

    elPlayer.id = player.id;
    elPlayer.className = 'player';
    if (player.id === 0) {
      elPlayer.classList.add('active');
      game.currentPlayer = player;
    }

    elPlayer.appendChild(createProfile(player));
    elPlayer.appendChild(createScore(player));

    elCards.className = 'cards';

    for (const card of player.cards) {
      elCards.appendChild(createCard(card));
    }

    elPlayer.appendChild(elCards);
    divPlayers.appendChild(elPlayer);
  }
}

function renderSuit(suit) {
  let sign = '';
  switch (suit) {
    case 'diamond':
      sign = '♦'
      break
    case 'heart':
      sign = '♥'
      break
    case 'spade':
      sign = '♠'
      break
    case 'club':
      sign = '♣'
      break
  }
  return sign;
}

function getColor(suit) {
  if (suit === 'diamond' || suit === 'heart') {
    return 'red';
  }
  return 'black';
}

function addCard(player) {
  game.giveCard(player);
  const elPlayer = document.getElementById(player.id);
  const elCards = document.querySelector(`[id='${player.id}'] > .cards`);
  const elScore = document.querySelector(`[id='${player.id}'] > .score > span`);

  const card = player.cards[player.cards.length-1];
  elCards.appendChild(createCard(card))

  elScore.textContent = player.score;
  if (player.isOver) {
    elScore.classList.add('red');
  }
  elPlayer.classList.remove('active');
  nextPlayer();
}

function playerStand(player) {
  game.stopGame(player);
  const elPlayer = document.getElementById(player.id);
  elPlayer.classList.remove('active');
  nextPlayer();
}

function nextPlayer() {
  if (game.result === null) {
    const elPlayer = document.getElementById(game.currentPlayer.id);
    elPlayer.classList.add('active');
  } else {
    renderModalBlock();
  }
}

function renderModalBlock() {
  body.appendChild(createModal());
  let elButton = document.getElementById('modal');
  elButton.addEventListener('click', removeModal);
}

function removeModal() {
  let elModal = document.getElementById('modal');
  elModal.remove();
  game = new Game();
  startRender();
}

function createProfile(player) {
  const profile = document.createElement('div');
  const h2 = document.createElement('h2')

  profile.classList.add('profile');
  h2.classList.add('name');
  h2.textContent = player.name;

  profile.appendChild(h2);

  return profile;
}

function createScore(player) {
  const score = document.createElement('div');
  const span = document.createElement('span');

  score.classList.add('score');
  span.textContent = player.score;

  score.appendChild(span);

  return score;
}

function createCard(card) {
  const elCard = document.createElement('div');
  const top = document.createElement('div');
  const span1 = document.createElement('span');
  const middle = document.createElement('div');
  const span2 = document.createElement('span');
  const bottom = document.createElement('div');
  const span3 = document.createElement('span');
  const color = getColor(card.cardSuit);

  elCard.classList.add('card', color);
  top.classList.add('top');
  middle.classList.add('middle');
  bottom.classList.add('bottom');

  span1.textContent = card.cardName;
  span2.textContent = renderSuit(card.cardSuit);
  span3.textContent = card.cardName;

  top.appendChild(span1);
  middle.appendChild(span2);
  bottom.appendChild(span3);

  elCard.appendChild(top);
  elCard.appendChild(middle);
  elCard.appendChild(bottom);

  return elCard;
}

function createModal() {
  const modalBack = document.createElement('div');
  const modal = document.createElement('div');
  const h2 = document.createElement('h2');
  const h1 = document.createElement('h1');
  const span1 = document.createElement('span');
  const span2 = document.createElement('span');
  const span3 = document.createElement('span');
  const span4 = document.createElement('span');
  const span5 = document.createElement('span');
  const button = document.createElement('button');

  modalBack.classList.add('modal-back');
  modal.classList.add('modal');
  span1.classList.add('black');
  span2.classList.add('red');
  span4.classList.add('red');
  span5.classList.add('black');
  button.classList.add('hit');

  modalBack.id = 'modal';
  button.id = 'again';

  h2.textContent = 'Result';
  span1.textContent = '♠';
  span2.textContent = '♥';
  span3.textContent = game.result;
  span4.textContent = '♦';
  span5.textContent = '♣';
  button.textContent = 'Play again';

  const spans = [span1, span2, span3, span4, span5];
  for (const item of spans) {
    h1.appendChild(item);
  }

  modal.appendChild(h2);
  modal.appendChild(h1);
  modal.appendChild(button);
  modalBack.appendChild(modal);

  return modalBack;
}