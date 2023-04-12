/*********************
 * Objetivo: EndPoint das funções
 * Data: 27/03/2023
 * Autor: Mateus Alves da Silva
 * Versão: 1.0
 *********************/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const { query } = require('express')

const funcoes = require('./modulo/functions.js')
const listaDeAlunos = require('./modulo/alunos.js')
const listaCursos = require('./modulo/cursos.js');

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')

    //Permite definir quais métodos poderão ser utilizados nas requisições da API
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

app.get('/v1/lion-school/cursos', cors(), async function (request, response, next) {
    let cursos = funcoes.getCursos()

    if (cursos) {
        response.status(200)
        response.json(cursos)
    } else {
        response.status(500)
    }
})

app.get('/v1/lion-school/alunos', cors(), async function (request, response, next) {
    let dadosAluno = {}
    let statusCode
    let alunos
    let status = request.query.status
    let curso = request.query.curso

    //Filtrar por status
    if (status != undefined && curso == undefined) {

        if (!isNaN(status)) {
            statusCode = 400
            dadosAluno.message = 'Não foi possivel processar pois os dados de entrada que foram enviados não corresponde ao exigido, confira o valor, pois não pode ser vazio e precisa ser caracteres'
        } else {
            alunos = funcoes.getAlunosStatus(status, listaDeAlunos.alunos)
        }

        if (alunos) {
            statusCode = 200
            dadosAluno = alunos
        } else {
            statusCode = 400
        }

        //Filtrar por curso
    } else if (curso != undefined && status == undefined) {

        if (!isNaN(curso)) {
            statusCode = 400
            dadosAluno.message = 'Não foi possivel processar pois os dados de entrada que foram enviados não corresponde ao exigido, confira o valor, pois não pode ser vazio e precisa ser caracteres'
        } else {
            alunos = funcoes.getAlunosPorCurso(curso, listaDeAlunos.alunos)
        }

        if (alunos) {
            statusCode = 200
            dadosAluno = alunos
        } else {
            statusCode = 400
        }

    } else if (curso != undefined && status != undefined) {

        if (!isNaN(status) || !isNaN(curso)) {
            statusCode = 400
            dadosAluno.message = 'Não foi possivel processar pois os dados de entrada que foram enviados não corresponde ao exigido, confira o valor, pois não pode ser vazio e precisa ser caracteres'
        } else {
            let alunosPorCurso = funcoes.getAlunosPorCurso(curso, listaDeAlunos.alunos);
            alunos = funcoes.getAlunosPorStatus(status, alunosPorCurso.aluno);
        }

        if (alunos) {
            statusCode = 200
            dadosAluno = alunos
        } else {
            statusCode = 400
        }

    } else {
        alunos = funcoes.getAlunosMatriculados()
    }

    if (alunos) {
        statusCode = 200
        dadosAluno = alunos
    } else {
        statusCode = 400
    }

    response.status(statusCode)
    response.json(dadosAluno)
})

app.get('/v1/lion-school/aluno/:matricula', cors(), async function (request, response, next) {

    let statusCode
    let dadosAluno = {}

    let matriculaAluno = request.params.matricula

    if (matriculaAluno == '' || matriculaAluno == undefined || matriculaAluno.length != 11 || isNaN(matriculaAluno)) {
        statusCode = 400
        dadosAluno.message = 'Não foi possivel processar pois os dados de entrada que foram enviados não corresponde ao exigido, confira o valor, pois não pode ser vazio, precisa ser numeros e ter 11 dígitos,'
    } else {
        let aluno = funcoes.getDetalhesAluno(matriculaAluno)

        if (aluno) {
            statusCode = 200
            dadosAluno = aluno
        } else {
            statusCode = 400
        }
    }

    response.json(dadosAluno)
    response.status(statusCode)
})

app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080.')
})