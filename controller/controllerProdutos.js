const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')
const produtos = require('../model/DAO/produtos.js')

const listarPizzas = async () => {

    let pizzasJSON = {}

    const dados = await produtos.selectAllPizzas()

    if (dados) {
        pizzasJSON.message = dados
        pizzasJSON.status = 200
    } else{
        pizzasJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        pizzasJSON.status = 404
    }

    return pizzasJSON
}

const listarBebidas = async () => {

    let bebidasJSON = {}

    const dados = await produtos.selectAllBebidas()

    if (dados) {
        bebidasJSON.message = dados
        bebidasJSON.status = 200
    } else{
        bebidasJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        bebidasJSON.status = 404
    }

    return bebidasJSON
}

const listarFavoritos = async () => {

    let dadosFavoritosJSON = {}

    const dadosFavoritos = await produtos.selectFavoritos()

    if (dadosFavoritos) {
        dadosFavoritosJSON.status = 200
        dadosFavoritosJSON.message = dadosFavoritos
    } else{
        dadosFavoritosJSON.status = 404
        dadosFavoritosJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    return dadosFavoritosJSON
}

const listarPromocoes = async () => {

    let dadosPromocoesJSON = {}

    const dadosPromocoes = await produtos.selectPromocoes()

    if (dadosPromocoes) {
        dadosPromocoesJSON.status = 200
        dadosPromocoesJSON.message = dadosPromocoes
    } else{
        dadosPromocoesJSON.status = 404
        dadosPromocoesJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    return dadosPromocoesJSON
}

module.exports = {
    listarPizzas,
    listarBebidas,
    listarFavoritos,
    listarPromocoes
}