import React, { Component } from 'react';
import '../../styles/Auth.css';
import {Link} from "react-router-dom";
import VK, { Auth } from "react-vk";
import GoogleLogin from "react-google-login";
import AuthService from "../../service/AuthService";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

export default class Login extends Component {
    state = {
        vk: false,
        username : '',
        password : ''
    };

    componentDidMount(){
        this.Auth = new AuthService();
        if (this.Auth.isLoggedIn()) window.location.href =('/Events');
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.Auth.login(this.state.username, this.state.password)
            .then(res => {
                window.location.href = '/Events';
            })
            .catch(err => {
                alert('Неправильно введены данные');
            })
    };

    login = (username, password) => {
        this.Auth.login(username, password)
            .then(res => {
                window.location.href = '/Events';
            })
    };

    handleChange = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        const responseFacebook = (response) => {
            console.log(response);
            let user = response;
            localStorage.setItem('avatar', user.picture.data.url);
            this.Auth.login(user.id, user.id)
                .then(res => {
                    window.location.href = '/Events';
                })
                .catch(err => {
                    this.Auth.newUser(user.name || '', "", user.id, user.email, user.id)
                        .then(res => {this.login(user.googleId, user.googleId);
                        })
                })
        };

        const responseGoogle = (response) => {
            console.log(response);
            let user = response.profileObj;
            localStorage.setItem('avatar', user.imageUrl);
            this.Auth.login(user.googleId, user.googleId)
                .then(res => {
                    window.location.href = '/Events';
                })
                .catch(err => {
                    this.Auth.newUser(user.familyName || '', user.givenName, user.googleId, user.email, user.googleId)
                        .then(res => {this.login(user.googleId, user.googleId);
                        })
                })
        };

        return (
            <div className="loginBox" >
                <h1>Авторизация</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <input
                        placeholder="Имя пользователя"
                        name="username"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="Пароль"
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <input
                        value="Войти"
                        type="submit"
                    />
                    <p>Еще нет учетной записи? <Link to="/Signup">Регистрация</Link></p>
                </form>
                <VK apiId={7178797}>
                    {!this.state.vk ?
                        <button className={"externalAuth"} onClick={() => {this.setState({vk: true})}}>
                            <img src={require("../../images/vk.png")}/>
                        </button>
                        :
                        <Auth options={{
                            'width': 300
                            , onAuth: user => {
                                console.log(user);
                                localStorage.setItem('avatar', user.photo_rec);
                                this.Auth.login(user.uid, user.uid)
                                    .then(res => {
                                        window.location.href = '/Events';
                                    })
                                    .catch(err => {
                                        this.Auth.newUser(user.first_name, user.last_name, user.uid, null, user.uid)
                                            .then(res => {
                                                this.login(user.uid, user.uid);
                                            })
                                    })
                            }
                        }}/>

                    }
                    <p/>
                    <GoogleLogin
                        clientId="535820474226-ddstlsfdcl1ogprtqj6vt47emafd4vpj.apps.googleusercontent.com"
                        render={renderProps => (
                            <button className={"externalAuth"} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <img src={require("../../images/google.png")}/>
                            </button>
                        )}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <p/>
                    <FacebookLogin
                        appId="2331291133643897"
                        fields="name,email,picture"
                        callback={responseFacebook}
                        render={renderProps => (
                            <button className={"externalAuth"} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <img src={require("../../images/facebook.png")}/>
                            </button>
                        )}
                    />
                </VK>

                <p><a href={"/Events"}>или продолжить как гость</a></p>
            </div>
        );
    }
}
