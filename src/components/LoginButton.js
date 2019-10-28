import React, { Component } from 'react';
import AuthService from '../service/AuthService';

export default class LoginButton extends Component {
    render() {
        this.Auth = new AuthService();
        let loginButton = (!this.Auth.isLoggedIn()) ?
            <button type="button" className="logout" onClick={()=>{window.location.href =('/Auth')}}>Login</button> : '';
        return (
            <div className={"sideNav"} >
                {loginButton}
            </div>
        );
    }
}
