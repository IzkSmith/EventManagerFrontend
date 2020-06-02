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
            <a href={"/Admin"}>Инструменты администратора</a> : '';
        let optionalContent = Auth.isLoggedIn() ?
            <div>
                <h2>{localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</h2>
                {adminPanel}
                <a href={"/Home"}>Главная</a>
                <a href={"/Events"}>Мероприятия</a>
                <a href={"/Account"}>Личный кабинет</a>
                <a onClick={this.handleLogout.bind(this)}>Выход</a>
            </div>
            :
            <div>
                <h2>Гостевая учетная запись</h2>
                <a href={"/Events"}>Мероприятия</a>
                <a href="/Auth">Авторизация</a>
            </div>;
        return (
            <div className={"sidenav"}>
                <MyAvatar/>
                {optionalContent}
                <div className={"contacts"}>
                    <p>Демонстрационная версия контакты: Vvladd97@gmail.com</p>
                </div>
            </div>
        );
    }
}

