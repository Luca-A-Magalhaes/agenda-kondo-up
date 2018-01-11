import { combineReducers } from 'redux';
let contatoIds = 0;
let mensagemIds = 0;
const contato_reducer = (state = [], action) => {
    switch (action.type){
        case 'ADD_CONTATO':
            return [
                ...state,
                {
                    id: contatoIds++,
                    nome: action.nome,
                    sobrenome: action.sobrenome,
                    email: action.email,
                    telefone: action.telefone,
                    editing: false,
                }
            ];
        case 'DELETE_CONTATO':
            return state.filter((contato) => {
                return contato.id !== action.id;
            });
        case 'BEGIN_EDIT_CONTATO':{
            return state.map((contato) => {
                if(contato.id === action.contato.id){
                    return Object.assign({}, action.contato, {
                        editing: true
                    });
                }
                return contato;
            });
            
        }
        case 'SAVE_EDIT_CONTATO':
            return state.map((contato) => {
                if(contato.id === action.contato.id){
                    return {
                        id: action.contato.id,
                        nome: action.contato.nome,
                        sobrenome: action.contato.sobrenome,
                        email: action.contato.email,
                        telefone: action.contato.telefone,
                        editing: false
                    };
                }
                return contato;
            })
            
        default:
            return state;
    }
}

const mensagem_reducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_MENSAGEM':
            return [
                ...state,
                {
                    id: mensagemIds++,
                    contato: action.contato,
                    descricao: action.descricao,
                    editing: false
                }
            ];
        case 'DELETE_MENSAGEM':
            return state.filter((mensagem) => {
                return mensagem.id !== action.id;
            });
        case 'BEGIN_EDIT_MENSAGEM':
            return state.map((mensagem) => {
                if(mensagem.id === action.mensagem.id){
                    return Object.assign({}, action.mensagem, {
                        editing: true
                    });
                }
                return mensagem;
            });
        case 'SAVE_EDIT_MENSAGEM':
            return state.map((mensagem) => {
                if(mensagem.id == action.mensagem.id){
                    return {
                        id: action.mensagem.id,
                        contato: action.mensagem.contato,
                        descricao: action.mensagem.descricao,
                        editing: false
                    };
                }
                return mensagem;
            });
        default:
            return state;
    }
}

const toggle_reducer = (state = { form: false, mensagens: false }, action) => {
    switch(action.type){
        case 'TOGGLE_FORM':
            return {
                contato: undefined,
                form: true,
                mensagem: false,
            };
        case 'TOGGLE_MENSAGEM':
            return {
                contato: action.contato,
                form: false,
                mensagens: true
            };
        case 'TOGGLE_VAZIO':
            return {
                contato: undefined,
                form: false,
                mensagem: false
            }
        default:
            return state;
    }
}

const Reducer = combineReducers({
    contatos: contato_reducer, 
    mensagens: mensagem_reducer,
    toggle: toggle_reducer
});

export default Reducer;