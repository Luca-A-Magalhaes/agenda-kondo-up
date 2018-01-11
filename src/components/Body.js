import React, { Component } from 'react';
import Contatos from './Contatos.js';
import Mensagens from './Mensagens.js';
import Form from './Form.js';
import '../css/Body.css';
import { Store } from '../store/Store.js';
class Body extends Component{
    render(){
        let side = null;
        if(Store.getState().toggle.form){
            side = <Form />;
        }
        else if(Store.getState().toggle.mensagens){
            let mensagens = Store.getState().mensagens.filter((mensagem) => {
                return mensagem.contato === Store.getState().toggle.contato;
            });
            let contato = undefined;
            Store.getState().contatos.forEach(pos => {
                if(pos.id === Store.getState().toggle.contato){
                    contato = pos;
                }
            });
            side = <Mensagens mensagens={mensagens} contato={contato} />;
        }
        else{
            side = (<div className="App-Capa">
                <h2>Bem vindo a Agenda KondoUp!</h2>
                <h3>Para adicionar um contato clique no botão ao lado</h3>
            </div>);
        }
        return(
            <div className="App-Body">
                <Contatos contatos={Store.getState().contatos} />
                {side}
            </div>
        );
    }
}
export default Body;