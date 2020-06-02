import React, { Component } from 'react';
import LogoutButton from "../SideNav";
import AuthService from "../../service/AuthService";
import axios from "axios";

export default class NewEvent extends Component {
    state = {
        content: []
    };

    componentDidMount() {
        if(!(localStorage.getItem('roles') || []).includes(2))
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
            this.state.maxMembers, this.state.description, localStorage.getItem('user_id'), this.state.contacts)
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
                <div className="formBox">
                    <h1>Создание нового мероприятия</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input className="textbox"
                                name="name"
                               type="text"
                               maxLength={90}
                               placeholder="Название мероприятия"
                               onChange={this.handleChange}
                        />
                        <input className="textbox"
                               name="date"
                               type="datetime-local"
                               min="2019-10-14T00:00"
                               max="2020-12-30T00:00"
                               placeholder="Дата проведения"
                               onChange={this.handleChange}
                        />
                        <p>Город :
                            <select name="cityId" onChange={this.handleChange}>
                                {this.state.content.map(content =>
                                    <option value={content.id}>{content.name}</option>)}
                                <option>Выбрать город</option>
                            </select >
                        </p>
                        <input className="textbox"
                               name="maxMembers"
                               type="number"
                               min="5"
                               max="200000000"
                               placeholder="Максимальное количество участников"
                               onChange={this.handleChange}
                        />
                        <textarea className="textbox"
                                  rows={15}
                                  required
                                  maxLength={2048}
                                  name="description"
                                  placeholder="Описание мероприятия"
                                  onChange={this.handleChange}
                        />
                        <input className="textbox"
                               name="contacts"
                               type="text"
                               maxLength={90}
                               placeholder="Контакты организатора"
                               onChange={this.handleChange}
                        />

                        <input type="submit" className="btn" value="Создать"/>
                    </form>
                </div>
                <div className="sideNav">
                    <p><i className="fas fa-user"/> {localStorage.getItem('username')}</p>
                    <LogoutButton />
                </div>
            </div>
        );
    }
}
