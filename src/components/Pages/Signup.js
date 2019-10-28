import React, { Component } from 'react';
import AuthService from "../../service/AuthService";

export default class Signup extends Component {
    state = {
        password: '',
        rPassword: ''
    };

    componentDidMount() {
        this.Auth = new AuthService();
        if (this.Auth.loggedIn()) { window.location.href =('/Events'); }
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
        let passwordsError = (this.state.password!==this.state.rPassword)?
            <p style={{color: 'red', margin: 5}}>Passwords don't match</p>: '';

        return (
            <div>
                <div className="formBox">
                    <h1>Registration Form</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input className="textbox"
                               name="firstName"
                               type="text"
                               placeholder="First name"
                               onChange={this.handleChange}
                        />
                        <input className="textbox"
                               name="lastName"
                               type="text"
                               placeholder="Last name"
                               onChange={this.handleChange}
                        />
                        <input className="textbox"
                               name="username"
                               type="text"
                               placeholder="Username"
                               onChange={this.handleChange}
                        />
                        <input className="textbox"
                               name="email"
                               type="email"
                               placeholder="Email"
                               onChange={this.handleChange}
                        />
                        <input className="textbox"
                               name="password"
                               type="password"
                               placeholder="Password"
                               onChange={this.handleChange}
                        />
                        {passwordsError}
                        <input className="textbox"
                               name="rPassword"
                               type="password"
                               placeholder="Repeat password"
                               onChange={this.handleChange}
                        />
                        <input type="submit" className="btn" value="submit"/>
                    </form>
                </div>
            </div>
        );
    }
}
