const input = document.querySelector(".login-input");
const button = document.querySelector(".login-button");
const form = document.querySelector(".login-form");
const checkbox = document.querySelector("#checkbox");
const body = document.querySelector("body");
const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const playerCountInputs = document.querySelectorAll("#player-count input");
const player2Input = document.querySelector(".player2-input");

// Função para limpar os nomes dos jogadores do localStorage
const clearPlayerNames = () => {
    localStorage.removeItem("player1");
    localStorage.removeItem("player2");
};

// Quando a janela é carregada na tela de login, limpa os nomes dos jogadores
if (window.location.pathname === "/index.html") {
    clearPlayerNames();
}

// Função para validar os inputs e habilitar o botão Play
const validarInputs = () => {
    const playerCount = document.querySelector("#player-count input:checked").value;

    // Verificar se o input do jogador 1 é válido
    const isPlayer1Valid = input.value.length > 2;

    // Verificar se o input do jogador 2 é válido, se necessário
    const isPlayer2Valid = playerCount === "2" ? player2Input.value.length > 2 : true;

    // Verificar se o botão Play deve ser habilitado
    const isButtonEnabled = isPlayer1Valid && isPlayer2Valid;

    // Habilitar ou desabilitar o botão Play conforme necessário
    if (isButtonEnabled) {
        button.removeAttribute("disabled");
    } else {
        button.setAttribute("disabled", "");
    }
};

// Atualizar estado do input do jogador 2 quando o número de jogadores é alterado
playerCountInputs.forEach(input => input.addEventListener("click", () => {
    player2Input.style.display = document.querySelector("#player2").checked ? "block" : "none";
    validarInputs();
}));

// Event listener para input do nome do jogador 1
input.addEventListener("input", validarInputs);

// Event listener para input do nome do jogador 2
player2Input.addEventListener("input", validarInputs);

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

// Event listener para clique no botão Play
button.addEventListener("click", () => {
    const playerCount = document.querySelector("#player-count input:checked").value;
    if (input.value.length > 2 && playerCount === "1") {
        localStorage.setItem("player1", input.value); // Salvar nome do jogador 1
        localStorage.removeItem("player2"); // Limpar nome do jogador 2, se existir
        window.location = "./src/pages/game.html"; // Redirecionar para o jogo
    }
});

// Alternar tema escuro/claro
checkbox.addEventListener("change", () => {
    body.classList.toggle("dark");
    input.classList.toggle("dark");
    player2Input.classList.toggle("dark");
});