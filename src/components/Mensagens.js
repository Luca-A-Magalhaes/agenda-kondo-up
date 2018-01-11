import React, { Component } from 'react';
import '../css/Mensagens.css';
import { Store } from '../store/Store.js';
class Mensagens extends Component{
    render(){
        return(
            <div className="App-mensagens">
                <MensagemHeader contato={this.props.contato} />
                {this.props.mensagens.map((mensagem, i) => {
                    return(<Mensagem mensagem={mensagem} key={i}/>);
                })}
                <div className="Mensagens-form">
                    <input type="text" placeholder="Escreva sua mensagem" ref={ input => {
                        this.input = input;
                    }}/>
                    <button onClick={() => {
                        Store.dispatch({
                            type: 'ADD_MENSAGEM',
                            contato: this.props.contato.id,
                            descricao: this.input.value
                        });
                        this.input.value = '';
                    }}>&#10004;</button>
                </div>
            </div>
        );
    }
}

class MensagemHeader extends Component {
    constructor(props){
        super(props);
        this.handleNome = this.handleNome.bind(this);
        this.handleSobrenome = this.handleSobrenome.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleTelefone = this.handleTelefone.bind(this);
        this.state = {
            id: props.contato.id,
            nome: props.contato.nome,
            sobrenome: props.contato.sobrenome,
            email: props.contato.email,
            telefone: props.contato.telefone
        }
    }
    handleNome(event){
        this.setState(Object.assign({}, this.state, {
            nome: event.target.value
        }));
    }
    handleSobrenome(event){
        this.setState(Object.assign({}, this.state, {
            sobrenome: event.target.value
        }));
    }
    handleEmail(event){
        this.setState(Object.assign({}, this.state, {
            email: event.target.value
        }));
    }
    handleTelefone(event){
        this.setState(Object.assign({}, this.state, {
            telefone: event.target.value
        }));
    }
    componentWillReceiveProps(nextProps){
        if(this.state.id !== nextProps.contato.id){
            this.setState({
                id: nextProps.contato.id,
                nome: nextProps.contato.nome,
                sobrenome: nextProps.contato.sobrenome,
                email: nextProps.contato.email,
                telefone: nextProps.contato.telefone
            })
        }
    }
    render(){
        let corpo = undefined;
        if(this.props.contato.editing){
            corpo = (<div className="Mensagens-header">
                        <div>
                            <div>
                                <input type="text" value={this.state.nome} onChange={this.handleNome}/>
                                <input type="text" value={this.state.sobrenome} onChange={this.handleSobrenome}/>
                            </div>
                            <div>
                                <input type="text" value={this.state.email} onChange={this.handleEmail}/>
                                <input type="text" value={this.state.telefone} onChange={this.handleTelefone}/>
                            </div>
                        </div>
                        <div className="Mensagens-header-menu">
                            <span className="Mensagens-header-save" onClick={() => {
                                let novoContato = Object.assign({}, this.props.contato, {
                                    nome: this.state.nome,
                                    sobrenome: this.state.sobrenome,
                                    email: this.state.email,
                                    telefone: this.state.telefone
                                });
                                Store.dispatch({
                                    type: 'SAVE_EDIT_CONTATO',
                                    contato: novoContato
                                });
                            }}>&#10004;</span>
                            <span className="Mensagens-header-delete" onClick={() => {
                                Store.dispatch({
                                    type: 'DELETE_CONTATO',
                                    id: this.props.contato.id
                                });
                                Store.dispatch({
                                    type: 'TOGGLE_VAZIO'
                                });
                            }}>&#10005;</span>
                        </div>
                    </div>);
        } else{
            corpo = (<div className="Mensagens-header">
                        <div>
                            <h3>{this.props.contato.nome.concat(" ", this.props.contato.sobrenome)}</h3>
                            <p>{this.props.contato.email.concat(" | ", this.props.contato.telefone)}</p>
                        </div>
                        <div className="Mensagens-header-menu">
                            <span className="Mensagens-header-edit" onClick={() => {
                                Store.dispatch({
                                    type: 'BEGIN_EDIT_CONTATO',
                                    contato: this.props.contato
                                });
                            }}>&#10000;</span>
                            <span className="Mensagens-header-delete" onClick={() => {
                                Store.dispatch({
                                    type: 'DELETE_CONTATO',
                                    id: this.props.contato.id
                                });
                                Store.dispatch({
                                    type: 'TOGGLE_VAZIO'
                                });
                            }}>&#10005;</span>
                        </div>
                    </div>);
        }
        return corpo;
    }
}
    
class Mensagem extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: this.props.mensagem.descricao
        }
    }
    handleChange(event){
       this.setState({
           value: event.target.value
       });
    }
    render(){
        let corpo = undefined;
        if(this.props.mensagem.editing){
            corpo = (<div className="Mensagens-mensagem-corpo">
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <a className="Mensagens-mensagem-menu" onClick={() => {
                    let novaMensagem = Object.assign({}, this.props.mensagem, {
                        descricao: this.state.value
                    });
                    Store.dispatch({
                        type: 'SAVE_EDIT_MENSAGEM',
                        mensagem: novaMensagem
                    });
                }}>salvar</a>
                <span className="Mensagens-mensagem-separador">|</span>
                <a className="Mensagens-mensagem-menu" onClick={() => {
                    Store.dispatch({
                        type: 'DELETE_MENSAGEM',
                        id: this.props.mensagem.id
                    });
                }}>excluir</a>
            </div>);
        } else{
            corpo = (<p className="Mensagens-mensagem-corpo">
                        {this.props.mensagem.descricao}
                        <a className="Mensagens-mensagem-menu" onClick={() => {
                            Store.dispatch({
                                type: 'BEGIN_EDIT_MENSAGEM',
                                mensagem: this.props.mensagem
                            });
                        }}>editar</a>
                        <span className="Mensagens-mensagem-separador">|</span>
                        <a className="Mensagens-mensagem-menu" onClick={() => {
                            Store.dispatch({
                                type: 'DELETE_MENSAGEM',
                                id: this.props.mensagem.id
                            });
                        }}>excluir</a>
                    </p>);
        }
        return(
            <div className="Mensagens-mensagem">
                {corpo}
            </div>
        );
    }
}
export default Mensagens;