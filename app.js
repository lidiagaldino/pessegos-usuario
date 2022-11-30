const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const controllerTipos = require('./controller/controllerTipos.js')
const controllerMensagem = require('./controller/controllerMensagens.js')
const controllerProdutos = require('./controller/controllerProdutos.js')

const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('./modulo/config.js')

app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())

    next()
})

const jsonParser = bodyParser.json()

app.get('/v1/rooot/tipo/pizza', cors(), async (request, response, next) => {
 
    const dadosTipo = await controllerTipos.listarTiposPizza()

    response.status(dadosTipo.status)
    response.json(dadosTipo)
})

app.get('/v1/tipo/bebida', cors(), async (request, response, next) => {
 
    const dadosTipo = await controllerTipos.listarTiposBebidas()

    response.status(dadosTipo.status)
    response.json(dadosTipo)
})

app.get('/v1/produtos/pizza', cors(), async (request, response, next) => {
 
    const dadosPizza = await controllerProdutos.listarPizzas()

    response.status(dadosPizza.status)
    response.json(dadosPizza)
})

app.get('/v1/produtos/bebida', cors(), async (request, response, next) => {
 
    const dadosBebida = await controllerProdutos.listarBebidas()

    response.status(dadosBebida.status)
    response.json(dadosBebida)
})

app.post('/v1/mensagem', cors(), jsonParser, async (request, response, next) => {

    let headerContentType = request.headers['content-type']
    let statusCode
    let message

    if (headerContentType == 'application/json') {
        
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
             
            const novaMensagem = await controllerMensagem.novaMensagem(dadosBody)

            statusCode = novaMensagem.status
            message = novaMensagem.message

        } else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    
    response.status(statusCode)
    response.json(message)
})

app.get('/v1/produtos/favoritos', cors(), async (request, response, next) => {
 
    const dadosFavoritos = await controllerProdutos.listarFavoritos()

    response.status(dadosFavoritos.status)
    response.json(dadosFavoritos)
})

app.get('/v1/produtos/promocoes', cors(), async (request, response, next) => {
 
    const dadosPromocoes = await controllerProdutos.listarPromocoes()

    response.status(dadosPromocoes.status)
    response.json(dadosPromocoes)
})