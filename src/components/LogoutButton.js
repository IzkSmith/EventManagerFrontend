import React, { Component } from 'react';
import AuthService from '../service/AuthService';
import withAuth from "../service/WithAuth";

const Auth = new AuthService();

class App extends Component {

    handleLogout(){
        Auth.logout();
        window.location.href = '/';
    }

    render() {
        return (
            <div >
                <p><i className="fas fa-user"/> {localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</p>
                <button type="button" className = "logout" onClick={this.handleLogout.bind(this)}>Logout</button>
            </div>
        );
    }
}

export default withAuth(App);
