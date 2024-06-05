// Lista de personagens do jogo
let characters1 = [
  "Albert_Einstein",
  "Colisao",
  "Galileu",
  "Isaac_Newton",
  "Metros_segundos",
  "Retrogrado",
  "Sorvetao",
  "Sorvete",
  "Torriceli",
  "Velocidade_media",
];

let characters2 = [
  "Schrodinger",
  "Referencial",
  "Nicolaus",
  "Marie_Curie",
  "Inercia",
  "Gravidade",
  "Fisica_quantica",
  "Buraco_negro",
  "Atomo",
  "Acao_reacao",
];

let currentCharacters = characters1; // Conjunto de personagens atual

// Função para iniciar um novo jogo com o conjunto de personagens oposto
const startNewGame = () => {
  // Verifica qual conjunto de personagens foi utilizado no jogo atual
  if (currentCharacters === characters1) {
    currentCharacters = characters2; // Se foi characters1, muda para characters2
  } else {
    currentCharacters = characters1; // Se foi characters2, muda para characters1
  }
  grid.innerHTML = ""; // Limpa as cartas existentes
  loadGame(); // Carrega o jogo com o novo conjunto de personagens
  restartTimer(); // Reinicia o cronômetro
  // Remove o modal de fim de jogo, se existir
  const modalEndGame = document.querySelector(".modal");
  if (modalEndGame) {
    modalEndGame.remove();
  }

  // Define o nome do jogador no modal
  const playerName1 = localStorage.getItem("player1") || "Jogador";
  const playerName2 = localStorage.getItem("player2");
  const modalEndGameTitle = document.querySelector(".modal-title");
  if (playerName2) {
    modalEndGameTitle.innerHTML = `<span>Parabéns ${playerName1} & ${playerName2}! Vocês venceram!</span>`;
  } else {
    modalEndGameTitle.innerHTML = `<span>Parabéns ${playerName1}! Você venceu!</span>`;
  }
};

// Seleciona os elementos HTML necessários
const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const body = document.querySelector("body");
const main = document.querySelector("main");
const form = document.querySelector(".login-form");
const input = document.querySelector(".login-input");
const playerCountInputs = document.querySelectorAll("#player-count input");
const player2Input = document.querySelector(".player2-input");

// Função para criar elementos HTML com classe
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

// Variáveis para armazenar as cartas viradas
let firstCard = "";
let secondCard = "";

// Função para verificar se o jogo terminou
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  // Verifica se todas as cartas foram desativadas
  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    const FinishTime = timer.innerHTML;
    // Cria um modal de fim de jogo com opções de menu, reinício, créditos e novo jogo
    setTimeout(() => {
      const modalEndGame = createElement("div", "modal");
      const modalEndGameTitle = createElement("div", "modal-title");
      const modalEndGameContent = createElement("div", "modal-content");
      const spanMenu = createElement("i", "fa-solid fa-house fa-2xl");
      const spanRestart = createElement("i", "fa-solid fa-arrow-rotate-right fa-2xl");
      const spanNewGame = createElement("i", "fa-solid fa-chevron-right fa-2xl"); // Ícone para o botão "Novo Jogo"
      const menu = document.createElement("a");
      const restart = document.createElement("a");
      const newGame = document.createElement("button"); // Botão para iniciar um novo jogo
      menu.setAttribute("href", "../../index.html");
      menu.appendChild(spanMenu);
      restart.appendChild(spanRestart);

      newGame.appendChild(spanNewGame); // Adiciona o ícone ">" ao botão "Novo Jogo"
      newGame.addEventListener("click", startNewGame); // Adiciona evento de clique para iniciar um novo jogo
      newGame.classList.add("modal-button"); // Adiciona a classe do estilo dos botões do modal

      body.appendChild(modalEndGame);
      modalEndGame.appendChild(modalEndGameTitle);
      modalEndGame.appendChild(modalEndGameContent);
      const playerName1 = localStorage.getItem("player1") || "Jogador";
      const playerName2 = localStorage.getItem("player2");
      if (playerName2) {
        modalEndGameTitle.innerHTML = `<span>Parabéns ${playerName1} & ${playerName2}! Vocês venceram em ${FinishTime}s</span>`;
      } else {
        modalEndGameTitle.innerHTML = `<span>Parabéns ${playerName1}! Você venceu em ${FinishTime}s</span>`;
      }
      modalEndGameContent.appendChild(menu);
      modalEndGameContent.appendChild(restart).addEventListener("click", () => location.reload());
      modalEndGameContent.appendChild(newGame); // Adiciona o botão "Novo Jogo" ao modal

      // Remove as cartas do tabuleiro
      document.querySelectorAll('.card').forEach(card => {
        card.remove();
      });
    }, 400);
  }
};

// Função para verificar se as cartas viradas são iguais
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  // Se as cartas forem iguais, desative-as e verifique se o jogo terminou
  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    // Se as cartas não forem iguais, vire-as de volta após um intervalo
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

// Função para virar uma carta
const revealCard = ({ target }) => {
  // Verifica se a carta já está virada ou se o clique ocorreu fora do tabuleiro
  if (target.parentNode.className.includes("reveal-card") || target.parentNode.className.includes("grid")) {
    return;
  }

  // Se a primeira carta estiver vazia, vire-a
  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    // Se a segunda carta estiver vazia, vire-a e verifique se as cartas são iguais
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

// Função para criar uma carta com um personagem específico
const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${character}.png')`;
  front.setAttribute("draggable", "true"); // Adicionado atributo draggable

  // Adiciona evento de clique para abrir a imagem em uma nova guia
  front.addEventListener("click", () => {
    const imageURL = `../images/${character}.png`;
    window.open(imageURL, "_blank");
  });

  // Adiciona evento de arrastar para evitar o bloqueio da imagem
  front.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);
  return card;
};

// Função para carregar o jogo
const loadGame = () => {
  const duplicateCharacters = [...currentCharacters, ...currentCharacters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

// Função para iniciar o cronômetro
const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

// Função para reiniciar o cronômetro
const restartTimer = () => {
  clearInterval(this.loop);
  timer.innerHTML = "0";
  startTimer();
};

// Quando a janela é carregada, define o nome do jogador, inicia o cronômetro e carrega o jogo
window.onload = () => {
  const playerName1 = localStorage.getItem("player1") || "Jogador";
  const playerName2 = localStorage.getItem("player2");
  if (playerName2) {
    spanPlayer.innerHTML = `${playerName1} & ${playerName2}`;
  } else {
    spanPlayer.innerHTML = playerName1;
  }
  startTimer();
  loadGame();
};

// Event listener para submissão do formulário de login
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const playerCount = document.querySelector("#player-count input:checked").value;

  if (input.value.length > 2) {
    if (playerCount === "1") {
      localStorage.setItem("player1", input.value); // Salvar nome do jogador 1
      localStorage.removeItem("player2"); // Limpar nome do jogador 2, se existir
    } else if (playerCount === "2" && player2Input.value.length > 2) {
      localStorage.setItem("player1", input.value); // Salvar nome do jogador 1
      localStorage.setItem("player2", player2Input.value); // Salvar nome do jogador 2
    }
    window.location = "./src/pages/game.html"; // Redirecionar para o jogo
  }
});