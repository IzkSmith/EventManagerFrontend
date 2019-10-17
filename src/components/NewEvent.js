import React, { Component } from 'react';
import LogoutButton from "./LogoutButton";
import AuthService from "../service/AuthService";
import axios from "axios";

export default class NewEvent extends Component {
    state = {
        content: []
    };

    componentDidMount() {
        if(!localStorage.getItem('roles').includes(2))
            window.location.href =('/Events');

        axios.get(`/api/v1/city/all`, { headers: {'Content-type' : 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('id_token')}})
            .then(res => {
                const content = res.data.content;
                this.setState({content})
            })
    }

    handleFormSubmit = (e) => {
        this.Auth = new AuthService();
        e.preventDefault();
        this.Auth.newEvent(this.state.name, this.state.date, this.state.cityId,
            this.state.maxMembers, this.state.description, localStorage.getItem('user_id'))
            .then(res => {
                window.location.href = '/Events';
            })
            .catch(err => {
                alert(err);
            })
    };

    handleChange =(e) => this.setState({[e.target.name]: e.target.value});

    render() {
        console.log(this.state.content);
        return (
            <div>
                <div className="login-box">
                    <h1>Create new Event</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input className="textbox"
                               name="name"
                               type="text"
                               maxLength={90}
                               placeholder="Event name"
                               onChange={this.handleChange}
                        />
                        <input className="textbox"
                               name="date"
                               type="datetime-local"
                               min="2019-10-14T00:00"
                               max="2020-12-30T00:00"
                               placeholder="Date"
                               onChange={this.handleChange}
                        />
                        <p>City :
                            <select name="cityId" onChange={this.handleChange}>
                                {this.state.content.map(content =>
                                    <option value={content.id}>{content.name}</option>)}
                                <option>Select city</option>
                            </select >
                        </p>
                        <input className="textbox"
                               name="maxMembers"
                               type="number"
                               min="5"
                               max="200000000"
                               placeholder="Max members"
                               onChange={this.handleChange}
                        />
                        <textarea className="textbox"
                                  rows={15}
                                  required
                                  maxLength={2048}
                                  name="description"
                                  placeholder="Description"
                                  onChange={this.handleChange}
                        />

                        <input type="submit" className="btn" value="submit"/>
                    </form>
                </div>
                <div className="logout-box">
                    <p><i className="fas fa-user"/> {localStorage.getItem('username')}</p>
                    <LogoutButton />
                </div>
            </div>
        );
    }
}