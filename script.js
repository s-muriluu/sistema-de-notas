class Turma {
    constructor(id, codigo, ano){
        // INT, PK, AI
        this.id = id,
        this.codigo = codigo,
        this.ano = ano
    }
}

class Aluno {
    constructor(id, nome, turma){
        // INT, PK, AI
        this.id = id,
        this.nome = nome,
        // FK
        this.turma = turma
    }
}

class Notas {
    constructor(id, aluno, listaNotas){
        // INT, PK, AI
        this.id = id,
        // FK
        this.aluno = aluno,
        this.notas = listaNotas,
        this.media = ((this.notas[0] + this.notas[1] + this.notas[2] + this.notas[3]) / 4)
    }
}

// Puxando informações salvas no localStorage
let dadosAlunos = localStorage.getItem('Alunos');
let alunos = dadosAlunos ? JSON.parse(dadosAlunos) : new Array();
let dadosTurmas = localStorage.getItem('Turmas');
let turmas = dadosTurmas ? JSON.parse(dadosTurmas) : new Array();
let dadosNotas = localStorage.getItem('Notas');
let notas = dadosNotas ? JSON.parse(dadosNotas) : new Array();

let content = document.getElementById('content');

let opcao = false;

function tableInsertRow(cells){
    let cell = new Array();
    let row = document.getElementById("tabela").insertRow(-1);
    for (let cont=0; cont < cells; cont++){
        cell.push(row.insertCell(cont));
    }
    return cell;
}

// Alunos

function btnAlunos() {
    caixaSelecaoTurmas();
    pesquisarAlunos();
    document.getElementById('id').focus();
}

function addAluno() {
    if (this.nomeAluno.value == '' || this.turmaAluno.value == '') {
        alert('Por favor, preencha todos os campos');
        criar();
    } else {
        let aluno = new Aluno(this.id.value, this.nomeAluno.value, this.turmaAluno.value);
        alunos.push(aluno);
        localStorage.setItem("Alunos", JSON.stringify(alunos));
    }
}



function atualizacaoAluno(){
    this.nomeAluno.value = '';
    this.turmaAluno.value = '';
    if (this.id.value == ''){
        document.getElementById('nomeAluno').disabled = true;
        document.getElementById('turmaAluno').disabled = true;
        document.getElementById('crudAtualizar').disabled = true;
        document.getElementById('crudExcluir').disabled = true;
    } else {
        document.getElementById('nomeAluno').disabled = true;
        document.getElementById('turmaAluno').disabled = true;
        document.getElementById('crudAtualizar').disabled = false;
        document.getElementById('crudExcluir').disabled = false;
        for (let cont=0; cont<alunos.length; cont++){
            if (this.id.value == alunos[cont].id) {
                this.nomeAluno.value = alunos[cont].nome;
                this.turmaAluno.value = alunos[cont].turma;
            }
        }
    }
}



function attAluno(){
    if (this.nomeAluno.value == '' || this.turmaAluno.value == '') {
        alert('Por favor, preencha todos os campos');
    } else {
        alunos[document.getElementById("id").value].nome = document.getElementById('nomeAluno').value;
        alunos[document.getElementById("id").value].turma = document.getElementById('turmaAluno').value;
        localStorage.setItem("Alunos", JSON.stringify(alunos));
    }
}



function pesquisarAlunos() {
    for (let cont=0; cont < alunos.length; cont++) {
        let cell = tableInsertRow(3);
        cell[0].innerHTML = alunos[cont].id;
        cell[1].innerHTML = alunos[cont].nome;
        cell[2].innerHTML = alunos[cont].turma;
    }
}



// Turmas

function btnTurmas() {
    pesquisarTurmas();
}

function addTurmas() {
    let turma = new Turma(turmas.length == 0 ? 0 : turmas[turmas.length-1].id+1, 2, 1);
    turmas.push(turma);
    localStorage.setItem("Turmas", JSON.stringify(turmas));
    location.reload();
}

function pesquisarTurmas() {
    for (let cont=0; cont < turmas.length; cont++) {
        let cell = tableInsertRow(3);
        cell[0].innerHTML = turmas[cont].id;
        cell[1].innerHTML = turmas[cont].codigo;
        cell[2].innerHTML = turmas[cont].ano;
    }
}

