let tamanhoFonte = 100;

function aumentarFonte(){
    tamanhoFonte += 10;
    document.body.style.fontSize = tamanhoFonte + "%";
}

function diminuirFonte(){
    tamanhoFonte -= 10;
    document.body.style.fontSize = tamanhoFonte + "%";
}

function temaClaro() {
    document.body.classList.remove("tema-escuro");
}

function temaEscuro() {
    document.body.classList.add("tema-escuro");
}

const subtopicos = document.querySelectorAll(".subtopico");

subtopicos.forEach(botao => {

    botao.addEventListener("click", () => {

        const conteudo = botao.nextElementSibling;

        if(conteudo.style.display === "block"){
            conteudo.style.display = "none";
        }else{
            conteudo.style.display = "block";
        }

    });

});

function iniciarQuiz(){

    const nome =
        document.getElementById("nome").value.trim();

    if(nome === ""){

        alert("Digite seu nome para iniciar!");

        return;
    }

    document.getElementById("perguntas").style.display =
        "block";

    document.getElementById("nome").disabled = true;
}

function corrigirQuiz(){

    let pontos = 0;

    const respostas = document.querySelectorAll(
        'input[value="certa"]:checked'
    );

    pontos = respostas.length;

    const nome = document.getElementById("nome").value;

    document.getElementById("resultado").innerHTML =
        nome + " acertou " + pontos + " de 5 questões!";

    let ranking =
        JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.push({
        nome: nome,
        pontos: pontos
    });

    ranking.sort((a,b) => b.pontos - a.pontos);

    ranking = ranking.slice(0,3);

    localStorage.setItem(
        "ranking",
        JSON.stringify(ranking)
    );

    mostrarPodio();
}

function mostrarPodio(){

    let ranking =
        JSON.parse(localStorage.getItem("ranking")) || [];

    let lista = document.getElementById("podio");

    lista.innerHTML = "";

    ranking.forEach(jogador => {

        lista.innerHTML +=
        `<li>${jogador.nome} - ${jogador.pontos} pontos</li>`;

    });

}

mostrarPodio();
