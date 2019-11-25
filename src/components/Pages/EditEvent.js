import React, { Component } from 'react';
import LogoutButton from "../SideNav";
import AuthService from "../../service/AuthService";
import axios from "axios";

export default class EditEvent extends Component {
    state = {
        content: []
    };

    componentDidMount() {
        if (!(localStorage.getItem('roles') || []).includes(2)) {
            window.location.href =('/Events');
        }

        let headers = {
            'Content-type':'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('id_token')
        };
        axios.get(`/api/v1/city/all`, {headers: headers})
            .then(res => {
                const content = res.data.content;
                this.setState({content});
            });

        if (localStorage.getItem('event_id') !== null) {
            axios.get(`/api/v1/event/${localStorage.getItem('event_id')}`, {headers: headers})
                .then(res => {
                    this.getCity(res.data.cityId, res.data, headers);
                })
        }
    }

    getCity = async (id, data, headers) => {
        let res = await axios.get(`/api/v1/city/${id}`, { headers: headers});
        this.setState({...data, cityName: res.data.name});
    };

    handleFormSubmit = (e) => {
        this.Auth = new AuthService();
        e.preventDefault();
        this.Auth.editEvent(this.state.id, this.state.name, this.state.date, this.state.cityId, this.state.maxMembers,
            this.state.description, localStorage.getItem('user_id'), this.state.contacts, this.state.userIds)
            .then(res => {
                window.location.href = '/Events';
            })
            .catch(err => {
                alert(err);
            })
    };

    handleChange = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        console.log(this.state)
        return (
            <div>
                <div className="formBox">
                    <h1>Edit event #{this.state.id}</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input className="textbox"
                               name="name"
                               type="text"
                               maxLength={90}
                               value={this.state.name}
                               onChange={this.handleChange}
                        />
                        <input className="textbox"
                               name="date"
                               value={(this.state.date || '').replace(/ /g, "T")}
                               type="datetime-local"
                               min="2019-09-14T00:00" max="2020-12-30T00:00"
                               onChange={this.handleChange}
                        />
                        <p>City :
                            <select name="cityId" onChange={this.handleChange}>
                                {
                                    this.state.content.map(content =>
                                    <option value={content.id}>{content.name}</option>)
                                }
                                <option selected value={this.state.cityId}>{this.state.cityName}</option>
                            </select>
                        </p>
                        <input className="textbox"
                               name="maxMembers"
                               type="number"
                               value={this.state.maxMembers}
                               min="5"
                               max="200000000"
                               onChange={this.handleChange}
                        />
                        <textarea className="textbox"
                                  rows={15}
                                  required
                                  maxLength={2048}
                                  value={this.state.description}
                                  name="description"
                                  onChange={this.handleChange}
                        />
                        <input className="textbox"
                               name="contacts"
                               type="text"
                               maxLength={90}
                               value={this.state.contacts}
                               onChange={this.handleChange}
                        />

                        <input type="submit" className="btn" value="submit" />
                    </form>

                </div>
                <div className="sideNav">
                    <p><i className="fas fa-user"/> {localStorage.getItem('username')}</p>
                    <LogoutButton/>
                </div>
            </div>
        );
    }
}
