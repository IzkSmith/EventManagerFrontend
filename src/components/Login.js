import React, { Component } from 'react';
import AuthService from '../service/AuthService';
import {Link} from "react-router-dom";
import VK, { Auth } from "react-vk";
import GoogleLogin from "react-google-login";

export default class Login extends Component {
    state = {
        username : '',
        password : ''
    };

    componentDidMount(){
        this.Auth = new AuthService();
        if (this.Auth.loggedIn()) window.location.href =('/Events');
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.Auth.login(this.state.username, this.state.password)
            .then(res => {
                window.location.href = '/Events';
            })
            .catch(err => {
                alert('Wrong username or password');
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
            <div className="box" >
                <h1>Login</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <input
                        placeholder="Username"
                        name="username"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <input
                        value="submit"
                        type="submit"
                    />
                    <p>don't have an account yet? <Link to="/Signup">Sign up</Link></p>
                    <p>or login with VK</p>
                </form>
                <VK apiId={7178797}>
                    <Auth options={{
                        'width':300
                        ,onAuth: user => {
                            console.log(user);
                            localStorage.setItem('avatar', user.photo_rec);
                            this.Auth.login(user.uid, user.uid)
                                .then(res => {
                                    window.location.href = '/Events';
                                })
                                .catch(err => {
                                    this.Auth.newUser(user.first_name, user.last_name, user.uid, user.uid+'@gmail.com', user.uid)
                                        .then(res => {this.login(user.uid, user.uid);
                                        })
                                })
                        }}}/>
                    <GoogleLogin
                        clientId="535820474226-ddstlsfdcl1ogprtqj6vt47emafd4vpj.apps.googleusercontent.com"
                        render={renderProps => (
                            <button className={"btn"} onClick={renderProps.onClick} disabled={renderProps.disabled}> Login with google</button>
                        )}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </VK>
            </div>
        );
    }
}