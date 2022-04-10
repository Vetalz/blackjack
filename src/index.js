import "core-js/stable";
import "regenerator-runtime/runtime";

import Game from './Game';
import Player from './Player';
import Card from './Card';
import './index.scss';

let game = new Game();

let buttonHit = document.getElementById('hit');
let buttonStand = document.getElementById('stand');

buttonHit.addEventListener('click', () => addCard(game.currentPlayer))
buttonStand.addEventListener('click', () => game.stopGame(game.currentPlayer))
startRender();
console.log(game);


function startRender() {
  let divPlayers = document.getElementById('players');
  for (const player of game.players) {
    let elPlayer = document.createElement('div');
    let elCards = document.createElement('div');

    elPlayer.id = player.id;
    elPlayer.className = 'player';
    if (player.id === 1) {
      elPlayer.classList.add('active');
      game.currentPlayer = player;
    }

    elCards.className = 'cards';
    let profile = `<div class="profile">
<!--               <img src="<%= require('./img/avatar_1.png') %>" alt="" class="avatar">-->
                   <h2 class="name">${player.name}</h2>
                 </div>`;
    let score = `<div class="score">
                 <span>${player.score}</span>
               </div>`;

    elPlayer.innerHTML = profile + score;

    for (const card of player.cards) {
      let elCard = document.createElement('div');
      let color = getColor(card.cardSuit);
      elCard.classList.add('card', color);
      elCard.innerHTML = `<div class="top">
                          <span>${card.cardName}</span>
                        </div>
                        <div class="middle">
                          <span>${renderSuit(card.cardSuit)}</span>
                        </div>
                        <div class="bottom">
                          <span>${card.cardName}</span>
                        </div>`;
      elCards.appendChild(elCard);
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
    return 'red'
  }
  return 'black';
}

function addCard(player) {
  game.giveCard(player);
  const elCards = document.querySelector(`[id='${player.id}'] > .cards`);
  const elScore = document.querySelector(`[id='${player.id}'] > .score > span`);
  const elCard = document.createElement('div');
  const card = player.cards[player.cards.length-1];
  const color = getColor(card.cardSuit);
  elCard.classList.add('card', color);
  elCard.innerHTML = `<div class="top">
                          <span>${card.cardName}</span>
                        </div>
                        <div class="middle">
                          <span>${renderSuit(card.cardSuit)}</span>
                        </div>
                        <div class="bottom">
                          <span>${card.cardName}</span>
                        </div>`;
  elCards.appendChild(elCard);
  elScore.innerHTML = player.score;
}
