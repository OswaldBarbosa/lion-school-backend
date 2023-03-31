/*****************************
 * Objetivo: funções para o projeto integrado
 * Data: 24/03/2023
 * Autor: Mateus Alves da Silva
 * Versão: 1.0
 *****************************/
var listaAlunos = require('./alunos.js')
var listaCursos = require('./cursos.js')

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
    let novoArray = []
    let novoJson = {}
    let arrayDisciplina = []
    let situacao = false
    let matricula = matriculaAluno

    listaAlunos.alunos.forEach(function (aluno) {
        if (matriculaAluno == matricula) {
                novoArray.foto = aluno.foto,
                novoArray.nome = aluno.nome,
                novoArray.matricula = aluno.matricula,
                novoArray.sexo = aluno.sexo

            aluno.curso.forEach(function (dadosCurso) {
                novoArray.curso = dadosCurso

                dadosCurso.disciplinas.forEach(function (dadosDisciplinas) {
                    arrayDisciplina.disciplinas = dadosDisciplinas
                    novoArray.curso.disciplinas = arrayDisciplina
                    novoArray.status = aluno.status

                    situacao = true
                })
            })
        }
    })

    novoJson.alunos = novoArray

    if (situacao == true) {
        return novoJson
    } else {
        return situacao
    }
}

const getAlunosPorCurso = function (cursoEscolhido) {
    let novoJson = {}
    let novoArray = []
    let status = false
    let cursoSigla = cursoEscolhido

    listaAlunos.alunos.forEach(function (aluno) {
        aluno.curso.forEach(function (curso) {
            if (curso.sigla.toUpperCase() == cursoSigla) {
                let jsonAluno = {}
                jsonAluno.foto = aluno.foto,
                    jsonAluno.nome = aluno.nome,
                    jsonAluno.sexo = aluno.sexo,
                    jsonAluno.matricula = aluno.matricula,
                    jsonAluno.curso = curso.nome,
                    jsonAluno.sigla = curso.sigla
                    
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
        if (aluno.status == status) {
            let jsonAluno = {}
            jsonAluno.foto = aluno.foto,
                jsonAluno.nome = aluno.nome,
                jsonAluno.sexo = aluno.sexo,
                jsonAluno.matricula = aluno.matricula,
                jsonAluno.status = aluno.status
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