const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertMessages = async (mensagem) => {

    try {

        let sql = `insert into tbl_mensagem(texto, nome, email)
                        values( 
                            '${mensagem.texto}',
                            '${mensagem.nome}',
                            '${mensagem.email}'
                        )`;

        const result = await prisma.$executeRawUnsafe (sql);

        if (result) {
            return true;
        }else
            return false;

    } catch (error) {
        return false;
    }
}

module.exports = {
    insertMessages
}