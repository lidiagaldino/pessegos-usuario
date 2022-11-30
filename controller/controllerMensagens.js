const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')
const newMessage = require('../model/DAO/mensagens.js');

const novaMensagem = async (mensagem) => {

    //validacao de campos obrigatórios  
    if (mensagem.nome == undefined || mensagem.nome == '' || mensagem.email == '' || mensagem.email == undefined || mensagem.texto == '' || mensagem.texto == undefined ) {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    //validacao para verificar email valido
    }else if (!mensagem.email.includes('@')) 
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL};
    else
    {
        //import da model de alun

        //chama funcao para inserir um  novo aluno
        const resultNewMessage = await newMessage.insertMessages(mensagem);

        if (resultNewMessage) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        } else 
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
      }

}

module.exports = {
    novaMensagem
}