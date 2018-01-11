import React, { Component } from 'react';
import '../css/Header.css';
import { Store } from '../store/Store.js';

class Header extends Component{
    render(){
        return(
            <header className="App-header" onClick={() => {
                Store.dispatch({
                    type: 'TOGGLE_VAZIO'
                });
            }}>
                <h1 className="App-title">Agenda KondoUp</h1>
            </header>
        );
    }
}

export default Header;