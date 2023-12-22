class Class {
    constructor(id, code, year){
        // INT, PK, AI
        this.id = id,
        this.code = code,
        this.year = year
    }
}

class Student {
    constructor(id, name, studentClass){
        // INT, PK, AI
        this.id = id,
        this.name = name,
        // FK
        this.studentClass = studentClass
    }
}

class Grades {
    constructor(id, student, listGrades){
        // INT, PK, AI
        this.id = id,
        // FK
        this.student = student,
        this.grades = listGrades,
        this.average = ((Number(this.grades[0]) + Number(this.grades[1]) + Number(this.grades[2]) + Number(this.grades[3])) / 4)
    }
}

// Dados do localStorage
let studentsData = localStorage.getItem('StudentsStorage') ? JSON.parse(localStorage.getItem('StudentsStorage')) : new Array();
let classesData = localStorage.getItem('ClassesStorage') ? JSON.parse(localStorage.getItem('ClassesStorage')) : new Array();
let gradesData = localStorage.getItem('GradesStorage') ? JSON.parse(localStorage.getItem('GradesStorage')) : new Array();

// Serve para controle do botão salvar no crud.
// Se option==true o botão salvar servirá para a criação de novos dados
// Se option==false o botão salvar servirá para a atualização de dados existentes
let option = false;

// Alunos
// Chamada de funções ao carregar a página
function load(page) {
    document.getElementById('id').focus();
    if (page == 'student'){
        selectionBox(page);
        search('students');
    } else if (page == 'class'){
        search('classes');
    } else if (page == 'grade'){
        search('grades');
        selectionBox(page);
    }
}

// Adiciona os dados no localStorage
function add(page) {
    if (page == 'student'){
        if (this.studentName.value == '' || this.class.value == ''){
            alert('Por favor, preencha todos os campos');
            create('student');
        } else {
            let studentInfo = new Student(this.id.value, this.studentName.value, this.class.value);
            studentsData.push(studentInfo);
            localStorage.setItem('StudentsStorage', JSON.stringify(studentsData));
        }
    } else if (page == 'class'){
        if (this.code.value == '' || this.year.value == ''){
            alert('Por favor, preencha todos os campos');
            create('class');
        } else {
            let classInfo = new Class(this.id.value, this.code.value, this.year.value);
            classesData.push(classInfo);
            localStorage.setItem('ClassesStorage', JSON.stringify(classesData));
        }
    } else if (page == 'grade'){
        if (this.students.value == ''){
            alert('Por favor, selecione o nome do aluno');
            create('grade');
        } else {
            let gradeInfo = new Grades(this.id.value, this.students.value, [this.grade1.value, this.grade2.value, this.grade3.value, this.grade4.value]);
            gradesData.push(gradeInfo);
            localStorage.setItem('GradesStorage', JSON.stringify(gradesData));
        }
    }
}

// Atualiza o formulário ao recever algum input
function formUpdate(page){
    if (this.id.value == ''){
        document.getElementById('update').disabled = true;
        document.getElementById('delete').disabled = true;
    } else {
        document.getElementById('update').disabled = false;
        document.getElementById('delete').disabled = false;
    }
    if (page == 'student'){
        this.studentName.value = '';
        this.class.value = '';
        if (this.id.value != ''){
            document.getElementById('studentName').disabled = true;
            document.getElementById('class').disabled = true;
            for (let i=0; i < studentsData.length; i++){
                if (this.id.value == studentsData[i].id){
                    this.studentName.value = studentsData[i].name;
                    this.class.value = studentsData[i].studentClass;
                }
            }
        }
    } else if (page == 'class'){
        this.code.value = '';
        this.year.value = '';
        if (this.id.value != ''){
            document.getElementById('code').disabled = true;
            document.getElementById('year').disabled = true;
            for (let i=0; i < classesData.length; i++){
                if (this.id.value == classesData[i].id){
                    this.code.value = classesData[i].code;
                    this.year.value = classesData[i].year;
                }
            }
        }

    } else if (page == 'grade'){
        this.students.value = '';
        this.grade1.value = '';
        this.grade2.value = '';
        this.grade3.value = '';
        this.grade4.value = '';
        if (this.id.value != ''){
            document.getElementById('students').disabled = true;
            document.getElementById('grade1').disabled = true;
            document.getElementById('grade2').disabled = true;
            document.getElementById('grade3').disabled = true;
            document.getElementById('grade4').disabled = true;
            for (let i=0; i < gradesData.length; i++){
                if (this.id.value == gradesData[i].id){
                    this.students.value = gradesData[i].student;
                    this.grade1.value = gradesData[i].grades[0];
                    this.grade2.value = gradesData[i].grades[1];
                    this.grade3.value = gradesData[i].grades[2];
                    this.grade4.value = gradesData[i].grades[3];
                }
            }
        }
    }
}

