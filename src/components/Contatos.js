import React, { Component } from 'react';
import '../css/Contatos.css';
import { Store } from '../store/Store.js';
class Contatos extends Component{
    render(){
        return(
            <div className="App-contatos">
                {this.props.contatos.map((contato, i) => {
                    return(<Contato nome={contato.nome} email={contato.email} contatoId={contato.id} key={i} />);
                })}
                <button className="Contatos-add" onClick={() => {
                    Store.dispatch({
                        type: "TOGGLE_FORM"
                    });
                }}>&#10010;</button>
            </div>
        );
    }
}
const Contato = (props) => {
    return(
        <div className="Contatos-contato" onClick={() => {
            Store.dispatch({
                type: 'TOGGLE_MENSAGEM',
                contato: props.contatoId
            })
        }}>
            <h2>{props.nome}</h2>
            <h4>{props.email}</h4>
        </div>
    );
}
export default Contatos;