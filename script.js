class Turma {
    constructor(id, num, ano){
        this.id = id,
        this.num = num,
        this.ano = ano
    }
}

class Aluno {
    constructor(id, nome, turma){
        this.id = id,
        this.nome = nome,
        this.turma = turma
    }
}

let dadosAlunos = localStorage.getItem("Alunos");
let alunos = dadosAlunos ? JSON.parse(dadosAlunos) : []
let dadosTurmas = localStorage.getItem("Turmas");
let turmas = dadosTurmas ? JSON.parse(dadosTurmas) : []

let content = document.getElementById("content");

function wipeData(){
    localStorage.clear();
    alunos = []
    turmas = []
}

function btnAlunos() {
    cadastrarAluno();
    pesquisarAlunos();
}

function btnTurmas() {
    cadastrarTurmas();
    pesquisarTurmas();
}

function btnNotas() {
    //
}

function cadastrarAluno(){
    content.innerHTML = `<div id="formulario">
    <form>
        <label for="nome">Nome</label><br>
        <input type="text" name="nome" id="nome"><br>
        <label for="turma">Turma</label><br>
        <input type="text" name="turma" id="turma"><br><br>
        <button onclick="addAluno()">Adicionar Aluno</button>
    </form>
</div>`
}

function cadastrarTurmas(){
    content.innerHTML = `<div id="formulario">
    </div>`
}

function pesquisarAlunos() {
    content.innerHTML += `<div id="pesquisa">
    <table id="tabela">
    <tr>
    <th>ID</th>
    <th>NOME</th>
    <th>TURMA</th>
    </tr>
    </table>
    </div>`
    let tabela = document.getElementById("tabela");
    for (let cont=0; cont < alunos.length; cont++) {
        let row = tabela.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = alunos[cont].id;
        cell2.innerHTML = alunos[cont].nome;
        cell3.innerHTML = alunos[cont].turma;
    }
}

function pesquisarTurmas() {
    content.innerHTML += `<div id="pesquisa">
    <table id="tabela">
    <tr>
    <th>ID</th>
    <th>NUMERO</th>
    <th>ANO</th>
    </tr>
    </table>
    </div>`
    let tabela = document.getElementById("tabela");
    for (let cont=0; cont < turmas.length; cont++) {
        let row = tabela.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = turmas[cont].id;
        cell2.innerHTML = turmas[cont].num;
        cell3.innerHTML = turmas[cont].ano;
    }
}

function addAluno() {
    let aluno = new Aluno(alunos.length, this.nome.value, this.turma.value);
    alunos.push(aluno);
    localStorage.setItem("Alunos", JSON.stringify(alunos));
    btnAlunos();
}

function addTurmas() {
    let turma = new Turma(3, 2, 1);
    turmas.push(turma);
    localStorage.setItem("Turmas", JSON.stringify(turmas));
}