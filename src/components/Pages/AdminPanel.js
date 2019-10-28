import React, { Component } from 'react';
import LogoutButton from "../SideNav";
import axios from 'axios';
import MySpinner from "../MySpinner";

export default class AdminPanel extends Component {
    state = {
        loaded: false
    };

    componentDidMount() {
        if(!(localStorage.getItem('roles') || []).includes(1))
            window.location.href =('/Events');
        this.getUsers( );
    }

    getUsers = async () => {
        this.setState({loaded:false});
        let headers = {
            'Content-type':'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('id_token')
        };
        let res = await axios.get(`/api/v1/user/all`, { headers: headers});
        this.setState(res.data);
        this.setState({loaded: true});
    };

    handleGrant = (i) => {
        i.roles = i.roles.includes(2) ? [3] : [3,2];
        this.changeUser(i);
    };

    changeUser = async (data) => {
        await axios.post(`/api/v1/user`, data,
            { headers: { 'Content-type':'application/json','authorization': 'Bearer '
                        + localStorage.getItem('id_token')}});
        this.setState({loaded:true});
        this.getUsers();
    };

    render() {
        console.log(this.state);
        let role;
        return (
            <div>
                <div className="events-box">
                    <h1>Users</h1>
                    <p>total : {this.state.numberOfElements}</p>
                    {
                        this.state.loaded?
                            <table width="700" align="center">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th/>
                                </tr>
                                </thead>
                                {this.state.content.map(item =>
                                    <tbody>
                                    <tr align="center">
                                        <td>{item.firstName} {item.lastName}</td>
                                        <td>{item.username}</td>
                                        <td>
                                            {
                                                role =item.roles.includes(1) ?
                                            'Admin' :
                                            item.roles.includes(2)? 'Holder' : 'Member'}
                                        </td>
                                        {role === 'Admin'? <p/> :
                                            <td>
                                                <input className="about"
                                                       type="button"
                                                       value={ role === 'Holder'? 'take back' : 'grant Holder'}
                                                       onClick={() => this.handleGrant(item)}
                                                />
                                            </td>
                                        }
                                    </tr>
                                    </tbody>)}
                            </table>
                            :
                            <MySpinner/>
                    }
                </div>
                <div className="sideNav">
                    <LogoutButton/>
                </div>
            </div>
        )
    }
}