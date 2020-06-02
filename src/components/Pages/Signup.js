import React, { Component } from 'react';
import AuthService from "../../service/AuthService";
import '../../styles/Form.css';
import axios from "axios";

export default class Signup extends Component {
    state = {
        password: '',
        rPassword: ''
    };

    componentDidMount() {
        this.Auth = new AuthService();
        if (this.Auth.isLoggedIn()) { window.location.href =('/Events'); }
    }

    handleFormSubmit = (e) => {
        this.Auth = new AuthService();
        e.preventDefault();
        if (this.state.password === this.state.rPassword) {
            this.Auth.newUser(this.state.firstName, this.state.lastName, this.state.username, this.state.email, this.state.password)
                .then(res => {
                    window.location.href = '/Auth';
                })
                .catch(err => {
                    alert(err);
                })
        }
    };

    handleChange = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        console.log(this.state);
        let passwordsError = (this.state.password!==this.state.rPassword)?
            <p style={{color: 'red', margin: 5}}>Пароли не совпадают</p>: '';

        return (
            <div>
                <div className="formBox">
                    <h1>Регистрация нового пользователя</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input className="textbox"
                               name="firstName"
                               type="text"
                               placeholder="Имя"
                               onChange={this.handleChange}
                        />
                        <input className="textbox"
                               name="lastName"
                               type="text"
                               placeholder="Фамилия"
                               onChange={this.handleChange}
                        />
                        <input className="textbox"
                               name="username"
                               type="text"
                               placeholder="Пользователь"
                               onChange={this.handleChange}
                        />
                        <input className="textbox"
                               name="email"
                               type="email"
                               placeholder="Электронная почта"
                               onChange={this.handleChange}
                        />
                        <input className="textbox"
                               name="password"
                               type="password"
                               placeholder="Пароль"
                               onChange={this.handleChange}
                        />
                        {passwordsError}
                        <input className="textbox"
                               name="rPassword"
                               type="password"
                               placeholder="Повторите пароль"
                               onChange={this.handleChange}
                        />
                        <input type="submit" className="btn" value="Зарегистрироваться"/>
                    </form>
                </div>
            </div>
        );
    }
}
