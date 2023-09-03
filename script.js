/*
Sistema para treinar logica de programacao no JS
Utilizado console para saida de dados e prompt para entrada
Funcionalidades:
- Cadastro de alunos
- Cadastro de notas
  -> serao armazenados 4 notas
- Listagem dos alunos e medias
*/

class Aluno {
    constructor(nome) {
        // propriedades nome aluno
        this.nome = nome,
        // propriedade notas seras
        this.notas = [],
        // soma das notas
        this.total = 0,

        // metodo para calcular media aluno
        this.media = function() {
            this.notas.forEach(nota => {
                // soma todas as notas
                this.total += nota;
            });
            // retorna a media
            return this.total / 4;
        };
    }
}

function menu(){
    return prompt(`
---------------------------
[ 1 ] Cadastro aluno
[ 2 ] Cadastro notas
[ 3 ] Media alunos
[ 0 ] Sair
---------------------------
Escolha uma opcao do menu:`);
}

function criarAluno() {
    let aluno = new Aluno(prompt('Digite o nome do aluno:'));
    console.log(`Aluno ${aluno.nome} cadastrado`);
    return aluno;
}

function listAlunos(){
    console.log(`Lista de alunos
---------------------------
Cod - Nome
---------------------------`);
    for (let aluno of alunos.entries()){
        console.log(`${aluno[0]} - ${aluno[1].nome}`);
    }
    console.log('---------------------------');
}

// listagem dos nomes dos alunos e medias
function listMedias(){
    console.log(`---------------------------
Nome - Media`);
    alunos.forEach(aluno =>{
        // ira verificar se o aluno tem notas lancadas
        if (aluno.notas.length != 0){
            console.log(`${aluno.nome} - ${aluno.media()}`);
        } else {
            console.log(`${aluno.nome} - Notas nao cadastradas`);
        }
    })
}

function cadastrarNotas(cod){
    console.log(`Notas do aluno ${alunos[cod].nome}`);
    let nota;
    for (let cont = 1; cont <= 4; cont++){
        nota = parseFloat(prompt(`Nota ${cont}`));
        console.log(`Nota ${cont} = ${nota}`);
        // verifica se nota digitada esta entre 0 a 10
        if (nota < 0 || nota > 10){
            console.log('Nota invalida! Digite novamente.')
            cont--;
        } else {
            alunos[cod].notas.push(nota);
        }
    }
}

// verifica se ja foram lancadas notas para o aluno
function varreduraNotas(cod){
    if (alunos[cod].notas.length == 0) {
        // nenhuma nota lancada
        return false;
    } else {
        // notas ja lancadas
        return true;
    }
}

// var para armazenar todos os alunos
var alunos = new Array();
// var para navegar pelo menu
var opcao = null;

// main loop
while (opcao != 0){
    // chamada funcao menu, escolha do usuario armazenada na var opcao
    opcao = menu();
    switch (opcao){
        case '1':
            // Cadastro aluno
            alunos.push(criarAluno());
            break;
        case '2':
            // Cadastro notas
            // se houver alunos cadastrados ira listar
            if (alunos.length > 0){
                listAlunos();
                aluno = prompt('Escolha um aluno para dar nota:');
                if (aluno > alunos.length-1){
                    console.log('Opcao invalida!');
                    break;
                } else if (varreduraNotas(aluno)) {
                    // chamada varredura
                    // return true
                    console.log('Notas do aluno ' + alunos[aluno] + ' ja foram cadastradas');
                    break;
                } else {
                    // chamada funcao para cadastro
                    // return false
                    cadastrarNotas(aluno);
                }
            } else {
                // mensagem quando nao ha alunos cadastrados
                console.log('Nao ha alunos cadastrados!')
            }
            break;
        case '3':
            // Media alunos
            console.log('Listando medias:');
            listMedias();
            break;
        case '0':
            // Sair
            console.log('Volte sempre!');
            break;
        default:
            // Tratando excecoes
            console.log('Opcao invalida!');
            break;
    }
    console.log('---------------------------');
}
