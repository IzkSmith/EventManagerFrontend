import React, { Component } from 'react';
import LogoutButton from "../SideNav";
import axios from 'axios';
import MySpinner from "../MySpinner";

export default class Members extends Component {
    state = {
        users: [],
        loaded: false
    };

    componentDidMount() {
        console.log(!localStorage.getItem('event_id'));
        if (!localStorage.getItem('event_id')) {
            window.location.href = ('/Events');
        }
        this.getEvent( );
    }

    getEvent = async () => {
        this.setState({loaded:false});
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

    handleDelete = (userId) => {
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
            "holderId":" ${this.state.holderId}",
            "contacts":"${this.state.contacts}"
        }`;
        this.deleteUser(data);
    };

    deleteUser = async (data) => {
        await axios.post(`/api/v1/event`, data,
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
                    <h1>Участники мероприятия #{localStorage.getItem('event_id')}</h1>
                    <p>Всего участников :{(this.state.userIds || '').length}</p>
                    {
                        this.state.loaded?
                            <table width="700" align="center">
                                <thead>
                                <tr>
                                    <th>Имя</th>
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
                                                       value={"Отписать от мероприятия"}
                                                       onClick={() => this.handleDelete(item.id)}
                                                />
                                        </td>
                                    </tr>
                                    </tbody>)}
                            </table>
                            :
                            <MySpinner/>
                    }
                </div>
                <div className="sideNav">
                    <p><i className="fas fa-user"/> {localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</p>
                    <LogoutButton/>
                </div>
            </div>
        )
    }
}
