import Spinner from 'react-spinner-material';
import React, { Component } from 'react';
import {Link} from "react-router-dom";
import LogoutButton from "./LogoutButton";
import axios from 'axios';

export default class Members extends Component {
    state = {
        users: [],
        loaded: false
    };

    componentDidMount() {
        this.getEvent( );
    }

    getEvent = async () => {
        this.setState({loaded:false})
        let headers = {
            'Content-type':'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('id_token')
        };
        let res = await axios.get(`/api/v1/event/${localStorage.getItem('event_id')}`, { headers: headers});

        const userIds = res.data.userIds;
        this.setState(res.data);
        this.setState({users:[]});

        for (let i = 0, len = userIds.length; i < len; i++) {
            this.getUser(userIds[i], headers, i, len);
        }
    };

    getUser = async (id, headers, i, len) => {
        let res = await axios.get(`/api/v1/user/${id}`, { headers: headers});
        this.setState(state => {
            const users = state.users.concat(res.data);
            return {users};
        });

        if ( i === len - 1 ) {
            this.setState({loaded: true});
        }
    };

    handleDelete = (userId) =>{
        const userIds = this.state.userIds;
        userIds.splice(userIds.indexOf(userId), 1);

        let data = `{
            "id": ${this.state.id},
            "name": "${this.state.name}",
            "date": "${this.state.date}",
            "cityId": ${this.state.cityId},
            "maxMembers": ${this.state.maxMembers},
            "userIds": [${userIds}],
            "description": "${this.state.description}",
            "holderId":" ${this.state.holderId}"
        }`;
        this.deleteUser(data);
    };

    deleteUser = async (data) => {
        let res = await axios.post(`/api/v1/event`, data,
            { headers: { 'Content-type':'application/json','authorization': 'Bearer '
                        + localStorage.getItem('id_token')}});
        this.setState({loaded:true});
        this.getEvent();
    };

    render() {
        console.log(this.state);
        return (
            <div>
                <div className="events-box">
                    <h1>Members of event #{localStorage.getItem('event_id')}</h1>
                    <p>total :{(this.state.userIds || '').length}</p>
                    {
                        this.state.loaded?
                            <table width="700" align="center">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th/>
                                </tr>
                                </thead>
                                {this.state.users.map(item =>
                                    <tbody>
                                    <tr align="center">
                                        <td>{item.firstName} {item.lastName}</td>
                                        <td>
                                                <input className="about"
                                                       type="button"
                                                       value={"delete"}
                                                       onClick={() => this.handleDelete(item.id)}
                                                />
                                        </td>
                                    </tr>
                                    </tbody>)}
                            </table>
                            :
                                <div className={"spinner"}>
                                    <Spinner size={120} spinnerColor={"#2ecc71"} spinnerWidth={2} visible={true} />
                                </div>
                    }
                </div>
                <div className="logout-box">
                    <p><i className="fas fa-user"/> {localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</p>
                    <LogoutButton/>
                </div>
            </div>
        )
    }
}