// Atualiza as informações no localStorage
function updateData(page){
    if (page == 'student'){
        if (this.studentName.value == '' || this.class.value == '') {
            alert('Por favor, preencha todos os campos');
        } else {
            for (let i=0; i < studentsData.length; i++){
                if (this.id.value == studentsData[i].id){
                    studentsData[i].name = document.getElementById('studentName').value;
                    studentsData[i].studentClass = document.getElementById('class').value;
                }
            }
            localStorage.setItem('StudentsStorage', JSON.stringify(studentsData));
        }
    } else if (page == 'class'){
        if (this.code.value == '' || this.year.value == '') {
            alert('Por favor, preencha todos os campos');
        } else {
            for (let i=0; i < classesData.length; i++){
                if (this.id.value == classesData[i].id){
                    classesData[i].code = document.getElementById('code').value;
                    classesData[i].year = document.getElementById('year').value;
                }
            }
            localStorage.setItem('ClassesStorage', JSON.stringify(classesData));
        }
    } else if (page == 'grade'){
        if (this.students.value == '') {
            alert('Por favor, selecione o nome do aluno!');
        } else {
            for (let i=0; i < gradesData.length; i++){
                if (this.id.value == gradesData[i].id){
                    gradesData[i].student = document.getElementById('students').value;
                    gradesData[i].grades = [this.grade1.value, this.grade2.value, this.grade3.value, this.grade4.value];
                    gradesData[i].average = (Number(this.grade1.value) + Number(this.grade2.value) + Number(this.grade3.value) + Number(this.grade4.value)) / 4;
                }
            }
            localStorage.setItem('GradesStorage', JSON.stringify(gradesData));
        }
    }
}

// Insere uma quantidade x de linhas na tabela
function tableInsertRow(cells){
    let cell = new Array();
    let row = document.getElementById('table').insertRow(-1);
    for (let i=0; i < cells; i++){
        cell.push(row.insertCell(i));
    }
    return cell;
}

// Pesquisa os dados no localStorage e adiciona as informações na tabela
function search(page) {
    if (page == 'students'){
        for (let i=0; i < studentsData.length; i++){
            let cell = tableInsertRow(3);
            cell[0].innerHTML = studentsData[i].id;
            cell[1].innerHTML = studentsData[i].name;
            cell[2].innerHTML = studentsData[i].studentClass;
        }
    } else if (page == 'classes'){
        for (let i=0; i < classesData.length; i++){
            let cell = tableInsertRow(3);
            cell[0].innerHTML = classesData[i].id;
            cell[1].innerHTML = classesData[i].code;
            cell[2].innerHTML = classesData[i].year;
        }
    } else if (page == 'grades'){
        for (let i=0; i < gradesData.length; i++){
            let cell = tableInsertRow(7);
            cell[0].innerHTML = gradesData[i].id;
            cell[1].innerHTML = gradesData[i].student;
            cell[2].innerHTML = gradesData[i].grades[0];
            cell[3].innerHTML = gradesData[i].grades[1];
            cell[4].innerHTML = gradesData[i].grades[2];
            cell[5].innerHTML = gradesData[i].grades[3];
            cell[6].innerHTML = gradesData[i].average;
        }
    }
}

// Carrega as turmas na caixa de seleção do formulário
function selectionBox(page) {
    if (page == 'student'){
        let selection = document.getElementById('class')
        for (let i=0; i < classesData.length; i++){
            selection.innerHTML += `<option value='${classesData[i].code}'>${classesData[i].code}</option>`
        }
    } else if (page == 'grade'){
        let selection = document.getElementById('students')
        for (let i=0; i < studentsData.length; i++){
            selection.innerHTML += `<option value='${studentsData[i].name}'>${studentsData[i].name}</option>`
        }
    }
}



// CRUD Elements
function create(page) {
    if (page == 'student'){
        this.studentName.value = '';
        this.class.value = '';
        document.getElementById('studentName').disabled = false;
        document.getElementById('class').disabled = false;
        document.getElementById('studentName').focus();
        document.getElementById('id').value = studentsData.length == 0 ? 0 : Number(studentsData[studentsData.length-1].id)+1;
    } else if (page == 'class'){
        this.code.value = '';
        this.year.value = '';
        document.getElementById('code').disabled = false;
        document.getElementById('year').disabled = false;
        document.getElementById('code').focus();
        document.getElementById('id').value = classesData.length == 0 ? 0 : Number(classesData[classesData.length-1].id)+1;
    } else if (page == 'grade'){
        this.students.value = '';
        this.grade1.value = '';
        this.grade2.value = '';
        this.grade3.value = '';
        this.grade4.value = '';
        document.getElementById('students').disabled = false;
        document.getElementById('grade1').disabled = false;
        document.getElementById('grade2').disabled = false;
        document.getElementById('grade3').disabled = false;
        document.getElementById('grade4').disabled = false;
        document.getElementById('students').focus();
        document.getElementById('id').value = gradesData.length == 0 ? 0 : Number(gradesData[gradesData.length-1].id)+1;
    }
    document.getElementById('id').disabled = true;
    document.getElementById('create').disabled = true;
    document.getElementById('delete').disabled = true;
    document.getElementById('update').disabled = true;
    document.getElementById('save').disabled = false;
    document.getElementById('cancel').disabled = false;
    option = true;
}

