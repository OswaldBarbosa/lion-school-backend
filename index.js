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

const funcoes = require('./modulo/functions.js')

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')

    //Permite definir quais métodos poderão ser utilizados nas requisições da API
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

app.get('/v1/lion-school/cursos/', cors(), async function (request, response, next) {

    let cursos = funcoes.getCursos()

    if (cursos) {
        response.status(200)
        response.json(cursos)
    } else {
        response.status(500)
    }
})

app.get('/v1/lion-school/alunos/', cors(), async function (request, response, next) {

    let alunos = funcoes.getAlunosMatriculados()

    if (alunos) {
        response.status(200)
        response.json(alunos)
    } else {
        response.status(500)
    }
})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function (request, response, next) {
    let statusCode
    let dadosAluno = {}

    let matriculaAluno = request.params.matricula

    if (matriculaAluno == '' || matriculaAluno == undefined || isNaN(matriculaAluno)) {
        statusCode = 400
        dadosAluno.message = 'Não foi possivel processar pois os dados de entrada (matricula) que foram enviados não corresponde ao exigido, confira o valor, pois não pode ser vazio e precisam ser numeros '
    } else {
        let aluno = funcoes.getDetalhesAluno(matriculaAluno)
        
        if (aluno) {
            statusCode = 200
            dadosAluno = aluno
        } else {
            response.status(500)
        }
    }
        response.status(statusCode)
        response.json(dadosAluno)
})

app.listen(8080, function () {
    console.log('servidor aguardando requisições na porta 8080.')
})