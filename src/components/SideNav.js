import React, { Component } from 'react';
import AuthService from '../service/AuthService';
import MyAvatar from "./MyAvatar";

const Auth = new AuthService();

export default class SideNav extends Component {
    handleLogout(){
        Auth.logout();
        window.location.reload();
    }

    render() {
        let adminPanel = (localStorage.getItem('roles') || []).includes(1)?
            <a href={"/Admin"}>AdminPanel</a> : '';
        let optionalContent = Auth.isLoggedIn() ?
            <div>
                <h2>{localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</h2>
                {adminPanel}
                <a href={"/Events"}>Home</a>
                <a href={"/Events"}>Events</a>
                <a href={"/Account"}>Account</a>
                <a onClick={this.handleLogout.bind(this)}>Logout</a>
            </div>
            :
            <div>
                <h2>Guest</h2>
                <a href={"/Events"}>Events</a>
                <a href="/Auth">Login</a>
            </div>;
        return (
            <div className={"sidenav"}>
                <MyAvatar/>
                {optionalContent}
                <div className={"contacts"}>
                    <p>Event manager demo Contacts: Vvladd97@gmail.com</p>
                </div>
            </div>
        );
    }
}

