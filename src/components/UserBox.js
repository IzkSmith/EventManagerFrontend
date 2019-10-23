import React, { Component } from 'react';
import AuthService from '../service/AuthService';
import withAuth from "../service/WithAuth";
import MyAvatar from "./MyAvatar";

const Auth = new AuthService();

class UserBox extends Component {
    handleLogout(){
        Auth.logout();
        window.location.href = '/';
    }

    render() {
        let adminPanel = (localStorage.getItem('roles') || []).includes(1)?
            <button type="button" className = "admin" onClick={() => {window.location.href = '/AdminPanel'}}>
                Admin Panel
            </button> : '';

        return (
            <div >
                <p>
                    <MyAvatar/> {localStorage.getItem('firstName')} {localStorage.getItem('lastName')}
                </p>
                {adminPanel}
                <button type="button" className = "logout" onClick={this.handleLogout.bind(this)}>
                    Logout
                </button>
            </div>
        );
    }
}

export default withAuth(UserBox);