function caixaSelecaoTurmas() {
    let selecao = document.getElementById("turmaAluno")
    for (let cont=0; cont < turmas.length; cont++){
        selecao.innerHTML += `<option value="${turmas[cont].codigo}">${turmas[cont].codigo}</option>`
    }
}

// Notas

function btnNotas() {
    pesquisarNotas();
}

function addNotas() {
    let notasAluno = new Notas(notas.length == 0 ? 0 : notas[notas.length-1].id+1, 'Aluno', [10, 10, 10, 10]);
    notas.push(notasAluno);
    localStorage.setItem("Notas", JSON.stringify(notas));
    location.reload();
}

function pesquisarNotas() {
    for (let cont=0; cont < notas.length; cont++) {
        let cell = tableInsertRow(7);
        cell[0].innerHTML = notas[cont].id;
        cell[1].innerHTML = notas[cont].aluno;
        cell[2].innerHTML = notas[cont].notas[0];
        cell[3].innerHTML = notas[cont].notas[1];
        cell[4].innerHTML = notas[cont].notas[2];
        cell[5].innerHTML = notas[cont].notas[3];
        cell[6].innerHTML = notas[cont].media;
    }
}

// Função temporária para limpar todos os dados do localStorage
function wipeData(){
    localStorage.clear();
    alunos = new Array();
    turmas = new Array();
    notas = new Array();
    content.innerHTML = `<div>
    <h2>DADOS APAGADOS<h2>
    </div>`
}

//CRUD

function criar(page) {
    this.nomeAluno.value = '';
    this.turmaAluno.value = '';
    document.getElementById('id').focus();
    document.getElementById("id").disabled = true;
    document.getElementById("nomeAluno").disabled = false;
    document.getElementById("turmaAluno").disabled = false;
    document.getElementById("crudCriar").disabled = true;
    document.getElementById("crudExcluir").disabled = true;
    document.getElementById("crudAtualizar").disabled = true;
    document.getElementById("crudSalvar").disabled = false;
    document.getElementById("crudCancelar").disabled = false;
    document.getElementById("nomeAluno").focus();
    document.getElementById("id").value = alunos.length == 0 ? 0 : Number(alunos[alunos.length-1].id)+1;
    opcao = true;
}

function atualizar(page){
    if (document.getElementById('nomeAluno').value == ''){
        alert('Nenhum aluno selecionado!');
    } else {
        document.getElementById('crudCriar').disabled = true;
        document.getElementById('crudExcluir').disabled = true;
        document.getElementById('crudSalvar').disabled = false;
        document.getElementById('id').disabled = true;
        document.getElementById('nomeAluno').disabled = false;
        document.getElementById('turmaAluno').disabled = false;
        document.getElementById('crudCancelar').disabled = false;
        document.getElementById('crudAtualizar').disabled = true;
        opcao = false;
    }
}

function excluir(page) {
    if (document.getElementById('nomeAluno').value == ''){
        alert('Nenhum aluno selecionado!');
    } else {
        if (confirm('Deseja excluir esse aluno?')){
            for (let cont=0; cont<alunos.length; cont++){
                if (this.id.value == alunos[cont].id) {
                    alunos.splice(cont, 1);
                }
            }
            localStorage.setItem("Alunos", JSON.stringify(alunos));
            location.reload();
        } else {
            cancelar();
        }
        
    }
}

function salvar(page){
    if (opcao){
        addAluno();   
    }
    else {
        attAluno();
    }
    location.reload();
}

function cancelar(page){
    if (page == 'alunos'){
        document.getElementById("nomeAluno").value = '';
        document.getElementById("turmaAluno").value = '';
        document.getElementById("nomeAluno").disabled = true;
        document.getElementById("turmaAluno").disabled = true;
    }
    document.getElementById("crudSalvar").disabled = true;
    document.getElementById("crudExcluir").disabled = true;
    document.getElementById("crudCancelar").disabled = true;
    document.getElementById("crudAtualizar").disabled = true;
    document.getElementById("crudCriar").disabled = false;
    document.getElementById("id").disabled = false;
    document.getElementById("id").value = '';
}