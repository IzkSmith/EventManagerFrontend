import React, { Component } from 'react';
import {Link} from "react-router-dom";
import LogoutButton from "./UserBox";
import axios from 'axios';
import MySpinner from "./MySpinner";
import LoginButton from "./LoginButton";

export default class Events extends Component {
    state = {
        content: [],
        totalPages: 1,
        loaded: false
    };

    componentDidMount() {
        localStorage.setItem('event_id', null);
        this.getPage( +localStorage.getItem('page') );
    }

    getPage = async (page) => {
        let res = await axios.get(`/api/v1/event/all${page}`);
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
        this.getPage(+localStorage.getItem('page') + 1);
        this.setState( localStorage.setItem('page', +localStorage.getItem('page') + 1) );
    };

    handlePrevClick = () => {
        this.setState({loaded:false});
        this.getPage(+localStorage.getItem('page') - 1);
        this.setState( localStorage.setItem('page', +localStorage.getItem('page') - 1) );
    };

    render() {
        let createButton = ( (localStorage.getItem('roles') || '').includes(2) ) ?
                <Link to="/NewEvent">
                    <input className="create" type="submit" name="" value="Create new event"/>
                </Link>
            : '';

        let prevButton = ((+localStorage.getItem('page') > 0) && (this.state.loaded)) ?
            <button type="button" className="prev" onClick={this.handlePrevClick}>Prev</button> : '';

        let nextButton = ((+localStorage.getItem('page') < this.state.totalPages - 1) && (this.state.loaded)) ?
            <button type="button" className="next" onClick={this.handleNextClick}>Next</button> : '';

        return (
            <div>
                <div className="events-box">
                    <h1>Events</h1>
                    {
                        this.state.loaded ?
                            <table width="1400" align="center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>City</th>
                                        <th>max/current</th>
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
                                                        <input className="about" type="button" value={"about"}/>
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
                    <p>Page : {+localStorage.getItem('page') + 1} of {this.state.totalPages}</p>
                    {nextButton}
                </div>
                <div className="logout-box">
                    <LogoutButton/>
                    <LoginButton/>
                </div>
                {createButton}
            </div>
        )
    }
}
