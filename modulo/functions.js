/*****************************
 * Objetivo: funções para o projeto integrado
 * Data: 24/03/2023
 * Autor: Mateus Alves da Silva
 * Versão: 1.0
 *****************************/
var listaAlunos = require('./alunos.js')
var listaCursos = require('./cursos.js')

const getSiglaDisciplina = function (nomeDisciplina) {
    let palavra = nomeDisciplina
    let ignorar = ['de', 'a']
    let abreviacao = palavra.split(' ')
    let sigla = ''
    console.log(abreviacao)

    if(abreviacao.length === 1){
        sigla = abreviacao[0].slice(0, 2).toUpperCase()
    }else {
        for(let i = 0; i < abreviacao.length; i++){
            let novaPalavra = abreviacao[i]
            if (!ignorar.includes(novaPalavra)){
                sigla += novaPalavra.charAt(0)
            }
        }
    }
    return sigla.toUpperCase()
}

const getCursos = function () {
    let novoJson = {}
    let novoArray = []

    listaCursos.cursos.forEach(function (itemCurso) {
        let jsonInfo = {}
        jsonInfo.nome = itemCurso.nome,
            jsonInfo.sigla = itemCurso.sigla,
            jsonInfo.icone = itemCurso.icone,
            jsonInfo.carga = itemCurso.carga

        novoArray.push(jsonInfo)
    })

    novoJson.cursos = novoArray
    return novoJson

}

const getAlunosMatriculados = function () {
    let novoJson = {}
    let novoArray = []

    listaAlunos.alunos.forEach(function (itemAluno) {
        let jsonAlunos = {}
        jsonAlunos.foto = itemAluno.foto,
            jsonAlunos.nome = itemAluno.nome,
            jsonAlunos.matricula = itemAluno.matricula
        jsonAlunos.sexo = itemAluno.sexo

        novoArray.push(jsonAlunos)
    })

    novoJson.alunos = novoArray
    return novoJson
}

const getDetalhesAluno = function (matriculaAluno) {
    let novoJson = {}
    let novoArray = []
    let arrayDisciplinas = []
    let status = false
    let matricula = matriculaAluno
    
    listaAlunos.alunos.forEach(function (aluno){
        if(aluno.matricula == matricula){

        let jsonAluno = {}
        jsonAluno.foto = aluno.foto,
        jsonAluno.nome = aluno.nome,
        jsonAluno.matricula = aluno.matricula,
        jsonAluno.sexo = aluno.sexo

        aluno.curso.forEach(function (curso){
            jsonAluno.curso = curso.nome,
            jsonAluno.sigla  = curso.sigla

            curso.disciplinas.forEach(function (disciplinas){
                let jsonDisciplinas = {}
                jsonDisciplinas.nome = disciplinas.nome,
                jsonDisciplinas.sigla = getSiglaDisciplina(disciplinas.nome),
                jsonDisciplinas.status = disciplinas.status,
                jsonDisciplinas.media = disciplinas.media

                arrayDisciplinas.push(jsonDisciplinas)
            })
            jsonAluno.disciplinas = arrayDisciplinas
        })
        novoArray.push(jsonAluno)
        status = true
        }
    })

    novoJson.aluno = novoArray

    if (status == true){
        return novoJson
    } else{
        return status
    }
}

const getAlunosPorCurso = function (cursoEscolhido) {
    let novoJson = {}
    let novoArray = []
    let status = false
    let cursoSigla = cursoEscolhido

    listaAlunos.alunos.forEach(function (aluno) {
        aluno.curso.forEach(function (curso) {
            if (curso.sigla.toUpperCase() == cursoSigla.toUpperCase()) {
                let jsonAluno = {}
                jsonAluno.foto = aluno.foto,
                    jsonAluno.nome = aluno.nome,
                    jsonAluno.sexo = aluno.sexo,
                    jsonAluno.matricula = aluno.matricula,
                    jsonAluno.curso = curso.nome,
                    jsonAluno.sigla = curso.sigla
                    jsonAluno.status = aluno.status
                    novoArray.push(jsonAluno)
            }
            status = true
        })
    })
    novoJson.alunos = novoArray

    if (status == true) {
        return novoJson
    } else {
        return status
    }
}

const getAlunosPorStatus = function (statusAluno) {
    let novoJson = {}
    let novoArray = []
    let situacao = false
    let status = statusAluno

    listaAlunos.alunos.forEach(function (aluno) {
        if (aluno.status.toUpperCase() == status.toUpperCase()) {
            let jsonAluno = {}
            jsonAluno.foto = aluno.foto,
                jsonAluno.nome = aluno.nome,
                jsonAluno.sexo = aluno.sexo,
                jsonAluno.matricula = aluno.matricula,
                jsonAluno.status = aluno.status
                jsonAluno.curso = aluno.curso[0].nome
                jsonAluno.dataConclusao = aluno.curso[0].conclusao
                novoArray.push(jsonAluno)
        }
       
        situacao = true
    })
    novoJson.alunos = novoArray

    if (situacao == true) {
        return novoJson
    } else {
        return situacao
    }
}

module.exports = {
    getCursos,
    getAlunosMatriculados,
    getDetalhesAluno,
    getAlunosPorCurso,
    getAlunosPorStatus
}