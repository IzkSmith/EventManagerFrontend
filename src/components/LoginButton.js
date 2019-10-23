import React, { Component } from 'react';
import AuthService from '../service/AuthService';

export default class LoginButton extends Component {
    render() {
        this.Auth = new AuthService();
        let loginButton = (!this.Auth.loggedIn()) ?
            <button type="button" className="logout" onClick={()=>{window.location.href =('/')}}>Login</button> : '';

        return (
            <div >
                {loginButton}
            </div>
        );
    }
}
