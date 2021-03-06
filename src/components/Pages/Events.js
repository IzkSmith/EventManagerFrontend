import React, { Component } from 'react';
import '../../styles/Events.css';
import {Link} from "react-router-dom";
import SideNav from "../SideNav";
import axios from 'axios';
import MySpinner from "../MySpinner";

export default class Events extends Component {
    state = {
        content: [],
        totalPages: 1,
        loaded: false,
        pageSize: 10
    };

    componentDidMount() {
        localStorage.setItem('event_id', null);
        this.getPage(+localStorage.getItem('page'), this.state.pageSize);
    }

    getPage = async (page, size) => {
        let res = await axios.get(`/api/v1/event/all/${page}/size/${size}`);
        const content = res.data.content;
        const total = res.data.totalPages;

        for (let i = 0, len = content.length; i < len; i++) {
            this.getCity(content[i], content, i, len);
        }

        this.setState({totalPages:total} );
    };

    getCity = async (id, content, i, len) => {
        let res = await axios.get(`/api/v1/city/${id.cityId}`);
        id.cityName = res.data.name;
        this.setState({content} );

        if ( i === len - 1 ) {
            this.setState({loaded: true});
        }
    };

    handleNextClick = () => {
        this.setState({loaded: false});
        this.getPage(+localStorage.getItem('page') + 1, this.state.pageSize);
        this.setState( localStorage.setItem('page', +localStorage.getItem('page') + 1));
    };

    handlePrevClick = () => {
        this.setState({loaded:false});
        this.getPage(+localStorage.getItem('page') - 1, this.state.pageSize);
        this.setState(localStorage.setItem('page', +localStorage.getItem('page') - 1));
    };

    handleChange =(e) => {
        this.setState({loaded: false});
        this.setState({[e.target.name]: e.target.value});
        this.getPage(+localStorage.getItem('page'), e.target.value);
    };

    render() {
        console.log(this.state);
        let createButton = ( (localStorage.getItem('roles') || '').includes(2) ) ?
                <Link to="/NewEvent">
                    <input className="leftButton" type="submit" name="" value="Создать новое мероприятие"/>
                </Link>
            : '';

        let prevButton = ((+localStorage.getItem('page') > 0) && (this.state.loaded)) ?
            <button type="button" className="prev" onClick={this.handlePrevClick}>Предыдущая</button> : '';

        let nextButton = ((+localStorage.getItem('page') < this.state.totalPages - 1) && (this.state.loaded)) ?
            <button type="button" className="next" onClick={this.handleNextClick}>Следующая</button> : '';

        return (
            <div>
                <div className="events-box">
                    <h1>Предстоящие мероприятия</h1>
                    <p>Количество мероприятий на странице <select name="pageSize" onChange={this.handleChange}>
                            <option value={10} selected>10</option>
                            <option value={15}>15</option>
                    </select ></p>
                    {
                        this.state.loaded ?
                            <table width="1400" align="center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Название</th>
                                        <th>Дата</th>
                                        <th>Город</th>
                                        <th>Максимальное кол-во участников/текущее</th>
                                        <th/>
                                    </tr>
                                </thead>
                                {this.state.content.map(content =>
                                        <tbody>
                                            <tr align="center">
                                                <td>{content.id}</td>
                                                <td>{content.name} </td>
                                                <td>{content.date.replace(/T/g, " ")}</td>
                                                <td>{content.cityName}</td>
                                                <td>({content.maxMembers}/{content.userIds.length})</td>
                                                <td>
                                                    <Link to={`/Event/${content.id}`}>
                                                        <input className="about" type="button" value={"Подробнее"}/>
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>)}
                            </table>
                            :
                            <table width="1400" align="center">
                                <MySpinner/>
                            </table>
                    }
                    {prevButton}
                    <p>Страница : {+localStorage.getItem('page') + 1} из {this.state.totalPages}</p>
                    {nextButton}
                </div>
                <div className="sideNav">
                    <SideNav/>
                </div>
                {createButton}
            </div>
        )
    }
}
