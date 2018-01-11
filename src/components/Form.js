import React, { Component } from 'react';
import '../css/Form.css';
import { Store } from '../store/Store.js';
class Form extends Component{
    render(){
        return(
            <div className="App-form">
                <div>
                    <div>
                        <label>Nome</label>
                        <input type="text" placeholder="João" ref={input => {
                            this.nome = input;
                            }}/>
                    </div>
                    <div>
                        <label >Sobrenome</label>
                        <input type="text" placeholder="Da Silva" ref={input => {
                            this.sobrenome = input;
                        }}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label >Email</label>
                        <input type="email" placeholder="joao.da.silva@email.com.br" ref={input => {
                            this.email = input;
                        }}/>
                    </div>
                    <div>
                        <label >Telefone</label>
                        <input type="tel" placeholder="DDD XXXXX XXXX" ref={input => {
                            this.telefone = input;
                        }}/>
                    </div>
                </div>
                <button onClick={() => {
                    Store.dispatch({
                        type: 'ADD_CONTATO',
                        nome: this.nome.value,
                        sobrenome: this.sobrenome.value,
                        email: this.email.value,
                        telefone: this.telefone.value
                    });
                    this.nome.value = '';
                    this.sobrenome.value = '';
                    this.email.value = '';
                    this.telefone.value = '';
                }}>Salvar</button>
            </div>
        );
    }
}
export default Form;