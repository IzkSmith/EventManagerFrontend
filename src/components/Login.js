import React, { Component } from 'react';
import AuthService from '../service/AuthService';
import {Link} from "react-router-dom";

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

    handleChange = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
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
                </form>
            </div>
        );
    }
}