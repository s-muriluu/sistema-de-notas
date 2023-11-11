class Turma {
    constructor(id, codigo, ano){
        this.id = id,
        this.codigo = codigo,
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
    formAlunos();
    pesquisarAlunos();
    document.getElementById("idAluno").focus();
}

function btnTurmas() {
    cadastrarTurmas();
    pesquisarTurmas();
}

function btnNotas() {
    //
}

function atualizacaoAluno(){
    if (this.idAluno.value == ""){
        document.getElementById("nomeAluno").disabled = true;
        document.getElementById("turmaAluno").disabled = true;
        document.getElementById("btnAtualizarAluno").disabled = true;
        document.getElementById("btnExcluirAluno").disabled = true;
        this.nomeAluno.value = "";
        this.turmaAluno.value = "";
    } else {
        document.getElementById("nomeAluno").disabled = true;
        document.getElementById("turmaAluno").disabled = true;
        document.getElementById("btnAtualizarAluno").disabled = false;
        document.getElementById("btnExcluirAluno").disabled = false;
        for (let cont=0; cont<alunos.length; cont++){
            if (this.idAluno.value == alunos[cont].id) {
                this.nomeAluno.value = alunos[cont].nome;
                this.turmaAluno.value = alunos[cont].turma;
            }
        }
    }
}

function cancelar(){
    document.getElementById("nomeAluno").disabled = true;
    document.getElementById("turmaAluno").disabled = true;
    document.getElementById("btnAtualizarAluno").disabled = true;
    document.getElementById("btnExcluirAluno").disabled = true;
    btnAlunos();
}

function criarAluno() {
    btnAlunos();
    document.getElementById("idAluno").disabled = true;
    document.getElementById("nomeAluno").disabled = false;
    document.getElementById("turmaAluno").disabled = false;
    document.getElementById("btnCriarAluno").disabled = true;
    document.getElementById("btnAdicionarAluno").disabled = false;
    document.getElementById("btnCancelar").disabled = false;
    document.getElementById("nomeAluno").focus();
}

function formAlunos(){
    content.innerHTML = `<div id="formulario">
    <form>
        <label for="idAluno">ID</label><br>
        <input type="text" name="idAluno" id="idAluno" oninput="atualizacaoAluno()"><br>
        <label for="nomeAluno">Nome</label><br>
        <input type="text" name="nomeAluno" id="nomeAluno" disabled><br>
        <label for="turmaAluno">Turma</label><br>
        <input type="text" name="turmaAluno" id="turmaAluno" disabled><br><br>
        <button onclick="criarAluno()" id="btnCriarAluno">Criar Aluno</button>
        <button onclick="addAluno()" id="btnAdicionarAluno" disabled>Adicionar Aluno</button>
        <button onclick="" id="btnAtualizarAluno" disabled>Atualizar Aluno</button>
        <button onclick="excluirAluno()" id="btnExcluirAluno" disabled>Excluir Aluno</button>
        <button onclick="cancelar()" id="btnCancelar" disabled>Cancelar</button>
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
        cell2.innerHTML = turmas[cont].codigo;
        cell3.innerHTML = turmas[cont].ano;
    }
}

function excluirAluno() {
    for (let cont=0; cont<alunos.length; cont++){
        if (this.idAluno.value == alunos[cont].id) {
            alunos.splice(cont, 1);
        }
    }
    localStorage.setItem("Alunos", JSON.stringify(alunos));
    btnAlunos();
}

function addAluno() {
    let aluno = new Aluno(alunos[alunos.length-1].id+1, this.nomeAluno.value, this.turmaAluno.value);
    alunos.push(aluno);
    localStorage.setItem("Alunos", JSON.stringify(alunos));
    btnAlunos();
}

function addTurmas() {
    let turma = new Turma(3, 2, 1);
    turmas.push(turma);
    localStorage.setItem("Turmas", JSON.stringify(turmas));
}