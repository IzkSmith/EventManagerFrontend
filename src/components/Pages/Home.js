import React, { Component } from 'react';
import '../../styles/Events.css';
import {Link} from "react-router-dom";
import SideNav from "../SideNav";
import axios from 'axios';
import MySpinner from "../MySpinner";

export default class Home extends Component {
    state = {
        events: [],
        totalPages: 1,
        loaded: false,
        pageSize: 10
    };

    componentDidMount() {
        localStorage.setItem('event_id', null);
        this.getUser();
    }

    getUser = async () => {
        this.setState({loaded:false});
        let id = localStorage.getItem("user_id");
        let headers = {
            'Content-type':'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('id_token')
        };
        let res = await axios.get(`/api/v1/user/${id}`, { headers: headers});
        this.setState({events: res.data.events});
        for (let i = 0, len = res.data.events.length; i < len; i++) {
            this.getCity(res.data.events[i], res.data.events, i, len);
        }
    };

    getCity = async (id, content, i, len) => {
        let res = await axios.get(`/api/v1/city/${id.cityId}`);
        id.cityName = res.data.name;
        this.setState({content} );

        if ( i === len - 1 ) {
            this.setState({loaded: true});
        }
    };


    render() {
        console.log(this.state);

        return (
            <div>
                <div className="events-box">
                    <h1>Your Events</h1>
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
                                {this.state.events.map(content =>
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
                </div>
                <div className="sideNav">
                    <SideNav/>
                </div>
            </div>
        )
    }
}
