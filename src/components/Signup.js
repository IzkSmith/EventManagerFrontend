import React, { Component } from 'react';
import AuthService from "../service/AuthService";

class NewEvent extends Component {
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
        console.log(this.state);
        if (this.state.password === this.state.rPassword) {
            this.Auth.newUser(this.state.username, this.state.email, this.state.password)
                .then(res => {
                    window.location.href = '/';
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
                <div className="login-box">
                    <h1>Registration Form</h1>
                    <form onSubmit={this.handleFormSubmit}>
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

export default NewEvent;