function update(page){
    if (page == 'student'){
        if (document.getElementById('studentName').value == ''){
            alert('Nenhum aluno selecionado!');
        } else {
            document.getElementById('studentName').disabled = false;
            document.getElementById('class').disabled = false;
        }
    } else if (page == 'class'){
        if (document.getElementById('code').value == ''){
            alert('Nenhuma turma selecionada!');
        } else {
            document.getElementById('code').disabled = false;
            document.getElementById('year').disabled = false;
        }
    } else if (page == 'grade'){
        if (document.getElementById('students').value == ''){
            alert('Nenhum aluno selecionado!');
        } else {
            document.getElementById('students').disabled = false;
            document.getElementById('grade1').disabled = false;
            document.getElementById('grade2').disabled = false;
            document.getElementById('grade3').disabled = false;
            document.getElementById('grade4').disabled = false;
        }
    }
    document.getElementById('create').disabled = true;
    document.getElementById('delete').disabled = true;
    document.getElementById('save').disabled = false;
    document.getElementById('id').disabled = true;
    document.getElementById('cancel').disabled = false;
    document.getElementById('update').disabled = true;
    option = false;
}

function del(page) {
    if (page == 'student'){
        if (document.getElementById('studentName').value == ''){
            alert('Nenhum aluno selecionado!');
        } else {
                if(confirm('Deseja excluir esse aluno?')){
                    for (let i=0; i < studentsData.length; i++){
                        if (this.id.value == studentsData[i].id){
                            studentsData.splice(i, 1);
                        }
                    }
                    localStorage.setItem('StudentsStorage', JSON.stringify(studentsData));
                } else {
                    cancel('student');
                }
        } 
    } else if (page == 'class'){
        if (document.getElementById('code').value == ''){
            alert('Nenhuma turma selecionada!');
        } else {
            if (confirm('Deseja excluir essa turma?')){
                for (let i=0; i < classesData.length; i++){
                    if (this.id.value == classesData[i].id){
                        classesData.splice(i, 1);
                    }
                }
                localStorage.setItem('ClassesStorage', JSON.stringify(classesData));
            } else {
                cancel('class');
            }
        }
    } else if (page == 'grade'){
        if (document.getElementById('students').value == ''){
            alert('Nenhum aluno selecionado!');
        } else {
            if (confirm('Deseja excluir essas notas?')){
                for (let i=0; i < gradesData.length; i++){
                    if (this.id.value == gradesData[i].id){
                        gradesData.splice(i, 1);
                    }
                }
                localStorage.setItem('GradesStorage', JSON.stringify(gradesData));
            } else {
                cancel('grade');
            }
        }
    }
    location.reload();
}

function save(page){
    if (option){
        add(page);
    }
    else {
        updateData(page);
    }
    location.reload();
}

function cancel(page){
    if (page == 'student'){
        document.getElementById('studentName').value = '';
        document.getElementById('class').value = '';
        document.getElementById('studentName').disabled = true;
        document.getElementById('class').disabled = true;
    } else if (page == 'class'){
        document.getElementById('code').value = '';
        document.getElementById('year').value = '';
        document.getElementById('code').disabled = true;
        document.getElementById('year').disabled = true;
    } else if (page == 'grade'){
        document.getElementById('students').value = '';
        document.getElementById('grade1').value = '';
        document.getElementById('grade2').value = '';
        document.getElementById('grade3').value = '';
        document.getElementById('grade4').value = '';
        document.getElementById('students').disabled = true;
        document.getElementById('grade1').disabled = true;
        document.getElementById('grade2').disabled = true;
        document.getElementById('grade3').disabled = true;
        document.getElementById('grade4').disabled = true;
    }
    document.getElementById('save').disabled = true;
    document.getElementById('delete').disabled = true;
    document.getElementById('cancel').disabled = true;
    document.getElementById('update').disabled = true;
    document.getElementById('create').disabled = false;
    document.getElementById('id').disabled = false;
    document.getElementById('id').value = '';
}

// Função temporária para limpar todos os dados do localStorage
function wipeData(){
    localStorage.clear();
    studentsData = new Array();
    classesData = new Array();
    gradesData = new Array();
    document.getElementById('content').innerHTML = `<div>
    <h2>DADOS APAGADOS<h2>
    </div>`
}