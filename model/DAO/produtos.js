const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllPizzas = async () => {

    const sql = `select tbl_produto.id as id_produto, tbl_pizza.id as id_pizza, tbl_produto.nome, tbl_produto.imagem, tbl_produto.descricao, tbl_produto.desconto, tbl_produto.favoritos, round(tbl_produto.preco, 2) as preco, tbl_tamanho.nome as tamamho, tbl_tipo_pizza.tipo  
        from tbl_pizza 
            inner join tbl_produto on tbl_pizza.id_produto = tbl_produto.id 
            inner join tbl_tamanho on tbl_tamanho.id = tbl_pizza.id_tamanho 
            inner join tbl_tipo_pizza on tbl_tipo_pizza.id = tbl_pizza.id_tipo_pizza;`

    const rsPizza = await prisma.$queryRawUnsafe(sql)

    if (rsPizza.length > 0) {
        return rsPizza
    } else{
        return false
    }
}

const selectAllBebidas = async () => {

    const sql = `select tbl_produto.nome, tbl_produto.imagem, tbl_produto.descricao, tbl_produto.desconto, tbl_produto.favoritos, round(tbl_produto.preco, 2) as preco, tbl_tamanho.nome as tamamho, tbl_tipo_bebida.tipo, teor_alcoolico  
        from tbl_bebida 
            inner join tbl_produto on tbl_bebida.id_produto = tbl_produto.id 
            inner join tbl_tamanho on tbl_tamanho.id = tbl_bebida.id_tamanho 
            inner join tbl_tipo_bebida on tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida;`

    const rsPizza = await prisma.$queryRawUnsafe(sql)

    if (rsPizza.length > 0) {
        return rsPizza
    } else{
        return false
    }
}

const selectPizzaById = async (id) => {

    const sql = `select tbl_produto.nome, tbl_produto.imagem, tbl_produto.descricao, tbl_produto.desconto, tbl_produto.favoritos, round(tbl_produto.preco, 2) as preco, tbl_tamanho.nome as tamamho, tbl_tipo_pizza.tipo  
    from tbl_pizza 
        inner join tbl_produto on tbl_pizza.id_produto = tbl_produto.id 
        inner join tbl_tamanho on tbl_tamanho.id = tbl_pizza.id_tamanho 
        inner join tbl_tipo_pizza on tbl_tipo_pizza.id = tbl_pizza.id_tipo_pizza 
    where tbl_pizza.id = ${id}`

    const rsPizza = await prisma.$queryRawUnsafe(sql)

    if(rsPizza.length > 0){
        return rsPizza
    } else{
        return false
    }
}

const selectFavoritos = async () => {

    const sql = `select tbl_produto.nome, tbl_produto.imagem, tbl_produto.descricao, tbl_produto_tamanho.desconto, tbl_produto.favoritos, round(tbl_produto_tamanho.preco, 2) as preco, tbl_tamanho.nome as tamanho
    from tbl_produto 
        inner join tbl_produto_tamanho on tbl_produto_tamanho.id_produto = tbl_produto.id
        inner join tbl_tamanho on tbl_tamanho.id = tbl_produto_tamanho.id_tamanho 
    where tbl_produto.favoritos > 0 order by tbl_produto.favoritos desc limit 10;`

    const rsFavoritos = await prisma.$queryRawUnsafe(sql)

    if (rsFavoritos.length > 0) {
        return rsFavoritos
    } else{
        return false
    }
}

const selectPromocoes = async () => {

    const sql = `select tbl_produto.nome, tbl_produto.imagem, tbl_produto.descricao, tbl_produto_tamanho.desconto, tbl_produto.favoritos, round(tbl_produto_tamanho.preco, 2) as preco, tbl_tamanho.nome as tamanho, round(tbl_produto_tamanho.preco - (tbl_produto_tamanho.preco / tbl_produto_tamanho.desconto), 2) as preco_desconto
    from tbl_produto 
        inner join tbl_produto_tamanho on tbl_produto_tamanho.id_produto = tbl_produto.id
        inner join tbl_tamanho on tbl_tamanho.id = tbl_produto_tamanho.id_tamanho 
    where tbl_produto_tamanho.desconto > 0 order by tbl_produto_tamanho.desconto desc limit 20;`

    const rsPromocoes = await prisma.$queryRawUnsafe(sql)

    if (rsPromocoes.length > 0) {
        return rsPromocoes
    } else{
        return false
    }
}

module.exports = {
    selectAllPizzas,
    selectAllBebidas,
    selectPizzaById,
    selectPromocoes,
    selectFavoritos
}